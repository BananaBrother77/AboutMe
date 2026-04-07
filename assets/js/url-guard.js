(function () {
  const ALLOWED_PATHS = [
    '/',
    '/home',
    '/information',
    '/projects',
    '/gaming',
    '/settings',
  ];

  const REDIRECT_TO = '/PNF';

  function normalize(path) {
    return path.replace(/\/+$/, '').toLowerCase().split('?')[0].split('#')[0];
  }

  function isAllowed(pathname) {
    const clean = normalize(pathname);
    if (clean === '' || clean === '/') return true;
    console.log(`[URL Guard] Checking path: "${clean}"`); // Debug
    return ALLOWED_PATHS.some((p) => clean === p || clean.startsWith(p + '/'));
  }

  function guard() {
    const pathname = window.location.pathname;

    if (!isAllowed(pathname)) {
      console.error(
        // error for visibility
        `[URL Guard] Path not allowed: "${pathname}" -> ${REDIRECT_TO}`,
      );
      window.location.replace(REDIRECT_TO);
    } else {
      console.log(`[URL Guard] Allowed: ${pathname}`);
    }
  }

  guard();

  const _push = history.pushState.bind(history);
  const _replace = history.replaceState.bind(history);

  history.pushState = function (...args) {
    _push(...args);
    guard();
  };

  history.replaceState = function (...args) {
    _replace(...args);
    guard();
  };

  window.addEventListener('popstate', guard);
})();
