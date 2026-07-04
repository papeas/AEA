/*
 * Nexus reviews backend — zero dependencies, plain Node.js (v18+).
 *
 * Run:            node server/server.js
 * Then open:      http://localhost:3000
 *
 * Endpoints:
 *   GET  /api/reviews            → approved reviews, newest first
 *   POST /api/reviews            → submit {name, business?, rating 1-5, text}
 *   GET  /api/admin/reviews      → all reviews incl. pending (needs ?token=ADMIN_TOKEN)
 *   POST /api/admin/approve      → {id} approve a pending review (needs ?token=)
 *   POST /api/admin/delete       → {id} delete a review (needs ?token=)
 *
 * Environment:
 *   PORT         port to listen on (default 3000)
 *   MODERATE     set to "1" to hold new reviews for approval instead of
 *                publishing immediately
 *   ADMIN_TOKEN  secret for the /api/admin endpoints (default: disabled)
 *
 * Reviews are stored in server/reviews-data.json (created on first write,
 * gitignored). Also serves the static site from the repo root, so this one
 * process runs the whole thing.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const MODERATE = process.env.MODERATE === "1";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";
const DATA_FILE = path.join(__dirname, "reviews-data.json");
const SITE_ROOT = path.join(__dirname, "..");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json"
};

function loadReviews() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveReviews(reviews) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2));
}

function send(res, status, body, headers = {}) {
  const isObj = typeof body === "object";
  res.writeHead(status, {
    "Content-Type": isObj ? "application/json; charset=utf-8" : "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    ...headers
  });
  res.end(isObj ? JSON.stringify(body) : body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 10_000) {
        reject(new Error("payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

/* Naive per-IP rate limit: one submission per minute */
const lastPost = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const last = lastPost.get(ip) || 0;
  if (now - last < 60_000) return true;
  lastPost.set(ip, now);
  if (lastPost.size > 5000) lastPost.clear();
  return false;
}

function validReview(input) {
  if (!input || typeof input !== "object") return null;
  const name = String(input.name || "").trim().slice(0, 60);
  const business = String(input.business || "").trim().slice(0, 80);
  const text = String(input.text || "").trim().slice(0, 600);
  const rating = Math.round(Number(input.rating));
  if (!name || !text) return null;
  if (!(rating >= 1 && rating <= 5)) return null;
  /* honeypot field filled → bot */
  if (String(input.website || "").trim() !== "") return null;
  return { name, business, text, rating };
}

function isAdmin(url) {
  return ADMIN_TOKEN && url.searchParams.get("token") === ADMIN_TOKEN;
}

async function handleApi(req, res, url) {
  if (req.method === "OPTIONS") return send(res, 204, "");

  if (url.pathname === "/api/reviews" && req.method === "GET") {
    const reviews = loadReviews()
      .filter((r) => r.approved)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(({ id, name, business, rating, text, createdAt }) => ({ id, name, business, rating, text, createdAt }));
    return send(res, 200, reviews);
  }

  if (url.pathname === "/api/reviews" && req.method === "POST") {
    const ip = req.socket.remoteAddress || "?";
    if (rateLimited(ip)) return send(res, 429, { error: "Too many submissions, try again in a minute." });

    let input;
    try {
      input = JSON.parse(await readBody(req));
    } catch {
      return send(res, 400, { error: "Invalid JSON." });
    }
    const review = validReview(input);
    if (!review) return send(res, 400, { error: "Invalid review." });

    const reviews = loadReviews();
    reviews.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      ...review,
      approved: !MODERATE,
      createdAt: new Date().toISOString()
    });
    saveReviews(reviews);
    return send(res, 201, { ok: true, pending: MODERATE });
  }

  if (url.pathname === "/api/admin/reviews" && req.method === "GET") {
    if (!isAdmin(url)) return send(res, 403, { error: "Forbidden." });
    return send(res, 200, loadReviews());
  }

  if ((url.pathname === "/api/admin/approve" || url.pathname === "/api/admin/delete") && req.method === "POST") {
    if (!isAdmin(url)) return send(res, 403, { error: "Forbidden." });
    let input;
    try {
      input = JSON.parse(await readBody(req));
    } catch {
      return send(res, 400, { error: "Invalid JSON." });
    }
    const reviews = loadReviews();
    const idx = reviews.findIndex((r) => r.id === input.id);
    if (idx === -1) return send(res, 404, { error: "Not found." });
    if (url.pathname === "/api/admin/approve") reviews[idx].approved = true;
    else reviews.splice(idx, 1);
    saveReviews(reviews);
    return send(res, 200, { ok: true });
  }

  return send(res, 404, { error: "Not found." });
}

function serveStatic(req, res, url) {
  let filePath = path.normalize(path.join(SITE_ROOT, url.pathname === "/" ? "index.html" : url.pathname));
  if (!filePath.startsWith(SITE_ROOT)) return send(res, 403, "Forbidden");
  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, "Not found");
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      handleApi(req, res, url).catch(() => send(res, 500, { error: "Server error." }));
    } else if (req.method === "GET") {
      serveStatic(req, res, url);
    } else {
      send(res, 405, "Method not allowed");
    }
  })
  .listen(PORT, () => {
    console.log(`Nexus site + reviews API running at http://localhost:${PORT}`);
    console.log(`Moderation: ${MODERATE ? "ON (new reviews need approval)" : "off (reviews publish immediately)"}`);
  });
