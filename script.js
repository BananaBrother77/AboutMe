const navLinks = document.querySelectorAll('.nav-link');
const allTabs = document.querySelectorAll('.tab-content');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const path = link.getAttribute('href');

    history.pushState({}, '', path);

    renderPage(path);
  });
});

function renderPage(path) {
  let page = path.replace('/', '');

  if (page === '') {
    page = 'home';
  }

  allTabs.forEach((tab) => tab.classList.remove('active'));
  navLinks.forEach((link) => link.classList.remove('active'));

  const activeTab = document.getElementById(page);
  const activeLink = document.querySelector(`.nav-link[href="${path}"]`);

  if (activeLink) {
    activeLink.classList.add('active');
  }

  if (activeTab) {
    activeTab.classList.add('active');
  }

  updateTitle(page);
  window.scrollTo(0, 0);
}

window.addEventListener('popstate', () => {
  renderPage(location.pathname);
});

function updateTitle(page) {
  const titles = {
    home: 'BananaBrother77 | Home',
    information: 'BananaBrother77 | Information',
    projects: 'BananaBrother77 | Projects',
    gaming: 'BananaBrother77 | Gaming',
    settings: 'BananaBrother77 | Settings',
  };

  document.title = titles[page] || 'BananBrother77';
}

// Theme Switching
let savedTheme = localStorage.getItem('savedTheme');

if (savedTheme && savedTheme !== 'default') {
  document.body.classList.add(savedTheme);
}

document.querySelectorAll('.theme-option').forEach((option) => {
  option.addEventListener('click', () => {
    const theme = option.getAttribute('data-theme');
    document.body.classList.className = '';

    changeTheme(theme);

    localStorage.setItem('savedTheme', theme);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 't') checkTheme();
});

function checkTheme() {
  if (savedTheme == 'default') {
    changeTheme('theme-red');
    return;
  }
  if (savedTheme == 'theme-red') {
    changeTheme('theme-blue');
    return;
  }
  if (savedTheme == 'theme-blue') {
    changeTheme('theme-yellow');
    return;
  }
  if (savedTheme == 'theme-yellow') {
    changeTheme('default');
    return;
  }
}

function changeTheme(theme) {
  document.body.className = '';
  document.body.classList.add(theme);
  localStorage.setItem('savedTheme', theme);
  savedTheme = theme;
}

// Language Toggle
const langBtn = document.getElementById('lang-switch');
const langSetting = document.getElementById('lang-setting');
let currentLang = localStorage.getItem('language') || 'en';

function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });

  // Set html lang attribute dynamically
  document.documentElement.lang = currentLang;

  // Update language button text
  if (langBtn) {
    langBtn.textContent = currentLang === 'de' ? 'EN / DE' : 'DE / EN';
  }
  if (langSetting) {
    langSetting.textContent = currentLang === 'de' ? 'Englisch' : 'German';
  }
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'de' : 'en';
  localStorage.setItem('language', currentLang);
  applyTranslations();
}

if (langBtn) langBtn.addEventListener('click', toggleLanguage);
if (langSetting) langSetting.addEventListener('click', toggleLanguage);

document.addEventListener('keydown', (e) => {
  if (e.key === 'l') toggleLanguage();
});

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.card, .stats-section, .contact-section, .game-card, .project-card',
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    },
  );

  revealElements.forEach((el) => {
    el.classList.add('reveal');
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
  });
}

// Animate stat numbers
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach((stat) => {
    const finalValue = stat.getAttribute('data-value');
    if (!finalValue) return;

    const duration = 2000;
    const steps = 60;
    const increment = parseInt(finalValue) / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, parseInt(finalValue));
      stat.textContent = Math.round(current);

      if (step >= steps) {
        clearInterval(timer);
        stat.textContent = finalValue;
      }
    }, duration / steps);
  });
}

// Trigger stat animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Page load
document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname !== '/404.html') {
    renderPage(location.pathname);
  }
  applyTranslations();
  initScrollReveal();
});
