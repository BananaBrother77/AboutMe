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

const mcshStatsEls = {
  accounts: document.getElementById('mcshTotalAccounts'),
  activeServers: document.getElementById('mcshActiveServers'),
  players: document.getElementById('mcshTotalPlayers'),
  servers: document.getElementById('mcshTotalServers'),
  created: document.getElementById('mcshServersCreated'),
};

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

const COOKIE_DOMAIN = '.bananabrother77.online';

function getThemeCookie() {
  const match = document.cookie.match(/(?:^|;\s*)theme=([^;]*)/);
  return match ? match[1] : null;
}

function setThemeCookie(theme) {
  document.cookie = `theme=${theme}; domain=${COOKIE_DOMAIN}; path=/; max-age=31536000; SameSite=Lax`;
}

function deleteThemeCookie() {
  document.cookie = `theme=; domain=${COOKIE_DOMAIN}; path=/; max-age=0; SameSite=Lax`;
}

function shouldSyncTheme() {
  return localStorage.getItem('syncTheme') !== 'false';
}

const syncEnabled = shouldSyncTheme();
const cookieTheme = syncEnabled ? getThemeCookie() : null;
const localTheme = localStorage.getItem('theme');
const savedTheme = cookieTheme || localTheme || 'purple';

if (syncEnabled && cookieTheme && cookieTheme !== localTheme) {
  localStorage.setItem('theme', cookieTheme);
}

function applyTheme(theme) {
  document.body.classList.remove('theme-green', 'theme-red', 'theme-yellow', 'theme-blue');
  if (theme !== 'purple') document.body.classList.add(`theme-${theme}`);
  localStorage.setItem('theme', theme);
  if (shouldSyncTheme()) {
    setThemeCookie(theme);
  }
  document.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

applyTheme(savedTheme);

document.querySelectorAll('.theme-btn').forEach((btn) => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

const syncThemeCheckbox = document.getElementById('syncThemeCheckbox');
if (syncThemeCheckbox) {
  syncThemeCheckbox.checked = syncEnabled;
  syncThemeCheckbox.addEventListener('change', () => {
    localStorage.setItem('syncTheme', syncThemeCheckbox.checked);
    if (syncThemeCheckbox.checked) {
      setThemeCookie(localStorage.getItem('theme') || 'purple');
    } else {
      deleteThemeCookie();
    }
  });
}

// Language Switch

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'de' : 'en';
  localStorage.setItem('language', currentLang);
  document.documentElement.lang = currentLang;
  applyTranslations();
}

if (langSwitchBtn) {
  langSwitchBtn.addEventListener('click', toggleLanguage);
}

// CODING MONTHS

function fetchCodingMonths() {
  const start = new Date('2025-10-01');
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12
    + (now.getMonth() - start.getMonth());
  const el = document.getElementById('codingMonths');
  if (el) el.textContent = Math.max(months, 1);
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

// Tooltip toggle — works on mobile (tap) and desktop (hover)

document.addEventListener('click', (e) => {
  const icon = e.target.closest('.hint-icon');
  document.querySelectorAll('.hint-icon.show').forEach((el) => {
    if (el !== icon) el.classList.remove('show');
  });
  if (icon) {
    icon.classList.toggle('show');
  }
});

// MCSH PLATFORM STATS

async function fetchMCSHStats() {
  try {
    const res = await fetch(
      'https://api.mcserverhost.com/user/public/server-stats?include_content=false&include_servers=false',
    );
    const data = await res.json();

    mcshStatsEls.accounts.textContent = data.total_accounts?.toLocaleString() ?? '--';
    mcshStatsEls.activeServers.textContent = data.total_active_servers?.toLocaleString() ?? '--';
    mcshStatsEls.players.textContent = data.total_players?.toLocaleString() ?? '--';
    mcshStatsEls.servers.textContent = data.total_servers?.toLocaleString() ?? '--';
    mcshStatsEls.created.textContent = data.total_servers_created?.toLocaleString() ?? '--';
  } catch (error) {
    console.error('Error fetching MCSH stats:', error);
  }

  setTimeout(fetchMCSHStats, 300000); // Refresh every 5 minutes
}

fetchCodingMonths();
fetchDiscordMemberCount();
fetchMCSHStats();