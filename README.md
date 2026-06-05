# AboutMe — Personal Portfolio Website 2.0

<div align="center">

_A personal portfolio with bilingual UI, theme switching, and live Discord member count._

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
- Scroll reveal animations and intersection-based nav highlighting
- Styled `404.html` with language/theme restore
- Keyboard shortcuts: `S` to open settings, `L` to switch language, `Escape` to close settings

---

## File Structure

```text
AboutMe/
├── assets/
│   ├── js/
│   │   ├── meow.js           # Main JS: nav, theme, language, Discord, keyboard, modal
│   │   ├── translations.js   # EN/DE translation dictionary
│   │   ├── icons.js          # Lucide icon initialization
│   │   └── 404.js            # 404 page logic
│   └── *.jpeg / *.png        # Images
├── 404.html                  # Standalone error page
├── _redirects                # Static host rewrite rules
├── favicon.ico / favicon.png
├── humans.txt
├── index.html                # Main portfolio page
├── sitemap.xml
├── style.css                 # All styles (no inline CSS)
└── wrangler.toml             # Cloudflare Pages config
```

---

## Technologies

- **HTML5** for markup
- **CSS3** with custom properties and theme classes
- **Vanilla JavaScript** for translations, theme switching, Discord API, and UI behavior
- **Google Fonts** (Poppins)
- **Lucide** icons (v1.17.0 via unpkg CDN)
- **Cloudflare Pages** for hosting

No framework or build step required.

---

## Local Development

Serve the repository with any static file server:

```bash
python -m http.server 8080
```

Then open http://localhost:8080/.

---

## Deployment

- Designed for static hosting via Cloudflare Pages
- `wrangler.toml` configures the build output directory
- `_redirects` provides `/* /index.html 200` for SPA-style fallback
- `sitemap.xml`, `humans.txt`, and favicon files ship as static assets

---

## Links

- Portfolio: https://bananabrother77.online
- GitHub: https://github.com/BananaBrother77
- Discord: https://discord.gg/mtzPBcjUHN

---

## License

This repository does not currently include a license file.

---

<div align="center">

**Made with ❤️ by BananaBrother77**

</div>
