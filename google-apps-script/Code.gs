/**
 * Nexus reviews backend — Google Apps Script + Google Sheets.
 *
 * This turns a Google Sheet into the review database for the Nexus site,
 * so no server hosting is needed at all.
 *
 * SETUP (one time, ~5 minutes — works on desktop AND iPad/phone):
 *  1. In a browser (Safari/Chrome), go to https://script.google.com
 *     and sign in. Tap "New project".
 *     (On iPad: if the editor looks broken, tap the "aA" icon in the
 *     address bar and choose "Request Desktop Website".)
 *  2. Delete the placeholder code and paste this whole file.
 *  3. Change SECRET below to your own private password.
 *  4. Save, then click Deploy → New deployment → type: Web app.
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Click Deploy and authorise it (if Google warns "unverified app":
 *     Advanced → Go to project → Allow — it's your own script).
 *  5. Copy the Web app URL (looks like
 *     https://script.google.com/macros/s/XXXXX/exec).
 *  6. Paste that URL into REVIEWS_API at the top of js/main.js and push.
 *  7. Open admin.html, paste the same URL + your SECRET to moderate.
 *
 * You don't need to create a spreadsheet yourself: on first use the
 * script creates one called "Nexus Reviews" in your Google Drive and
 * keeps using it. Reviews appear as rows there — you can edit them
 * right in the sheet. (Pasting this into an existing sheet via
 * Extensions → Apps Script on desktop also works; then that sheet
 * is used instead.)
 */

// ====== settings ======
var SECRET = "change-me-to-something-private";
var MODERATE = true; // true = new reviews hidden until you approve them
var SHEET_NAME = "Reviews";
// ======================

var HEADERS = ["id", "name", "business", "rating", "text", "approved", "createdAt"];

function ss_() {
  // bound to a spreadsheet (Extensions → Apps Script)? use that one
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss) return ss;
  // standalone project (script.google.com — the iPad-friendly path):
  // create our own spreadsheet once and remember its id
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("SHEET_ID");
  if (id) {
    try {
      return SpreadsheetApp.openById(id);
    } catch (err) {
      /* sheet was deleted — fall through and create a new one */
    }
  }
  ss = SpreadsheetApp.create("Nexus Reviews");
  props.setProperty("SHEET_ID", ss.getId());
  return ss;
}

function sheet_() {
  var ss = ss_();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function allReviews_() {
  var values = sheet_().getDataRange().getValues();
  var out = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (!row[0]) continue;
    out.push({
      id: String(row[0]),
      name: String(row[1]),
      business: String(row[2]),
      rating: Number(row[3]),
      text: String(row[4]),
      approved: row[5] === true || String(row[5]).toLowerCase() === "true",
      createdAt: String(row[6])
    });
  }
  return out;
}

function rowIndexById_(id) {
  var values = sheet_().getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) return i + 1; // 1-based sheet row
  }
  return -1;
}

function doGet(e) {
  var action = (e.parameter.action || "list").toLowerCase();

  if (action === "list") {
    var approved = allReviews_()
      .filter(function (r) { return r.approved; })
      .sort(function (a, b) { return b.createdAt < a.createdAt ? -1 : 1; })
      .reverse();
    return json_(approved);
  }

  if (action === "all") {
    if (e.parameter.token !== SECRET) return json_({ error: "Forbidden." });
    return json_(allReviews_());
  }

  return json_({ error: "Unknown action." });
}

function doPost(e) {
  var input;
  try {
    input = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ error: "Invalid JSON." });
  }

  var action = (input.action || "submit").toLowerCase();

  if (action === "submit") {
    var name = String(input.name || "").trim().slice(0, 60);
    var business = String(input.business || "").trim().slice(0, 80);
    var text = String(input.text || "").trim().slice(0, 600);
    var rating = Math.round(Number(input.rating));
    if (!name || !text || !(rating >= 1 && rating <= 5)) {
      return json_({ error: "Invalid review." });
    }
    // honeypot: hidden field real visitors never fill in
    if (String(input.website || "").trim() !== "") {
      return json_({ error: "Invalid review." });
    }
    var id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    sheet_().appendRow([id, name, business, rating, text, !MODERATE, new Date().toISOString()]);
    return json_({ ok: true, pending: MODERATE });
  }

  // admin actions need the secret
  if (input.token !== SECRET) return json_({ error: "Forbidden." });

  if (action === "approve" || action === "delete") {
    var rowIdx = rowIndexById_(input.id);
    if (rowIdx === -1) return json_({ error: "Not found." });
    if (action === "approve") sheet_().getRange(rowIdx, 6).setValue(true);
    else sheet_().deleteRow(rowIdx);
    return json_({ ok: true });
  }

  return json_({ error: "Unknown action." });
}
