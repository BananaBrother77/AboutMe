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
let currentLang = "en";

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
  applyTranslations();
}

if (langBtn) langBtn.addEventListener("click", toggleLanguage);
if (langSetting) langSetting.addEventListener("click", toggleLanguage);

// Apply translations on page load
document.addEventListener("DOMContentLoaded", applyTranslations);
