# CarePoint Pharmacy Website — Part 3

Responsive front-end educational demo for the existing CarePoint Pharmacy project. It preserves the Part 2 teal/navy visual direction and adds interactions, search/filter/sort, form validation, SEO metadata, an illustrative Leaflet map, and documentation.

> **Demo and safety notice:** This is not a real pharmacy storefront. The catalogue, prices, business details and map reference are illustrative. No medicines are sold, prescriptions are not processed, and payments are not accepted. Do not submit real health information. Before any commercial launch, obtain appropriate professional, privacy, security and regulatory review.

## Part 3 features
- Shared mobile navigation with accessible expanded state.
- Dynamic product catalogue rendered from a JavaScript array.
- Product search, category filtering, and sort by name or price.
- Demo cart using `localStorage`, quantity controls, remove action, total calculation and cart snapshot passed to the enquiry page.
- Modal, tab interface, FAQ accordions, image lightbox and scroll reveal animation.
- Contact page Leaflet map centred on Polokwane for illustration only, not a verified store location.
- HTML5 constraints and JavaScript per-field validation.
- AJAX form submission with `fetch()` once a real HTTPS form-service endpoint is configured.
- Page-specific title, meta description, canonical URL and Open Graph metadata.
- `robots.txt`, `sitemap.xml`, responsive CSS, reduced-motion handling and accessible status messages.
- `404.html` custom not-found page.

## Project structure
```text
CarePoint-Pharmacy.github.io/
├── index.html
├── products.html
├── prescription.html
├── about.html
├── contact.html
├── enquiry.html
├── cart.html
├── 404.html
├── style.css
├── main.js
├── script.js
├── search.js
├── form-validation.js
├── map.js
├── robots.txt
├── sitemap.xml
└── images/hero/
    ├── carepoint-hero-480.svg
    ├── carepoint-hero-800.svg
    └── carepoint-hero-1200.svg
```

## Form setup (required before live submissions)
1. Create a form with a reputable form-processing provider that supports HTTPS and AJAX submissions, such as Formspree, or deploy your own secure backend.
2. Verify the provider's privacy terms and whether it is appropriate for the type of information you plan to collect.
3. In `contact.html`, `enquiry.html`, and `prescription.html`, replace `https://formspree.io/f/REPLACE_WITH_FORM_ID` in the form `action` attribute with your real endpoint.
4. Configure allowed domains and notification recipients in the form provider dashboard.
5. Test a successful submission and a failed/offline submission. The interface intentionally does not report success when the endpoint is still a placeholder.
6. Do not collect prescription images, medical records or sensitive health information with a generic form service. A real prescription workflow needs a suitable secure, compliant system.

Client-side validation improves usability but is not a security boundary. A server/backend must validate and sanitize submitted data too. Do not put API keys or secrets in browser JavaScript.

## SEO and off-page SEO plan
- Keep unique page titles and descriptions; use accurate, non-misleading content.
- The canonical URLs and sitemap use the current GitHub Pages base URL. If the repository URL changes, update all canonical URLs, Open Graph URLs, sitemap URLs and the sitemap line in `robots.txt`.
- Add genuine backlinks by listing the project in relevant student portfolios and web-development profiles. Do not buy spam links.
- Share useful pages on social profiles with a descriptive preview. Open Graph tags provide the share metadata.
- Local SEO: only after a real business exists, use verified name, address, phone, opening hours and business details consistently; create/verify an appropriate business profile. Do not claim a fictional location or pharmacy status.
- Add structured data only for facts that are true and verifiable. The homepage uses WebSite schema for the educational demo, not a claim of a licensed pharmacy.
- Search engines may take time to crawl. Sitemap submission does not guarantee indexing.

## Performance and security
- Local assets are used where possible; scripts use `defer`; the hero image loads eagerly and other page images are minimal.
- Use HTTPS (GitHub Pages serves the published site over HTTPS).
- Keep user-provided form content out of `innerHTML`; the form code uses `textContent` for status messages.
- Cart data is browser-local and can be edited by the visitor. It is not authoritative order or payment data.
- Consider adding a Content Security Policy and further security headers if moving to a host that supports them.

