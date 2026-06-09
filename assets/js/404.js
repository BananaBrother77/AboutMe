// Elements

const reloadBtn = document.getElementById('reloadBtn');

// Theme

const savedTheme = localStorage.getItem('theme') || 'purple';
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
