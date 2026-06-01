const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll('.reveal').forEach((el, index) => {
  const rect = el.getBoundingClientRect();
  const isOnScreen = rect.top < window.innerHeight;

  if (isOnScreen) {
    el.style.transitionDelay = `${index * 0.1}s`;
  }

  observer.observe(el);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`,
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((section) => navObserver.observe(section));

// Scroll to section from clean URL like /information on page load
const path = window.location.pathname.replace('/', '');
if (path) {
  const target = document.getElementById(path);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', `/#${path}`);
  }
}

// Elements
const memberCountEl = document.getElementById('memberCount');

const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const langSwitchBtn = document.getElementById('langSwitchBtn');
const themeBtns = document.querySelectorAll('.theme-btn');

settingsBtn.addEventListener('click', () => {
  settingsModal.classList.add('show');
});

closeModalBtn.addEventListener('click', closeSettingsModal);

function closeSettingsModal() {
  settingsModal.classList.remove('show');
}

// Theme Switch

const savedTheme = localStorage.getItem('theme') || 'purple';

function applyTheme(theme) {
  document.body.classList.remove('theme-green', 'theme-red', 'theme-yellow', 'theme-blue');
  if (theme !== 'purple') document.body.classList.add(`theme-${theme}`);
  localStorage.setItem('theme', theme);
  document.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

applyTheme(savedTheme);

document.querySelectorAll('.theme-btn').forEach((btn) => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

// Language Switch

const savedLang = localStorage.getItem('language');
let currentLang = savedLang || 'en';

document.documentElement.lang = currentLang;

function getTranslation(key) {
  return translations[currentLang]?.[key] || translations.en?.[key] || '';
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = getTranslation(key);
    if (value) {
      el.textContent = value;
    }
  });
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'de' : 'en';
  localStorage.setItem('language', currentLang);
  document.documentElement.lang = currentLang;
  applyTranslations();
}

applyTranslations();

if (langSwitchBtn) {
  langSwitchBtn.addEventListener('click', toggleLanguage);
}

// DISCORD COMMUNITY MEMBER COUNT

async function fetchDiscordMemberCount() {
  try {
    const res = await fetch(
      'https://discord.com/api/v9/invites/mcserverhost?with_counts=true',
    );
    const data = await res.json();

    const count = data.approximate_member_count ?? 'N/A';

    if (memberCountEl) {
      memberCountEl.textContent = count.toLocaleString();
    }
  } catch (error) {
    console.error('Error fetching Discord member count:', error);
  }

  setTimeout(fetchDiscordMemberCount, 120000); // Refresh every 120 seconds (2 minutes)
}

// Keyboard shortcuts

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 's':
      if (!settingsModal.classList.contains('show')) {
        settingsModal.classList.add('show');
      }
      break;
    case 'Escape':
      if (settingsModal.classList.contains('show')) {
        closeSettingsModal();
      }
      break;
    case 'l':
      toggleLanguage();
      break;
  }
});

fetchDiscordMemberCount();