# Nexus — Agency Website

Bilingual (English / Ελληνικά) one-page website for **Nexus**, the web studio behind
[@nexus_aea](https://www.instagram.com/nexus_aea) — websites, online shops, redesigns
and maintenance for businesses.

## Structure

```
├── index.html        # The whole site (single page)
├── css/style.css     # Brand styles — light theme, logo blue + gold palette
├── js/main.js        # EN/ΕΛ toggle, mobile nav, custom cursor, reviews
├── assets/logo.jpg   # Original Nexus logo (also used as the social share image)
└── server/server.js  # Reviews backend (plain Node.js, no dependencies)
```

The site itself is static — open `index.html` in a browser or host it on any
static host (GitHub Pages, Netlify, Vercel).

## Reviews

Visitors can leave a review via the "Leave a review" button. Two backend
options — pick one and put its URL in the `REVIEWS_API` constant at the top of
`js/main.js`:

### Option A — Google Sheets (recommended: free, no hosting)

Reviews are stored as rows in a Google Sheet you own. Follow the step-by-step
setup at the top of [`google-apps-script/Code.gs`](google-apps-script/Code.gs)
(~5 minutes: create a sheet, paste the script, set your `SECRET`, deploy as a
web app, copy the URL into `REVIEWS_API`).

### Option B — Node backend

```
node server/server.js        # serves the site + reviews API on :3000
```

- Set `MODERATE=1` to hold new reviews for approval, `ADMIN_TOKEN=<secret>` to
  enable the admin endpoints. Data is saved to `server/reviews-data.json`
  (gitignored).
- For production, deploy to any free Node host (Render, Railway, Fly.io —
  start command `node server/server.js`) and use that URL as `REVIEWS_API`.

### Moderating — admin page

Open **`admin.html`** (on the live site or locally), enter your backend URL and
secret, and you can see pending reviews, approve them, or delete any review.
The page holds no secrets itself, so it's safe to host publicly.

**Note:** GitHub Pages only serves static files. Until `REVIEWS_API` points at
one of the two backends above, the live reviews section shows its empty state
and submissions fail gracefully with a "message us on Instagram" hint.

## Customizing

- **Text (both languages):** edit the `translations` object at the top of `js/main.js`.
  The English strings in `index.html` are the defaults before JavaScript runs.
- **Portfolio:** the six project cards in the `#work` section are placeholders.
  Replace the titles/descriptions and swap the gradient `.project__thumb--N` blocks
  for real screenshots (`<img>`) when case studies are ready.
- **Testimonials:** placeholders too — swap in real client quotes in `index.html`
  and `js/main.js`.
- **Colors:** all brand colors live in the `:root` variables at the top of
  `css/style.css`.
- **Contact:** all CTAs point to the Instagram profile; update the `href`s if you
  add email or WhatsApp later.