## Mobile-first GitHub Pages deployment
1. Download and extract this ZIP on your phone.
2. Open the repository `https://github.com/leparadiseofficial/CarePoint-Pharmacy.github.io`.
3. To protect the current site, create a branch named `part-3-upgrade` from the `main` branch before replacing files.
4. In GitHub, open each existing file and use Edit (pencil). Replace its full contents with the matching file from this package. For new files (`main.js`, `search.js`, `form-validation.js`, `map.js`, `robots.txt`, `sitemap.xml`) choose **Add file → Create new file**, paste the contents and commit.
5. Upload the `images/hero/` SVG files into the same folder path. Keep file and folder names exactly as shown.
6. Commit changes to `part-3-upgrade` and preview/test the branch or use a pull request to merge into `main` only after testing.
7. On GitHub, go to **Settings → Pages** and confirm deployment uses `main` and `/ (root)` after merge.
8. Wait for the Pages deployment to finish, then open the live site and refresh. If an old version appears, clear the browser cache or try a private tab.

### Quick phone workflow
- Use GitHub's mobile website in Chrome.
- For existing files: open file → pencil icon → Select all → paste replacement → **Commit changes**.
- For new files: repository → **Add file** → **Create new file** → type the exact filename (including folders, e.g. `images/hero/carepoint-hero-800.svg`) → paste → **Commit changes**.
- Do not paste several different files into one editor. Each file is a separate commit unless using the GitHub web upload interface.

## Testing checklist
- [ ] Every navigation link works on desktop and phone.
- [ ] Products search, category filtering and all sort options work.
- [ ] Add product, change quantity, remove product and cart total work.
- [ ] Cart summary reaches `enquiry.html` without treating it as a real order.
- [ ] Modal, tabs, FAQ accordions, image lightbox and Escape-to-close work.
- [ ] Form required/email/minimum-length errors appear beside fields.
- [ ] With placeholder endpoint, form clearly says it was not sent.
- [ ] With a configured endpoint, successful and failed AJAX requests are tested.
- [ ] Map loads with attribution and is labelled illustrative.
- [ ] No horizontal overflow at 320px, 375px, 768px and desktop width.
- [ ] All page titles, descriptions, canonical links and internal links are correct.
- [ ] Check browser console for errors and verify `robots.txt` and `sitemap.xml` open.

## Changelog

### Part 3
- Added page-specific SEO metadata, canonical URLs, Open Graph metadata and WebSite structured data.
- Added `robots.txt` and `sitemap.xml`.
- Added shared accessible mobile navigation, modal, tabs, FAQ accordions, image lightbox and scroll reveal animation.
- Split product search/filter/sort into `search.js`.
- Improved cart rendering with DOM APIs, quantity limits, totals, and cart summary transfer to the enquiry page.
- Added Leaflet/OSM illustrative map with attribution and an explicit disclaimer that no real store location is provided.
- Added HTML5 and JavaScript validation with field-level error messages, message-length counter, honeypot and AJAX fetch handling.
- Added a clear warning when the form endpoint has not been configured; no fake success state.
- Improved reduced-motion, keyboard focus, semantic labels, live regions and responsive layouts.
- Updated project documentation, deployment steps, SEO plan and test checklist.

### Part 2
- External responsive stylesheet, CSS custom properties, responsive typography and Grid/Flexbox layouts.
- Tablet/mobile breakpoints, accessible focus styles and reduced-motion support.
- Responsive hero illustration and browser-based demonstration cart.

### Part 1 lecturer feedback
Add the exact feedback from the lecturer's marked rubric here. Do not invent feedback or marks.

## References
- MDN Web Docs, Constraint validation: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation
- MDN Web Docs, Sending form data: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data
- MDN Web Docs, Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- Leaflet Quick Start Guide: https://leafletjs.com/examples/quick-start/
- OpenStreetMap copyright and attribution: https://www.openstreetmap.org/copyright
- Google Search Central, Build and submit a sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google Search Central, Introduction to structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- W3C Web Accessibility Initiative: https://www.w3.org/WAI/
- GitHub Pages documentation: https://docs.github.com/en/pages

© 2026 CarePoint Pharmacy — educational demo project.
