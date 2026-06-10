// Elements

const reloadBtn = document.getElementById('reloadBtn');

// Theme

function getThemeCookie() {
  const match = document.cookie.match(/(?:^|;\s*)theme=([^;]*)/);
  return match ? match[1] : null;
}

const savedTheme = getThemeCookie() || localStorage.getItem('theme') || 'purple';
if (savedTheme !== 'purple') {
  document.body.classList.add(`theme-${savedTheme}`);
}

// Init

if (reloadBtn) {
  reloadBtn.addEventListener('click', () => location.reload());
}

if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
