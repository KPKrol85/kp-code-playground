export function announce(message) {
  const liveRegion = document.getElementById('liveRegion');
  if (!liveRegion) {
    return;
  }

  liveRegion.textContent = '';
  requestAnimationFrame(() => {
    liveRegion.textContent = message;
  });
}
