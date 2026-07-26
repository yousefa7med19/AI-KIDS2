const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const toast = document.querySelector('.toast');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
});

document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = '☰';
}));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('[data-toast]').forEach(el => el.addEventListener('click', () => showToast(el.dataset.toast)));
document.querySelectorAll('.age-card button').forEach(button => button.addEventListener('click', () => {
  const age = button.closest('.age-card').dataset.age;
  showToast(`Great! The ${age}-year-old learning path is selected.`);
}));

document.querySelectorAll('.billing-toggle button').forEach(button => button.addEventListener('click', () => {
  const period = button.dataset.period;
  document.querySelectorAll('.billing-toggle button').forEach(b => b.classList.toggle('selected', b === button));
  document.querySelectorAll('.price b, .price small').forEach(node => node.textContent = node.dataset[period]);
}));

document.querySelectorAll('.mission input').forEach(box => box.addEventListener('change', () => {
  const completed = document.querySelectorAll('.mission input:checked').length;
  showToast(`${completed} mission${completed === 1 ? '' : 's'} completed today!`);
}));


// Route age-path buttons to the signup page while keeping the selected age.
document.querySelectorAll('[data-path="signup"]').forEach(button => {
  button.addEventListener('click', () => {
    const age = button.dataset.age || '';
    window.location.href = `pages/signup.html${age ? `?age=${encodeURIComponent(age)}` : ''}`;
  });
});
