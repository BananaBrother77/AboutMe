# AboutMe - Personal Portfolio Website 2.0

<div align="center">

_A personal portfolio with bilingual UI, theme switching, live Discord member count, and a consistent navbar across all pages._

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## Features

- Bilingual interface with **English** and **German** translations (persisted in localStorage)
- **5 theme presets** (Purple, Green, Red, Yellow, Blue) saved in localStorage
- Hash-based navigation (`/#information`, `/#projects`, `/#gaming`)
- Live Discord member count from the MCSH community
- Custom feedback form with star ratings, categories, and Cloudflare Turnstile CAPTCHA
- Consistent navbar with brand logo across all pages (mobile-scrollable)
- Linktree button in the Socials section
- Scroll reveal animations and intersection-based nav highlighting
- Styled `404.html` with language/theme restore
- Keyboard shortcuts: `S` to open settings, `L` to switch language, `Escape` to close settings
- No frameworks or build steps - pure vanilla JS

---

## File Structure

```text
AboutMe/
├── assets/
│   ├── js/
│   │   ├── meow.js              # Main JS: nav, theme, language, Discord, keyboard, modal
│   │   ├── feedback.js          # Feedback form logic (Turnstile, validation, submission)
│   │   ├── translations.js      # EN/DE translation dictionary
│   │   ├── icons.js             # Lucide icon initialization
│   │   └── 404.js               # 404 page logic
│   ├── css/
│   │   └── feedback.css         # Feedback page specific styles
│   └── *.jpeg / *.png           # Images
├── functions/
│   └── api/
│       └── feedback-submit.js   # Cloudflare Pages Function (Discord webhook proxy)
├── 404.html                     # Standalone error page (consistent navbar)
├── _redirects                   # Static host rewrite rules
├── favicon.ico / favicon.png
├── feedback.html                # Feedback form page (consistent navbar)
├── humans.txt
├── index.html                   # Main portfolio page
├── sitemap.xml
├── style.css                    # All styles (no inline CSS)
└── wrangler.toml                # Cloudflare Pages config
```

---

## Technologies

- **HTML5** for markup
- **CSS3** with custom properties and theme classes
- **Vanilla JavaScript** for translations, theme switching, Discord API, form validation, and UI behavior
- **Google Fonts** (Poppins)
- **Lucide** icons (v1.17.0 via unpkg CDN)
- **Cloudflare Pages** for hosting + Pages Functions for form submission
- **Cloudflare Turnstile** for CAPTCHA on the feedback form

No framework or build step required.

---

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

This uses Wrangler to serve the site with Cloudflare Pages emulation (including redirects and functions).

Alternatively, serve with any static file server:

```bash
python -m http.server 8080
```

Then open http://localhost:8080/.

To deploy:

```bash
npm run deploy
```

---

## Deployment

- Designed for static hosting via Cloudflare Pages
- `wrangler.toml` configures the build output directory
- `_redirects` provides `/* /index.html 200` for SPA-style fallback
- `sitemap.xml`, `humans.txt`, and favicon files ship as static assets

---

## Links

- Portfolio: https://bananabrother77.online
- Linktree: https://linktr.ee/BananaBrother77
- GitHub: https://github.com/BananaBrother77
- Discord: https://discord.gg/mtzPBcjUHN

---

## License

This repository does not currently include a license file.

---

<div align="center">

**Made with ❤️ by BananaBrother77**

</div>
