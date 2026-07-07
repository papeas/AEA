# Nexus — Studio Landing Page

A bold, single-page marketing site for **Nexus**, a small studio that builds
websites for clients. Design inspired by [landonorris.com](https://landonorris.com):
full-screen hero, scroll-triggered reveals, and high-energy motion.

## Structure

```
nexus/
├── index.html      # markup
├── css/style.css   # styles, animations, responsive rules
└── js/main.js      # scroll reveals + nav-on-scroll
```

## Highlights

- **Plain HTML/CSS/JS** — no build step; open `index.html` or serve the folder.
- **Brand colors** — pink (`#ff2e93`) → blue (`#2e6bff`) gradients used across the
  hero accent, buttons, hover states, and a moving background blob.
- **Sections** — full-screen hero, about (with stats), 3 service cards
  (Web Design, Development, Branding) with gradient hover fills, a work grid with
  hover reveal overlays, and a gradient contact CTA.
- **Motion** — `IntersectionObserver` scroll fades/slides, hover scale + color
  shifts, animated gradient text, and drifting gradient blobs.
- **Accessible & responsive** — respects `prefers-reduced-motion`, adapts to
  light/dark via `prefers-color-scheme`, fluid `clamp()` typography, and system
  font fallbacks (Google Fonts loaded progressively).

## Preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/nexus/
```
