# VadayAI Solutions — Website

A hand-built static marketing site for VadayAI Solutions. No framework, no build step, no npm install — plain HTML5, CSS3 and vanilla JavaScript. Works opened directly from the filesystem (`file://`) or from any static web server.

## Running locally

You don't need to build anything. Either:

1. **Double-click `index.html`** to open it directly in a browser, or
2. **Serve it locally** (recommended, avoids any browser file:// quirks):
   ```bash
   # Python 3
   python -m http.server 8000
   # then visit http://localhost:8000

   # or Node
   npx serve .
   ```

## Deploying

This is a static site — drop the contents of `vadayai-website/` onto any static host:

- **Netlify / Vercel**: drag-and-drop the folder, or connect a git repo and set the publish directory to the project root (no build command needed).
- **GitHub Pages**: push this folder to a repo and enable Pages on the root or a `gh-pages` branch.
- **Any traditional web host**: upload the contents of this folder via FTP/SFTP to the web root.

Once live, update the `<link rel="canonical">`, Open Graph `og:url` tags, `sitemap.xml` and `robots.txt` if the domain differs from `https://www.vadayai.com/`.

## Where to edit content

| What | File |
|---|---|
| Global design tokens (colors, spacing, type) | `assets/css/style.css` (`:root` block near the top) |
| Responsive breakpoints | `assets/css/responsive.css` |
| FAQ questions/answers, testimonials, stats counters, service card blurbs | `assets/js/content.js` — plain JS arrays, rendered into the page by `main.js` |
| Interactive behavior (nav, tabs, carousel, accordion, form validation) | `assets/js/main.js` |
| Form submission endpoint | `FORM_ENDPOINT` constant at the top of `assets/js/main.js` — currently a placeholder |
| Page copy | Each `.html` file directly — there is no CMS or templating layer, so shared elements (header, footer, mega-menus) are duplicated across every page and must be edited in each file if changed |
| Logos | `assets/img/vadayai-logo.jpeg` (company) and `assets/img/practigo-logo.jpeg` (PractiGO product) |

## Project structure

```
vadayai-website/
├── index.html            Homepage
├── about.html
├── services.html          12 detailed service sections with #anchors
├── practigo.html          Flagship product page (PractiGO)
├── industries.html
├── contact.html
├── privacy-policy.html
├── terms.html
├── 404.html
├── assets/
│   ├── css/style.css        Design system + all component styles
│   ├── css/responsive.css   All media queries
│   ├── js/content.js         Editable data: FAQ, testimonials, stats, service cards
│   ├── js/main.js            All interactive components
│   └── img/                  Logos
├── robots.txt
├── sitemap.xml
└── favicon.svg
```

---

## Before you launch — fill these in

Everything below is marked with an HTML comment in the code (`<!-- FILL IN REAL DETAILS -->`, `<!-- REPLACE WITH REAL... -->`, or `<!-- SET REAL PRICING -->`) so it's easy to find with a search across the project.

- [ ] **Office address** — currently `[ADD OFFICE ADDRESS], Uttar Pradesh, India` in every page footer and on `contact.html`
- [ ] **Phone number** — currently `[ADD PHONE NUMBER]` in every page footer, `contact.html` and `index.html`
- [ ] **Social media URLs** — LinkedIn, X, Instagram, Facebook, YouTube icons in the footer all currently link to `#`
- [ ] **Testimonials** — `index.html` and `assets/js/content.js` (`TESTIMONIALS_DATA`) contain clearly labeled placeholder quotes attributed to "Client Name." Replace with real, permissioned client testimonials before launch — do not publish invented quotes
- [ ] **Stats counters** — `assets/js/content.js` (`STATS_DATA`) holds placeholder numbers for Projects Delivered, AI Engineers, Clients Served, Workflows Automated, Client Retention Rate and Countries Served. Replace with real, verified figures
- [ ] **Team / leadership section** — `about.html` has three placeholder leadership cards with generic initials avatars. Replace with real team members, titles and (optionally) photos
- [ ] **PractiGO pricing** — `practigo.html` pricing table currently shows "Contact for pricing" for all three tiers (Starter / Professional / Enterprise). Set real prices once finalized, or keep "Contact for pricing" intentionally
- [ ] **Form submission endpoint** — `FORM_ENDPOINT` in `assets/js/main.js` is a placeholder. Wire it to a real Formspree, Web3Forms or backend endpoint so contact form submissions actually send
- [ ] **Google Maps embed** — `contact.html` has a placeholder `<div class="map-placeholder">` with a comment showing the `<iframe>` snippet to drop in once the office address is confirmed
- [ ] **Legal review** — `privacy-policy.html` and `terms.html` are complete drafts but are marked with an HTML comment asking for review by qualified counsel before launch. Both also show a `Last updated: [DATE]` placeholder that needs a real date
- [ ] **Careers / Blog pages** — footer links to "Careers" and "Blog" currently point to `#` as placeholders since those pages weren't in scope for this build
- [ ] **Verify Google Fonts and asset load** — confirm the site has outbound internet access to `fonts.googleapis.com` in your deployment environment (or self-host the fonts if it's fully offline)

## Self-review notes

All internal links, the mobile menu, mega-menus, vertical tabs, counters, testimonial carousel, FAQ accordion and contact form validation were built and wired end-to-end. Test at 375px, 768px, 1024px, 1440px and 1920px widths before launch, and run a Lighthouse pass once the site is deployed to a real URL (Lighthouse results from `file://` are unreliable).
