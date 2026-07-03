const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const langSwitchBtn = document.getElementById('langSwitchBtn');
const syncThemeCheckbox = document.getElementById('syncThemeCheckbox');

if (settingsBtn) {
  settingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('show');
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeSettingsModal);
}

function closeSettingsModal() {
  settingsModal.classList.remove('show');
}

const COOKIE_DOMAIN = '.bananabrother77.online';

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}

function setCookie(name, value) {
  document.cookie = `${name}=${value}; domain=${COOKIE_DOMAIN}; path=/; max-age=31536000; SameSite=Lax`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; domain=${COOKIE_DOMAIN}; path=/; max-age=0; SameSite=Lax`;
}

function shouldSyncTheme() {
  const cookie = getCookie('syncTheme');
  if (cookie !== null) return cookie === 'true';
  return localStorage.getItem('syncTheme') !== 'false';
}

const syncEnabled = shouldSyncTheme();
const cookieTheme = syncEnabled ? getCookie('theme') : null;
const localTheme = localStorage.getItem('theme');
const savedTheme = cookieTheme || localTheme || 'purple';

if (syncEnabled && cookieTheme && cookieTheme !== localTheme) {
  localStorage.setItem('theme', cookieTheme);
}

function applyTheme(theme) {
  document.body.classList.remove(
    'theme-green',
    'theme-red',
    'theme-yellow',
    'theme-blue',
  );
  if (theme !== 'purple') document.body.classList.add(`theme-${theme}`);
  localStorage.setItem('theme', theme);
  if (shouldSyncTheme()) {
    setCookie('theme', theme);
  }
  document.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

applyTheme(savedTheme);

document.querySelectorAll('.theme-btn').forEach((btn) => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
});

if (syncThemeCheckbox) {
  syncThemeCheckbox.checked = syncEnabled;
  syncThemeCheckbox.addEventListener('change', () => {
    const enabled = syncThemeCheckbox.checked;
    localStorage.setItem('syncTheme', enabled);
    setCookie('syncTheme', enabled);
    if (enabled) {
      setCookie('theme', localStorage.getItem('theme') || 'purple');
    } else {
      deleteCookie('theme');
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

// Keyboard shortcuts

document.addEventListener('keydown', (e) => {
  if (!settingsModal) return;
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

// Tooltip toggle

document.addEventListener('click', (e) => {
  const icon = e.target.closest('.hint-icon');
  document.querySelectorAll('.hint-icon.show').forEach((el) => {
    if (el !== icon) el.classList.remove('show');
  });
  if (icon) {
    icon.classList.toggle('show');
  }
});
