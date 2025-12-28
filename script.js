const translations = {
  "en": {
    "nav_about": "About me",
    "nav_home": "Home",
    "nav_exp": "Experience",
    "nav_gaming": "Gaming",
    "nav_settings": "Settings",
    "hero_subtitle": "Web Development & Community Integration",
    "badge_learning": "Learning Frontend",
    "mcsh_partner": "Official Partner",
    "mcsh_desc": "Reliable Hosting for your Minecraft Worlds",
    "btn_discord": "Join Discord",
    "title_roles": "Roles & Skills",
    "role_support_title": "Support @ MCServerHost",
    "role_support_desc": "Providing technical support and driving community growth through creative ideas.",
    "role_dev_title": "Development",
    "role_dev_desc": "Currently deep-diving into HTML5, CSS3, and JavaScript to build modern web applications.",
    "title_games": "Favorite Games",
    "game_mc_desc": "Surviving in endless worlds, building complex Redstone machines, and connecting with the community on servers",
    "game_portal_desc": "Challenging logic puzzles and a unique story, all in the name of science",
    "game_hollow_desc": "Exploring a vast, ruined kingdom, mastering challenging combat, and uncovering a deep, atmospheric story",
    "game_hades_desc": "Battle out of hell, master godly powers, and experience a gripping story in this fast-paced rogue-like",
    "settings_title": "Settings",
    "settings_lang_title": "Language",
    "settings_lang_desc": "Choose your preferred language.",
    "settings_theme_title": "Appearance",
    "settings_theme_desc": "Select a theme color for the website.",
    "theme_purple": "Purple",
    "theme_red": "Red",
    "theme_blue": "Blue"
  },
  "de": {
    "nav_about": "Über mich",
    "nav_home": "Start",
    "nav_exp": "Erfahrung",
    "nav_gaming": "Gaming",
    "nav_settings": "Einstellungen",
    "hero_subtitle": "Webentwicklung & Community-Integration",
    "badge_learning": "Lerne Frontend",
    "mcsh_partner": "Offizieller Partner",
    "mcsh_desc": "Zuverlässiges Hosting für deine Minecraft-Welten",
    "btn_discord": "Discord beitreten",
    "title_roles": "Rollen & Skills",
    "role_support_title": "Support @ MCServerHost",
    "role_support_desc": "Technischer Support und Förderung des Community-Wachstums durch kreative Ideen.",
    "role_dev_title": "Entwicklung",
    "role_dev_desc": "Aktuell vertiefe ich mich in HTML5, CSS3 und JavaScript, um moderne Webanwendungen zu bauen.",
    "title_games": "Lieblingsspiele",
    "game_mc_desc": "Überleben in endlosen Welten, Bauen von komplexen Redstone-Maschinen und Vernetzen mit der Community.",
    "game_portal_desc": "Herausfordernde Logikrätsel und eine einzigartige Geschichte, alles im Namen der Wissenschaft.",
    "game_hollow_desc": "Erkunden eines riesigen, ruinierten Königreichs, Meistern von Kämpfen und Aufdecken einer tiefgründigen Story.",
    "game_hades_desc": "Kämpfe dich aus der Hölle, meistere göttliche Kräfte und erlebe eine packende Geschichte in diesem rasanten Rogue-like.",
    "settings_title": "Einstellungen",
    "settings_lang_title": "Sprache",
    "settings_lang_desc": "Wähle deine bevorzugte Sprache.",
    "settings_theme_title": "Erscheinungsbild",
    "settings_theme_desc": "Wähle eine Farbe für die Webseite.",
    "theme_purple": "Lila",
    "theme_red": "Rot",
    "theme_blue": "Blau"
  }
};

let currentLang = localStorage.getItem('preferredLang') || (navigator.language.startsWith('de') ? 'de' : 'en');

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.innerText = translations[currentLang][key];
    }
  });
  document.documentElement.lang = currentLang;
}

function initTabs() {
  const navBtns = document.querySelectorAll('.nav-btn[data-target]');
  const allTabs = document.querySelectorAll('.tab-content');
  
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-target');
      const activeTab = document.getElementById(targetId);
      
      if (activeTab) {
        allTabs.forEach(tab => tab.classList.remove('active'));
        navBtns.forEach(b => b.classList.remove('active'));
        
        activeTab.classList.add('active');
        btn.classList.add('active');
      }
    });
  });
}

function changeTheme() {
  const currentTheme = localStorage.getItem('savedTheme');
  
  if (currentTheme && currentTheme !== 'default') {
    document.body.classList.add(currentTheme);
  } else {
    localStorage.removeItem('savedTheme');
  }
  
  const themeBtns = document.querySelectorAll('.theme-option');
  
  themeBtns.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      document.body.classList.remove('theme-red', 'theme-blue');
      
      if (theme !== 'default') {
        document.body.classList.add(theme);
      }
      
      localStorage.setItem('savedTheme', theme);
    });
  });
}

function initLangSwitch() {
  const langBtn = document.getElementById('lang-switch');
  const langSetting = document.getElementById('lang-setting');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      switchLang();
      showLangOnBtn();
    });
  }
  
  if (langSetting) {
    langSetting.addEventListener('click', () => {
      switchLang();
      showLangOnBtn();
    });
  }
}

function showLangOnBtn() {
  const langSetting = document.getElementById('lang-setting');
  
  if (currentLang == 'de') {
    langSetting.textContent = 'Englisch';
  } else {
    langSetting.textContent = 'German';
  }
}

function switchLang() {
  currentLang = currentLang === 'de' ? 'en' : 'de';
  localStorage.setItem('preferredLang', currentLang);
  updateContent();
}

document.addEventListener('DOMContentLoaded', () => {
  updateContent();
  initTabs();
  initLangSwitch();
  showLangOnBtn()
  changeTheme();
});