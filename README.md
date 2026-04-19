# 🍌 AboutMe — Personal Portfolio Website

<div align="center">

<img src="https://raw.githubusercontent.com/BananaBrother77/global-assets/refs/heads/main/profile.jpeg" alt="Portfolio Preview" width="120" height="120" style="border-radius: 50%;">

_A static personal portfolio with bilingual UI, theme switching, and client-side routes._

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## ✨ Features

- Bilingual interface with shared **English** and **German** translations
- **4 theme presets** saved in `localStorage`
- Client-side route navigation for `/home`, `/information`, `/projects`, `/gaming`, and `/settings`
- Animated stat counters, reveal transitions, and responsive layouts
- Keyboard shortcuts: `L` for language, `T` for theme cycling
- Custom `404.html`, `humans.txt`, `sitemap.xml`, favicons, and redirect rules for static hosting

---

## 🌐 Routes

### Main Portfolio

- `/` → redirects in-app to `/home`
- `/home`
- `/information`
- `/projects`
- `/gaming`
- `/settings`

### Extra Pages

- `/github` → redirects to the GitHub profile
- `/maxim` → redirects to `maximerix.dev`
- `/humans` → `humans.txt`
- Unknown routes fall back to `index.html` through `_redirects`
- `404.html` is included as a standalone error page

---

## 🚀 Live Site

- Main site: [bananabrother77.online](https://bananabrother77.online)

---

## 🧱 Project Structure

```text
AboutMe/
├── assets/                    # Images and logos used across the site
├── 404.html                   # Standalone not-found page
├── _redirects                 # Static host rewrite and redirect rules
├── favicon.ico
├── favicon.png
├── humans.txt                 # Small human-readable site note
├── index.html                 # Main portfolio shell
├── README.md
├── script.js                  # Routing, theme, language, and animation logic
├── sitemap.xml                # Search engine sitemap
├── style.css                  # Main portfolio styling
└── translations.js            # Shared EN/DE translation strings
```

---

## 🛠️ Technologies

- **HTML5** for markup
- **CSS3** with custom properties and theme classes
- **Vanilla JavaScript** for routing, translations, theme switching, and UI behavior
- **Google Fonts** (`Inter`)
- **Devicon/CDN assets** for platform icons

No framework or build step is required for the main site.

---

## ▶️ Local Development

Serve the repository with any static file server.

```bash
python -m http.server 8080
```

Then open [http://localhost:8080/](http://localhost:8080/).

Note: direct deep links like `/projects` need rewrite support from the host. The repo includes `_redirects` for deployment, but a basic local server may only work reliably if you start at `/` and navigate inside the site.

---

## 🚢 Deployment Notes

- This project is designed for static hosting
- `_redirects` handles SPA-style rewrites plus shortcut redirects like `/github` and `/maxim`
- `sitemap.xml`, `humans.txt`, and the favicon files are shipped as static assets

---

## 🔗 Links

- Portfolio: [bananabrother77.online](https://bananabrother77.online)
- GitHub: [@BananaBrother77](https://github.com/BananaBrother77)
- Discord: [MCServerHost Community](https://discord.gg/mcserverhost)
- Discord: [Banana Studios](https://discord.gg/mtzPBcjUHN)

---

## 📝 License

This repository does not currently include a license file.

---

<div align="center">

**Made with ❤️ by BananaBrother77**

</div>
