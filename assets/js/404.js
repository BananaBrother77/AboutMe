// Elements

const reloadBtn = document.getElementById('reloadBtn');

// Theme

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}

function shouldSyncTheme() {
  const cookie = getCookie('syncTheme');
  if (cookie !== null) return cookie === 'true';
  return localStorage.getItem('syncTheme') !== 'false';
}

const savedTheme = (shouldSyncTheme() ? getCookie('theme') : null) || localStorage.getItem('theme') || 'purple';
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
