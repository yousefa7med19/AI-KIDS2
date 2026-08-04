const token = localStorage.getItem('token');
const user = JSON.parse(
  localStorage.getItem('user') || '{}'
);

if (!token) {
  window.location.href = 'login.html';
}

if (user.role !== 'admin') {
  alert('Access denied. Admins only.');
  window.location.href = 'parent-dashboard.html';
}

const adminNameElement =
  document.getElementById('admin-name');

const adminProfileNameElement =
  document.getElementById('admin-profile-name');

if (adminNameElement) {
  adminNameElement.textContent =
    user.fullName || user.name || 'Admin';
}

if (adminProfileNameElement) {
  adminProfileNameElement.textContent =
    user.fullName || user.name || 'Admin';
}

/* =========================
   Sidebar Mobile
========================= */

const sidebar =
  document.getElementById('sidebar');

const overlay =
  document.getElementById('sidebar-overlay');

const menuButton =
  document.getElementById('menu-button');

if (menuButton && sidebar && overlay) {
  menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });
}

/* =========================
   Dashboard Navigation
========================= */

const navLinks =
  document.querySelectorAll('.nav-link');

const sections =
  document.querySelectorAll('.dashboard-section');

function openSection(sectionName) {
  navLinks.forEach((link) => {
    link.classList.toggle(
      'active',
      link.dataset.section === sectionName
    );
  });

  sections.forEach((section) => {
    section.classList.toggle(
      'active',
      section.dataset.pageSection === sectionName
    );
  });

  if (sidebar && overlay) {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    openSection(link.dataset.section);
  });
});

document
  .querySelectorAll('[data-open-section]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      openSection(button.dataset.openSection);
    });
  });

/* =========================
   Logout
========================= */

const logoutButton =
  document.getElementById('logout-button');

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    const confirmed = window.confirm(
      'Are you sure you want to logout?'
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.href = 'login.html';
  });
}

/* =========================
   Dashboard Statistics
========================= */

function updateTextContent(elementId, value) {
  const element = document.getElementById(elementId);

  if (element) {
    element.textContent = value ?? 0;
  }
}

async function loadDashboard() {
  try {
    const data = await apiRequest(
      '/admin/dashboard'
    );

    const stats = data.stats || {};

    updateTextContent(
      'total-users',
      stats.users
    );

    updateTextContent(
      'total-children',
      stats.children
    );

    updateTextContent(
      'pending-payments',
      stats.pendingPayments
    );

    updateTextContent(
      'active-subscriptions',
      stats.activeSubscriptions
    );

    updateTextContent(
      'total-courses',
      stats.courses
    );

    updateTextContent(
      'total-games',
      stats.games
    );
  } catch (error) {
    console.error(
      'Unable to load admin dashboard:',
      error
    );

    if (
      error.message === 'Invalid or expired token' ||
      error.message === 'You must be logged in'
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      window.location.href = 'login.html';
      return;
    }

    if (
      error.message ===
      'You do not have permission to perform this action'
    ) {
      window.location.href =
        'parent-dashboard.html';
    }
  }
}

/* =========================
   Start Dashboard
========================= */

loadDashboard();