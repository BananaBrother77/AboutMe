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

const sections = document.querySelectorAll('section[id], nav[id]');
const navLinks = document.querySelectorAll('.nav-link');

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

// Scroll to section based on URL on page load
const path = window.location.pathname.replace('/', '');
if (path) {
  const target = document.getElementById(path);
  if (target) {
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 300);
  }
}

// Update URL when clicking nav links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = link.getAttribute('href').replace('#', '');
    window.history.pushState({}, '', `/${id}`);
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  });
});

// Elements

const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeModalBtn = document.getElementById('closeModalBtn');


settingsBtn.addEventListener('click', () => {
  settingsModal.classList.add('show');
});

closeModalBtn.addEventListener('click', closeSettingsModal);

function closeSettingsModal() {
  settingsModal.classList.remove('show');
}

// Keyboard shortcuts

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && settingsModal.classList.contains('show')) {
    closeSettingsModal();
  }
});