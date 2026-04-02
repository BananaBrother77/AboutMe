const themeOrder = ['default', 'theme-red', 'theme-blue', 'theme-yellow'];
const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = Array.from(document.querySelectorAll('.nav-link[data-nav-target]'));
const themeButtons = Array.from(document.querySelectorAll('.theme-option[data-theme]'));
const langButtons = Array.from(document.querySelectorAll('[data-lang-toggle]'));
const sectionNodes = Array.from(document.querySelectorAll('.page-section[data-title-key]'));
const revealNodes = Array.from(document.querySelectorAll('[data-reveal]'));
const statsNodes = Array.from(document.querySelectorAll('.stat-number[data-value]'));
const topLangButton = document.getElementById('lang-switch');
const settingsLangButton = document.getElementById('lang-setting');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let currentLang = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('savedTheme') || 'default';
let activeSectionId = sectionNodes[0]?.id || null;
let scrollTicking = false;

function isValidTheme(theme) {
  return themeOrder.includes(theme);
}

function getTranslation(key) {
  if (typeof translations !== 'object') return '';
  return translations[currentLang]?.[key] || translations.en?.[key] || '';
}

function updateThemeMeta() {
  if (!themeMeta) return;
  const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim();
  if (accent) {
    themeMeta.setAttribute('content', accent);
  }
}

function applyTheme(theme) {
  const nextTheme = isValidTheme(theme) ? theme : 'default';

  document.body.classList.remove(...themeOrder);
  document.body.classList.add(nextTheme);
  currentTheme = nextTheme;
  localStorage.setItem('savedTheme', nextTheme);
  updateThemeMeta();

  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === nextTheme;
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function cycleTheme() {
  const currentIndex = themeOrder.indexOf(currentTheme);
  const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
  applyTheme(nextTheme);
}

function updateLanguageButtons() {
  if (topLangButton) {
    topLangButton.textContent = currentLang === 'en' ? 'DE / EN' : 'EN / DE';
  }

  if (settingsLangButton) {
    settingsLangButton.textContent = getTranslation('language_switch_target');
  }
}

function updateDocumentTitle(sectionId = activeSectionId) {
  if (!sectionId) return;

  const activeSection = document.getElementById(sectionId);
  const titleKey = activeSection?.dataset.titleKey;
  const titleLabel = titleKey ? getTranslation(titleKey) : '';

  if (titleLabel) {
    document.title = `BananaBrother77 | ${titleLabel}`;
  }
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const translatedValue = getTranslation(key);

    if (translatedValue) {
      element.textContent = translatedValue;
    }
  });

  document.documentElement.lang = currentLang;
  updateLanguageButtons();
  updateDocumentTitle();
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'de' : 'en';
  localStorage.setItem('language', currentLang);
  applyTranslations();
}

function closeNavigation() {
  document.body.classList.remove('nav-open');
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
  }
}

function openNavigation() {
  document.body.classList.add('nav-open');
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'true');
  }
}

function toggleNavigation() {
  if (document.body.classList.contains('nav-open')) {
    closeNavigation();
    return;
  }

  openNavigation();
}

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.dataset.navTarget === sectionId;
    link.classList.toggle('is-active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function setActiveSection(sectionId, replaceHash = true) {
  if (!sectionId) return;

  activeSectionId = sectionId;
  setActiveNav(sectionId);
  updateDocumentTitle(sectionId);

  const nextHash = `#${sectionId}`;
  if (replaceHash && location.hash !== nextHash) {
    history.replaceState(null, '', nextHash);
  }
}

function getScrollOffset() {
  return (siteHeader?.offsetHeight || 0) + 14;
}

function scrollToSection(sectionId, smooth = true) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - getScrollOffset();
  window.scrollTo({
    top,
    behavior: smooth && !prefersReducedMotion ? 'smooth' : 'auto',
  });
}

function detectCurrentSection() {
  if (!sectionNodes.length) return null;

  const marker = window.scrollY + getScrollOffset() + window.innerHeight * 0.2;
  let current = sectionNodes[0].id;

  sectionNodes.forEach((section) => {
    if (section.offsetTop <= marker) {
      current = section.id;
    }
  });

  return current;
}

function handleScroll() {
  if (scrollTicking || !sectionNodes.length) return;

  scrollTicking = true;
  window.requestAnimationFrame(() => {
    const current = detectCurrentSection();
    if (current && current !== activeSectionId) {
      setActiveSection(current, true);
    }
    scrollTicking = false;
  });
}

function initReveal() {
  if (!revealNodes.length) return;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
}

function animateStat(node) {
  const targetValue = Number(node.dataset.value || 0);

  if (prefersReducedMotion || Number.isNaN(targetValue)) {
    node.textContent = String(targetValue);
    return;
  }

  const duration = 1400;
  const startTime = performance.now();

  const tick = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = String(Math.round(targetValue * eased));

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
      node.textContent = String(targetValue);
    }
  };

  window.requestAnimationFrame(tick);
}

function initStats() {
  if (!statsNodes.length) return;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.animated === 'true') return;

        entry.target.dataset.animated = 'true';
        animateStat(entry.target);
        statsObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.6,
    },
  );

  statsNodes.forEach((node) => statsObserver.observe(node));
}

function initNavigation() {
  if (navToggle) {
    navToggle.addEventListener('click', toggleNavigation);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const sectionId = link.dataset.navTarget;
      const target = sectionId ? document.getElementById(sectionId) : null;

      if (!target) {
        closeNavigation();
        return;
      }

      event.preventDefault();
      closeNavigation();
      scrollToSection(sectionId, true);
      history.pushState(null, '', `#${sectionId}`);
      setActiveSection(sectionId, false);
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeNavigation();
    }
  });
}

function initShortcuts() {
  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isEditable =
      target instanceof HTMLElement &&
      (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

    if (isEditable) return;

    if (event.key.toLowerCase() === 't') {
      cycleTheme();
    }

    if (event.key.toLowerCase() === 'l') {
      toggleLanguage();
    }

    if (event.key === 'Escape') {
      closeNavigation();
    }
  });
}

langButtons.forEach((button) => button.addEventListener('click', toggleLanguage));
themeButtons.forEach((button) => {
  button.addEventListener('click', () => applyTheme(button.dataset.theme || 'default'));
});

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('hashchange', () => {
  const sectionId = location.hash.replace('#', '');
  if (!sectionId || !document.getElementById(sectionId)) return;

  scrollToSection(sectionId, false);
  setActiveSection(sectionId, false);
});

document.addEventListener('DOMContentLoaded', () => {
  if (!isValidTheme(currentTheme)) {
    currentTheme = 'default';
  }

  applyTheme(currentTheme);
  applyTranslations();
  initNavigation();
  initReveal();
  initStats();
  initShortcuts();

  if (sectionNodes.length) {
    const initialSectionId = location.hash.replace('#', '') || sectionNodes[0].id;
    if (document.getElementById(initialSectionId)) {
      setActiveSection(initialSectionId, false);
      window.requestAnimationFrame(() => scrollToSection(initialSectionId, false));
    } else {
      setActiveSection(sectionNodes[0].id, false);
    }
  }
});
