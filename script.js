const tabNavLinks = Array.from(document.querySelectorAll('.nav-link[href]'));
const allTabs = Array.from(document.querySelectorAll('.tab-content'));
const themeOptions = Array.from(
  document.querySelectorAll('.theme-option[data-theme]'),
);
const langBtn = document.getElementById('lang-switch');
const langSetting = document.getElementById('lang-setting');
const statsSection = document.querySelector('.stats-section');
const validPages = new Set(allTabs.map((tab) => tab.id));
const themeOrder = ['default', 'theme-red', 'theme-blue', 'theme-yellow'];
const titleKeys = {
  home: 'home',
  information: 'information',
  projects: 'projects',
  gaming: 'gaming',
  settings: 'settings',
};

let savedTheme = localStorage.getItem('savedTheme') || 'default';
let currentLang = localStorage.getItem('language') || 'en';
let currentPage = validPages.has(getPageFromPath(location.pathname))
  ? getPageFromPath(location.pathname)
  : 'home';

function getTranslation(key) {
  return translations[currentLang]?.[key] || translations.en?.[key] || '';
}

function normalizePath(path) {
  if (!path || path === '/') return '/home';

  return path.endsWith('/') ? path.replace(/\/+$/, '') || '/home' : path;
}

function getPageFromPath(path) {
  return normalizePath(path).replace(/^\/+/, '');
}

function syncHistory(path, replace = false) {
  if (location.pathname === path) return;

  history[replace ? 'replaceState' : 'pushState']({}, '', path);
}

function updateTitle(page = currentPage) {
  if (!validPages.size) return;

  const titleKey = titleKeys[page];
  const label = getTranslation(titleKey) || 'Home';
  document.title = `BananaBrother77 | ${label}`;
}

function setActivePage(page) {
  currentPage = page;

  allTabs.forEach((tab) => {
    tab.classList.toggle('active', tab.id === page);
  });

  tabNavLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `/${page}`;
    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function renderPage(path, { replace = false, scroll = true } = {}) {
  if (!validPages.size) return false;

  let nextPath = normalizePath(path);
  let page = getPageFromPath(nextPath);

  // Always allow root as home, no fallback redirect
  if (path === '/' || path === '' || !validPages.has(page)) {
    nextPath = '/home';
    page = 'home';
    replace = true;
  }

  console.log(
    `[Router] Rendering "${path}" -> "${page}" (replace: ${replace})`,
  );
  syncHistory(nextPath, replace);
  setActivePage(page);
  updateTitle(page);

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  return true;
}

function applyTheme(theme) {
  const nextTheme = themeOrder.includes(theme) ? theme : 'default';

  document.body.classList.remove('theme-red', 'theme-blue', 'theme-yellow');

  if (nextTheme !== 'default') {
    document.body.classList.add(nextTheme);
  }

  savedTheme = nextTheme;
  localStorage.setItem('savedTheme', nextTheme);

  themeOptions.forEach((option) => {
    const isActive = option.dataset.theme === nextTheme;
    option.setAttribute('aria-pressed', String(isActive));
  });
}

function cycleTheme() {
  const currentIndex = themeOrder.indexOf(savedTheme);
  const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
  applyTheme(nextTheme);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const value = getTranslation(key);

    if (value) {
      element.textContent = value;
    }
  });

  document.documentElement.lang = currentLang;

  if (langBtn) {
    langBtn.textContent = currentLang === 'de' ? 'EN / DE' : 'DE / EN';
  }

  if (langSetting) {
    langSetting.textContent = getTranslation('language_switch_target');
  }

  updateTitle();
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'de' : 'en';
  localStorage.setItem('language', currentLang);
  applyTranslations();
}

function initNavigation() {
  if (!validPages.size) return;

  tabNavLinks.forEach((link) => {
    const path = link.getAttribute('href');
    const page = getPageFromPath(path);

    if (!validPages.has(page)) return;

    link.addEventListener('click', (event) => {
      event.preventDefault();
      renderPage(path);
    });
  });

  window.addEventListener('popstate', () => {
    renderPage(location.pathname, { replace: true, scroll: false });
  });
}

function initThemeControls() {
  themeOptions.forEach((option) => {
    option.addEventListener('click', () => {
      applyTheme(option.dataset.theme || 'default');
    });
  });
}

function isTypingTarget(target) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  );
}

function initShortcuts() {
  document.addEventListener('keydown', (event) => {
    if (isTypingTarget(event.target)) return;

    const key = event.key.toLowerCase();

    if (key === 't') {
      cycleTheme();
    }

    if (key === 'l') {
      toggleLanguage();
    }
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.card, .settings-card, .stats-section, .contact-section, .game-card, .project-card, .projects-partner, .mcsh-feature',
  );

  if (!revealElements.length) return;

  revealElements.forEach((element) => {
    element.classList.add('reveal');
  });

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => {
      element.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number[data-value]');

  statNumbers.forEach((stat) => {
    const finalValue = parseInt(stat.dataset.value || '', 10);
    if (Number.isNaN(finalValue)) return;

    const duration = 2000;
    const steps = 60;
    const increment = finalValue / steps;
    let current = 0;
    let step = 0;

    const timer = window.setInterval(() => {
      step += 1;
      current = Math.min(current + increment, finalValue);
      stat.textContent = String(Math.round(current));

      if (step >= steps) {
        window.clearInterval(timer);
        stat.textContent = String(finalValue);
      }
    }, duration / steps);
  });
}

function initStats() {
  if (!statsSection || !('IntersectionObserver' in window)) return;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animateStats();
        statsObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 },
  );

  statsObserver.observe(statsSection);
}

if (langBtn) {
  langBtn.addEventListener('click', toggleLanguage);
}

if (langSetting) {
  langSetting.addEventListener('click', toggleLanguage);
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(savedTheme);
  applyTranslations();
  initNavigation();
  initThemeControls();
  initShortcuts();

  if (validPages.size) {
    renderPage(location.pathname, { replace: true, scroll: false });
  }

  initScrollReveal();
  initStats();
});
