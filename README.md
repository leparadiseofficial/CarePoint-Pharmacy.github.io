# CarePoint Pharmacy Website — Part 2

A modern, responsive pharmacy website built with **HTML5, CSS3 and vanilla JavaScript**.

## Part 2 implementation

This version applies the CSS and responsive-design requirements from Part 2 of the assignment.

### 1. External CSS and selectors
- All pages use the shared external `style.css`.
- Element, class and state selectors are used to style the site consistently.
- CSS custom properties are used for repeated colours, spacing and shadows.

### 2. Typography
The stylesheet uses:
- `font-family`
- `font-size`
- `font-weight`
- `line-height`
- `letter-spacing`
- `clamp()` for responsive heading sizes
- `rem` and `em`-style relative sizing where appropriate

A consistent typography hierarchy is used for page headings, section headings, labels, body text and supporting text.

### 3. Layout structure
CSS Grid and Flexbox are used throughout the website:
- Hero content uses CSS Grid.
- Feature and category sections use CSS Grid.
- Navigation, hero actions and quantity controls use Flexbox.
- Forms and contact/about layouts use responsive two-column Grid layouts.
- Product and cart layouts change at tablet and mobile breakpoints.

### 4. Visual styles
The design uses:
- `color`
- `background-color`
- gradients
- `border`
- `border-radius`
- `box-shadow`
- hover, focus and active states
- consistent spacing and reusable CSS variables

Interactive controls include visible keyboard focus states.

### 5. Responsive design
Breakpoints are included for:
- Desktop
- Tablet (`1000px` and below)
- Mobile (`800px` and below)
- Small mobile (`480px` and below)

Relative units, `clamp()`, flexible Grid columns and percentage-based container sizing are used to adapt the site to different screen sizes.

### 6. Responsive images
The homepage now includes a responsive `<picture>`/`srcset` implementation with 480px, 800px and 1200px image variants.

The image also uses `sizes`, intrinsic dimensions and an accessible `alt` description.

### 7. JavaScript functionality
The website retains and improves:
- Product search
- Category filtering
- URL-based category filtering
- Shopping cart using `localStorage`
- Quantity controls
- Remove-item functionality
- Demo checkout interaction
- Prescription enquiry form
- General enquiry form
- Mobile navigation with `aria-expanded`

## Features
- Responsive homepage and navigation
- Product catalogue with search and category filtering
- Functional shopping cart using browser localStorage
- Quantity controls and cart totals
- Prescription enquiry form
- General enquiry form
- About and contact pages
- Responsive mobile navigation
- Keyboard-accessible focus states
- Responsive hero image
- No frameworks or build tools required

## Project structure

```text
CarePoint-Pharmacy/
├── index.html
├── products.html
├── about.html
├── prescription.html
├── enquiry.html
├── contact.html
├── cart.html
├── style.css
├── script.js
├── images/
│   └── hero/
│       ├── carepoint-hero-480.svg
│       ├── carepoint-hero-800.svg
│       └── carepoint-hero-1200.svg
└── README.md
```

## Testing evidence

Use browser Developer Tools to test the website at desktop, tablet and mobile viewport sizes.

### Screenshots to add before submission

Insert screenshots under this section showing:
1. Desktop view — homepage
2. Tablet view — products page
3. Mobile view — navigation/products/cart
4. Mobile view — enquiry or prescription form

Suggested filenames:

```text
screenshots/
├── desktop-home.png
├── tablet-products.png
├── mobile-products.png
└── mobile-enquiry.png
```

The screenshots should clearly show that the layout changes appropriately at different viewport sizes.

## Part 2 changelog

### Part 2 — CSS and responsive design
- Reworked `style.css` into a structured external stylesheet using reusable CSS custom properties for colours, borders, radii and shadows.
- Added a consistent typography system using responsive `clamp()` heading sizes, relative units, line-height and letter-spacing.
- Expanded Grid and Flexbox layouts for the homepage hero, feature cards, categories, products, forms, contact information and cart.
- Added tablet and mobile breakpoints at `1000px`, `800px` and `480px`.
- Added hover, focus-visible and active states to navigation, buttons, cards and quantity controls.
- Added visible keyboard focus styling to improve accessibility.
- Improved form controls with consistent borders, spacing, focus states and responsive sizing.
- Improved the mobile navigation and updated JavaScript to manage `aria-expanded` and the open/closed menu state.
- Added accessible labels and live regions to dynamic product and cart content.
- Added responsive hero images using `<picture>`, `srcset` and `sizes`.
- Improved cart controls by adding button types and accessible quantity labels.
- Replaced the browser `alert()` interaction for cart updates with a temporary status message.
- Added a reduced-motion media query for users who prefer less animation.
- Updated this README with Part 2 implementation details, testing evidence requirements and a detailed changelog.

### Part 1 feedback changes
Add your lecturer's exact Part 1 feedback here if applicable. The current project files supplied for this update did not include the lecturer's feedback/marksheet, so no feedback has been invented.

## Run locally

1. Download or clone the repository.
2. Open `index.html` in a browser.
3. For development, use VS Code or GitHub Codespaces with a simple static server.

## GitHub Pages

1. Create or open the GitHub repository.
2. Upload all files and folders.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save and wait for GitHub Pages to publish the site.

## References

- MDN Web Docs — CSS Grid Layout: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
- MDN Web Docs — CSS Flexible Box Layout: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout
- MDN Web Docs — Responsive images: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images
- MDN Web Docs — Media queries: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries
- MDN Web Docs — `:focus-visible`: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
- MDN Web Docs — CSS `clamp()`: https://developer.mozilla.org/en-US/docs/Web/CSS/clamp
- W3C Web Accessibility Initiative: https://www.w3.org/WAI/

## Important before using commercially

This is a demonstration website. Replace demo contact details, product data and store information with verified information. Prescription handling, medicine sales, payments, customer records and clinical/pharmacy services need appropriate secure systems and compliance checks before a real launch.

## Technology

- HTML5
- CSS3
- JavaScript (ES6+)
- Browser localStorage for the demo cart

© 2026 CarePoint Pharmacy — Demo Project
