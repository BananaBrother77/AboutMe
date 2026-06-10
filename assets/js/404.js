// Elements

const reloadBtn = document.getElementById('reloadBtn');

// Theme

function shouldSyncTheme() {
  return localStorage.getItem('syncTheme') !== 'false';
}

const savedTheme = (shouldSyncTheme() ? (() => {
  const match = document.cookie.match(/(?:^|;\s*)theme=([^;]*)/);
  return match ? match[1] : null;
})() : null) || localStorage.getItem('theme') || 'purple';
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
