# 🍌 AboutMe — Personal Portfolio Website

<div align="center">

<img src="https://raw.githubusercontent.com/BananaBrother77/global-assets/refs/heads/main/profile.jpeg" alt="Portfolio Preview" width="120" height="120" style="border-radius: 50%;">

*A modern, responsive personal portfolio showcasing roles, skills, and favorite games*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## ✨ Features

### 🌍 Internationalization (i18n)
- Full **English** and **German** language support
- Automatic language detection based on browser settings
- Language preference persisted in localStorage
- Seamless switching without page reload

### 🎨 Theme System
- **4 color themes**: Purple (default), Red, Blue, Yellow
- Theme preference saved in localStorage
- Smooth transitions between themes
- Custom CSS variables for easy customization

### 📑 Tab Navigation
- **Home** - Hero section with profile and badges
- **Information** - Personal details and role descriptions
- **Gaming** - Showcase of favorite games
- **Settings** - Language and theme preferences

### 📱 Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly navigation
- Optimized performance

### ⚡ Interactive Elements
- Smooth animations and transitions
- Hover effects on cards and buttons
- Tab switching with slide-up animation
- Scroll-to-top on navigation

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BananaBrother77/AboutMe.git
   cd AboutMe
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if installed)
     npx serve
     ```

3. **Customize** (optional)
   - Edit `index.html` to change content
   - Modify `translations.js` for additional languages
   - Update CSS variables in `style.css` for custom theming

---

## 📁 Project Structure

```
AboutMe/
├── assets/                    # Static assets
│   ├── profile-gf.png        # Secondary profile image
│   ├── minecraft.jpeg        # Game cover image
│   ├── portal.png            # Game cover image
│   ├── hollowknight.jpeg     # Game cover image
│   ├── hades.jpeg            # Game cover image
│   └── mcsh.png              # MCServerHost logo
├── index.html                # Main HTML structure
├── style.css                 # All styling and themes
├── script.js                 # JavaScript logic
└── translations.js           # i18n translations
```

---

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Vanilla JavaScript
- **Google Fonts** - Inter font family
- **Devicon** - Technology icons via CDN

---

## 📖 Usage

### Adding New Sections

1. Add a new navigation button in `index.html`:
   ```html
   <button class="nav-btn" data-target="new-section">New Section</button>
   ```

2. Add the corresponding content section:
   ```html
   <section id="new-section" class="tab-content">
     <!-- Your content here -->
   </section>
   ```

3. Add translations in `translations.js`:
   ```javascript
   "en": {
     "new-section-key": "New Section"
   },
   "de": {
     "new-section-key": "Neuer Abschnitt"
   }
   ```

### Adding New Themes

1. Add CSS variables in `style.css`:
   ```css
   body.theme-green {
     --accent-color: #00ff88;
     --accent-glow: rgba(0, 255, 136, 0.4);
     --border-color: rgba(0, 255, 136, 0.3);
   }
   ```

2. Add theme option in `index.html`:
   ```html
   <div class="theme-option green" data-theme="theme-green">
     <div class="theme-preview green"></div>
     <span>Green</span>
   </div>
   ```

---

## 🔗 Links

- **Portfolio**: [bananabrother77.github.io/AboutMe](https://bananabrother77.github.io/AboutMe)
- **GitHub**: [@BananaBrother77](https://github.com/BananaBrother77)
- **Discord**: [MCServerHost Community](https://discord.gg/mcserverhost)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [MCServerHost](https://mcserverhost.com) - Hosting partner
- [Devicon](https://devicon.dev) - Technology icons
- [Google Fonts](https://fonts.google.com) - Inter font family

---

<div align="center">

**Made with ❤️ by BananaBrother77**

</div>

