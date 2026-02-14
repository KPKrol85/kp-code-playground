export function markCurrentNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.getAttribute('href').includes(page)) {
      link.setAttribute('aria-current', 'page');
    }
  });
}
