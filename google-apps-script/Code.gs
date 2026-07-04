/**
 * Nexus reviews backend — Google Apps Script + Google Sheets.
 *
 * This turns a Google Sheet into the review database for the Nexus site,
 * so no server hosting is needed at all.
 *
 * SETUP (one time, ~5 minutes):
 *  1. Go to https://sheets.google.com and create a new spreadsheet,
 *     name it e.g. "Nexus Reviews".
 *  2. In the sheet: Extensions → Apps Script. Delete any code there and
 *     paste this whole file.
 *  3. Change SECRET below to your own private password.
 *  4. Click Deploy → New deployment → type: Web app.
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Click Deploy and authorise it.
 *  5. Copy the Web app URL (looks like
 *     https://script.google.com/macros/s/XXXXX/exec).
 *  6. Paste that URL into REVIEWS_API at the top of js/main.js and push.
 *  7. Open admin.html, paste the same URL + your SECRET to moderate.
 *
 * Reviews appear as rows in the sheet — you can also edit them right there.
 */

// ====== settings ======
var SECRET = "change-me-to-something-private";
var MODERATE = true; // true = new reviews hidden until you approve them
var SHEET_NAME = "Reviews";
// ======================

var HEADERS = ["id", "name", "business", "rating", "text", "approved", "createdAt"];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
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
