const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href]');

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

// Scroll to section from clean URL like /information on page load
const path = window.location.pathname.replace('/', '');
const hash = window.location.hash.replace('#', '');
const sectionId = path || hash;

if (sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', `/#${sectionId}`);
  } else {
    window.location.href = '/404';
  }
}

// Elements
const memberCountEl = document.getElementById('memberCount');

const mcshStatsEls = {
  accounts: document.getElementById('mcshTotalAccounts'),
  activeServers: document.getElementById('mcshActiveServers'),
  players: document.getElementById('mcshTotalPlayers'),
  servers: document.getElementById('mcshTotalServers'),
  created: document.getElementById('mcshServersCreated'),
};

// CODING MONTHS

function fetchCodingMonths() {
  const start = new Date('2025-10-01');
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const el = document.getElementById('codingMonths');
  if (el) el.textContent = Math.max(months, 1);
}

// DISCORD COMMUNITY MEMBER COUNT

async function fetchDiscordMemberCount() {
  try {
    const res = await fetch(
      'https://discord.com/api/v9/invites/mcserverhost?with_counts=true',
    );
    const data = await res.json();

    const count = data.approximate_member_count ?? 'N/A';

    if (memberCountEl) {
      memberCountEl.textContent = count.toLocaleString();
    }
  } catch (error) {
    console.error('Error fetching Discord member count:', error);
  }

  setTimeout(fetchDiscordMemberCount, 120000); // Refresh every 120 seconds (2 minutes)
}

// MCSH PLATFORM STATS

async function fetchMCSHStats() {
  try {
    const res = await fetch(
      'https://api.mcserverhost.com/user/public/server-stats?include_content=false&include_servers=false',
    );
    const data = await res.json();

    mcshStatsEls.accounts.textContent =
      data.total_accounts?.toLocaleString() ?? '--';
    mcshStatsEls.activeServers.textContent =
      data.total_active_servers?.toLocaleString() ?? '--';
    mcshStatsEls.players.textContent =
      data.total_players?.toLocaleString() ?? '--';
    mcshStatsEls.servers.textContent =
      data.total_servers?.toLocaleString() ?? '--';
    mcshStatsEls.created.textContent =
      data.total_servers_created?.toLocaleString() ?? '--';
  } catch (error) {
    console.error('Error fetching MCSH stats:', error);
  }

  setTimeout(fetchMCSHStats, 300000); // Refresh every 5 minutes
}

fetchCodingMonths();
fetchDiscordMemberCount();
fetchMCSHStats();
