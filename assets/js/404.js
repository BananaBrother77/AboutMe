// Elements

const reloadBtn = document.getElementById('reloadBtn');

// Language

let currentLang = localStorage.getItem('language') || 'en';

document.documentElement.lang = currentLang;

function getTranslation(key) {
  return translations[currentLang]?.[key] || translations.en?.[key] || '';
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = getTranslation(key);
    if (val) el.textContent = val;
  });
}

// Theme

const savedTheme = localStorage.getItem('theme') || 'purple';
if (savedTheme !== 'purple') {
  document.body.classList.add(`theme-${savedTheme}`);
}

// Init

applyTranslations();

if (reloadBtn) {
  reloadBtn.addEventListener('click', () => location.reload());
}

if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
