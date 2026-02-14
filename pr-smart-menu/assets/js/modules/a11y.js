export function announce(liveRegion, message) {
  liveRegion.textContent = '';
  window.requestAnimationFrame(() => {
    liveRegion.textContent = message;
  });
}

export function setCurrentLink(nav, currentPathname) {
  const links = nav.querySelectorAll('a[data-menu-id]');
  links.forEach((link) => {
    const url = new URL(link.href, window.location.origin);
    if (url.pathname === currentPathname) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
