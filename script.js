const allTabs = document.querySelectorAll('.tab-content');
const navBtns = document.querySelectorAll('.nav-btn');

navBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {

    const targetId = e.target.getAttribute('data-target');

    allTabs.forEach(tab => tab.classList.remove('active'));
    navBtns.forEach(b => b.classList.remove('active'));

    e.target.classList.add('active');
    const activeTab = document.getElementById(targetId);
    
    if (activeTab) {
      activeTab.classList.add('active');
    }
  });
});
