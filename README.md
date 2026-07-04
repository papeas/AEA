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

Visitors can leave a review via the "Leave a review" button. Reviews are stored
by the small backend in `server/`:

```
node server/server.js        # serves the site + reviews API on :3000
```

- Reviews publish immediately by default. Set `MODERATE=1` to hold them for
  approval, and `ADMIN_TOKEN=<secret>` to enable the admin endpoints
  (`/api/admin/reviews?token=…`, `/api/admin/approve`, `/api/admin/delete`).
- Data is saved to `server/reviews-data.json` (gitignored).

**Important:** GitHub Pages only serves static files, so on the live Pages site
the reviews section shows its empty state and submissions fail gracefully with
a "message us on Instagram" hint. To make reviews work in production, deploy
`server/server.js` to any free Node host (Render, Railway, Fly.io — the whole
repo, start command `node server/server.js`) and put the deployed URL in the
`REVIEWS_API` constant at the top of `js/main.js`.

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
