const navBtns = document.querySelectorAll(".nav-btn[data-target]");
const allTabs = document.querySelectorAll(".tab-content");

navBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const activeTab = document.getElementById(targetId);

    if (activeTab) {
      allTabs.forEach((tab) => tab.classList.remove("active"));
      navBtns.forEach((b) => b.classList.remove("active"));

      activeTab.classList.add("active");
      btn.classList.add("active");
      window.scrollTo(0, 0);
    }
  });
});

// Theme Switching
const savedTheme = localStorage.getItem("savedTheme");
if (savedTheme && savedTheme !== "default") {
  document.body.classList.add(savedTheme);
}

document.querySelectorAll(".theme-option").forEach((option) => {
  option.addEventListener("click", () => {
    const theme = option.getAttribute("data-theme");
    document.body.classList.remove("theme-red", "theme-blue", "theme-yellow");

    if (theme !== "default") {
      document.body.classList.add(theme);
    }

    localStorage.setItem("savedTheme", theme);
  });
});

// Language Toggle
const langBtn = document.getElementById("lang-switch");
const langSetting = document.getElementById("lang-setting");
let currentLang = localStorage.getItem("language") || "en";

function applyTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[currentLang] && translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });

  // Update language button text
  if (langBtn) {
    langBtn.textContent = currentLang === "de" ? "EN / DE" : "DE / EN";
  }
  if (langSetting) {
    langSetting.textContent = currentLang === "de" ? "Englisch" : "German";
  }
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "de" : "en";
  localStorage.setItem("language", currentLang);
  applyTranslations();
}

if (langBtn) langBtn.addEventListener("click", toggleLanguage);
if (langSetting) langSetting.addEventListener("click", toggleLanguage);

// Apply translations on page load
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  initParticles();
  initScrollReveal();
});

// Particle Animation
function initParticles() {
  const container = document.querySelector(".particles-container");
  if (!container) return;

  const particleCount = 18;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.animationDuration = `${10 + Math.random() * 10}s`;
    particle.style.left = `${Math.random() * 100}%`;
    container.appendChild(particle);
  }
}

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".card, .stats-section, .contact-section, .game-card, .project-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal");
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease";
    observer.observe(el);
  });
}

// Animate stat numbers
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  
  statNumbers.forEach((stat) => {
    const finalValue = stat.getAttribute("data-value");
    if (!finalValue) return;

    const duration = 2000;
    const steps = 60;
    const increment = parseInt(finalValue) / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, parseInt(finalValue));
      stat.textContent = Math.round(current);

      if (step >= steps) {
        clearInterval(timer);
        stat.textContent = finalValue;
      }
    }, duration / steps);
  });
}

// Trigger stat animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  statsObserver.observe(statsSection);
}
