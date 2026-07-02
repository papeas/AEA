# Ekkeshis + Ierodiakonou — Website Redesign

A modern redesign of [eicyprus.com](https://eicyprus.com/), the website of Ekkeshis + Ierodiakonou, an independent firm of chartered accountants in Nicosia, Cyprus.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| Our Firm | `our-firm.html` |
| Services | `services.html` |
| Careers | `careers.html` |
| Contact Us | `contact.html` |

## Design

- **Palette:** deep navy + warm gold on an off-white background — a refined, trustworthy look for a professional services firm.
- **Typography:** Playfair Display for headings, Inter for body text (Google Fonts with system fallbacks).
- **Fully responsive:** mobile navigation drawer, fluid grids, and clamp-based type scaling.
- **No build step:** plain HTML/CSS/JS — open `index.html` in a browser or serve the folder with any static server.
- **Self-contained assets:** all icons are inline SVG; no image files required.
- **Accessible & polished:** scroll-reveal animations respect `prefers-reduced-motion`, semantic markup, keyboard-friendly navigation.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
