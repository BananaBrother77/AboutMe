const legalLang = document.body?.dataset?.legalLang;

function swapPath() {
  let p = window.location.pathname;
  const withHtml = p.endsWith('.html');
  const base = withHtml ? p.slice(0, -5) : p;

  if (base.endsWith('-de')) {
    return base.slice(0, -3) + (withHtml ? '.html' : '');
  }

  return base + '-de' + (withHtml ? '.html' : '');
}

if (legalLang) {
  const saved = localStorage.getItem('language');

  if (saved !== null && saved !== legalLang) {
    window.location.replace(swapPath());
  }

  document.addEventListener('langchange', (e) => {
    if (e.detail !== legalLang) {
      window.location.replace(swapPath());
    }
  });

  document.querySelectorAll('.legal-lang-link').forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.dataset.legalLangTarget;

      if (target) {
        localStorage.setItem('language', target);
      }
    });
  });
}
