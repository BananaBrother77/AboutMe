# AboutMe — Personal Portfolio

This repository contains a simple, static personal portfolio website for BananaBrother77 built with HTML, CSS and JavaScript. It is designed as a lightweight single‑page site to showcase roles, skills, favorite games and basic settings (theme and language).

## Features

- Single‑page site (no backend required)
- English / German support via simple i18n (data-i18n attributes)
- Theme selection (default / red / blue) persisted in localStorage
- Tab navigation (Home, Roles, Games, Settings)
- Responsive layout and simple animations

## Repository Structure

- `index.html` — Main page
- `style.css` — Styling and theme variables
- `script.js` — Language, theme and tab logic
- `assets/` — Images and other static assets
- `google34ada29e47854586.html` — Google site verification file

## Quick start (local)

1. Clone the repo:

   git clone https://github.com/BananaBrother77/AboutMe.git
   cd AboutMe

2. Serve locally (recommended to use a simple HTTP server so relative paths work correctly):

   - With Python 3:
     python3 -m http.server 8000
     Then open: http://localhost:8000

   - With Node (serve):
     npm i -g serve
     serve .

3. Edit `index.html`, `style.css` or `script.js` and refresh the browser to see changes.

## Accessibility & Privacy Notes

- The site is static and does not collect user data. External resources such as Google Fonts and icons are loaded from CDNs — if you need GDPR compliance or want to avoid third‑party requests, consider self‑hosting fonts and icons.
- Consider adding ARIA attributes for improved accessibility (e.g., `role="tablist"/role="tab"` for the tab navigation) and visible focus styles for keyboard users.
- Add `loading="lazy"` and width/height attributes to images or use `aspect-ratio` to reduce layout shift.

## Security & Legal Notes

- No API keys or secrets are stored in the visible files. If you ever have keys in the repository history, rotate them and remove them from history using tools like `git filter-repo` or `BFG`.
- Make sure you have permission to use any logos or images included in `assets/` (e.g., the MCServerHost logo). If you do not have permission, replace the image or remove the reference.

## Deployment

- You can host this site with GitHub Pages:
  1. Go to the repository Settings → Pages
  2. Select the branch `main` and the root folder `/` as the source
  3. Save and wait a few minutes for the site to go live at `https://BananaBrother77.github.io/AboutMe/`

## Recommended additions (optional)

- Add a `LICENSE` (e.g., MIT) to specify how others may use the code.
- Add `README`, `SECURITY.md` and `CONTRIBUTING.md` for project guidance.
- Add GitHub Actions to run linters (ESLint, stylelint) and accessibility checks (axe or lighthouse) on push.

## Contributing

If you want to improve this project, feel free to open issues or pull requests. If you prefer, contact me directly for proposed changes.

---

If you'd like, I can also add a LICENSE, SECURITY.md, or set up a basic GitHub Actions workflow for linting and deployment. Please tell me which files you'd like me to add next.
