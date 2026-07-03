const reloadBtn = document.getElementById('reloadBtn');

if (reloadBtn) {
  reloadBtn.addEventListener('click', () => location.reload());
}

if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
