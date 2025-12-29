let currentLang = localStorage.getItem('preferredLang') || (navigator.language.startsWith('de') ? 'de' : 'en');

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.innerText = translations[currentLang][key];
    }
  });
  document.documentElement.lang = currentLang;
}

function initTabs() {
  const navBtns = document.querySelectorAll('.nav-btn[data-target]');
  const allTabs = document.querySelectorAll('.tab-content');
  
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-target');
      const activeTab = document.getElementById(targetId);
      
      if (activeTab) {
        allTabs.forEach(tab => tab.classList.remove('active'));
        navBtns.forEach(b => b.classList.remove('active'));
        
        activeTab.classList.add('active');
        btn.classList.add('active');
        window.scrollTo(0, 0);
      }
    });
  });
}

function changeTheme() {
  const currentTheme = localStorage.getItem('savedTheme');
  
  if (currentTheme && currentTheme !== 'default') {
    document.body.classList.add(currentTheme);
  } else {
    localStorage.removeItem('savedTheme');
  }
  
  const themeBtns = document.querySelectorAll('.theme-option');
  
  themeBtns.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      document.body.classList.remove('theme-red', 'theme-blue');
      
      if (theme !== 'default') {
        document.body.classList.add(theme);
      }
      
      localStorage.setItem('savedTheme', theme);
    });
  });
}

function initLangSwitch() {
  const langBtn = document.getElementById('lang-switch');
  const langSetting = document.getElementById('lang-setting');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      switchLang();
      showLangOnBtn();
    });
  }
  
  if (langSetting) {
    langSetting.addEventListener('click', () => {
      switchLang();
      showLangOnBtn();
    });
  }
}

function showLangOnBtn() {
  const langSetting = document.getElementById('lang-setting');
  
  if (currentLang == 'de') {
    langSetting.textContent = 'Englisch';
  } else {
    langSetting.textContent = 'German';
  }
}

function switchLang() {
  currentLang = currentLang === 'de' ? 'en' : 'de';
  localStorage.setItem('preferredLang', currentLang);
  updateContent();
}

document.addEventListener('DOMContentLoaded', () => {
  updateContent();
  initTabs();
  initLangSwitch();
  showLangOnBtn()
  changeTheme();
});