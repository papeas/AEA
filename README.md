# Nexus — Agency Website

Bilingual (English / Ελληνικά) one-page website for **Nexus**, the web studio behind
[@nexus_aea](https://www.instagram.com/nexus_aea) — websites, online shops, redesigns
and maintenance for businesses.

## Structure

```
├── index.html       # The whole site (single page)
├── css/style.css    # Brand styles — light theme, logo blue + gold palette
├── js/main.js       # EN/ΕΛ language toggle + mobile navigation
└── assets/logo.jpg  # Original Nexus logo (also used as the social share image)
```

No build step, no dependencies — open `index.html` in a browser or host it on any
static host (GitHub Pages, Netlify, Vercel).

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
