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
- **Information** - Personal details and role descriptions (two profiles)
- **Projects** - Showcase of projects with partner section
- **Gaming** - Favorite games showcase
- **Settings** - Language and theme preferences

### 👥 Multi-Profile Support
- Personal profile (BananaBrother77) with role details
- Guest profile (Christian) with personal website link
- Dual profile cards in Information section

### 📱 Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly navigation
- Optimized performance
- Breakpoint at 768px for mobile devices

### ⚡ Interactive Elements
- Smooth animations and transitions
- Hover effects on cards and buttons
- Tab switching with slide-up animation
- Scroll-to-top on navigation
- Fade-in animations on page load

### ♿ Accessibility
- Focus-visible styles for keyboard navigation
- Proper ARIA attributes
- Semantic HTML structure
- High contrast text colors

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
│   ├── profile-gf.png        # Secondary profile image (Christian)
│   ├── minecraft.jpeg        # Game cover image
│   ├── portal.png            # Game cover image
│   ├── hollowknight.jpeg     # Game cover image
│   ├── hades.jpeg            # Game cover image
│   └── mcsh.png              # MCServerHost logo
├── index.html                # Main HTML structure
├── style.css                 # All styling and themes
├── script.js                 # JavaScript logic (tabs, themes, i18n)
├── translations.js           # i18n translations (EN/DE)
└── google34ada29e47854586.html  # Google site verification
```

---

## 🎮 Favorite Games

The Gaming section showcases:
- **Minecraft** - Building, Redstone, community servers
- **Portal 1 & 2** - Logic puzzles and unique storytelling
- **Hollow Knight** - Metroidvania exploration and combat
- **Hades** - Roguelike gameplay with Greek mythology

---

## 🛠️ Technologies

- **HTML5** - Semantic markup with data attributes for i18n
- **CSS3** - Modern styling with CSS variables, animations, and responsive design
- **JavaScript (ES6+)** - Vanilla JavaScript with:
  - Tab navigation system
  - Theme switching with localStorage persistence
  - Internationalization (i18n) engine
  - DOM manipulation and event handling
- **Google Fonts** - Inter font family (300, 400, 600, 700 weights)
- **Devicon** - Technology icons via CDN
- **SVG Icons** - Inline SVGs for project cards and partner links

---

## 🎨 CSS Architecture

### CSS Variables System
```css
:root {
  /* Color System */
  --bg-color: #0d0d12;
  --card-bg: rgba(30, 30, 40, 0.4);
  --accent-color: #9d4edd;
  --text-main: #f8f9fa;
  --text-dim: #adb5bd;
  
  /* Theme Overrides */
  --discord-color: #5865f2;
  --trustpilot-color: #00b67a;
  --success-color: #2ed573;
  --warning-color: #ffc107;
  --error-color: #ff4d4d;
  
  /* Design Tokens */
  --shadow-sm/md/lg/glow;
  --transition-fast/normal/slow;
  --radius-sm/md/lg/xl;
  --spacing-xs/sm/md/lg/xl/2xl;
}
```

### Theme Classes
- `body.theme-red` - Red accent theme
- `body.theme-blue` - Blue accent theme
- `body.theme-yellow` - Yellow accent theme
- `body.dark-mode` - Dark mode (default)

### Animations
- `@keyframes fadeInUp` - Hero section entrance
- `@keyframes fadeSlide` - Tab content transitions

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

### Adding New Translations

Add new keys to both language objects in `translations.js`:
```javascript
"en": {
  "new_key": "English Text"
},
"de": {
  "new_key": "German Text"
}
```

---

## 💾 Data Persistence

The site uses `localStorage` to save:
- `savedTheme` - User's preferred color theme
- Language preference via JavaScript state

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

