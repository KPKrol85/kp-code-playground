(function () {
  var media = document.querySelector('[data-hero-04-spotlight]');

  if (!media) {
    return;
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setPointerPosition(event) {
    if (prefersReducedMotion.matches) {
      return;
    }

    var bounds = media.getBoundingClientRect();
    var pointerX = ((event.clientX - bounds.left) / bounds.width) * 100;
    var pointerY = ((event.clientY - bounds.top) / bounds.height) * 100;

    pointerX = Math.max(0, Math.min(100, pointerX));
    pointerY = Math.max(0, Math.min(100, pointerY));

    media.style.setProperty('--hero-04-pointer-x', pointerX.toFixed(2) + '%');
    media.style.setProperty('--hero-04-pointer-y', pointerY.toFixed(2) + '%');
  }

  function resetPointerPosition() {
    media.style.setProperty('--hero-04-pointer-x', '50%');
    media.style.setProperty('--hero-04-pointer-y', '35%');
  }

  media.addEventListener('pointermove', setPointerPosition);
  media.addEventListener('pointerleave', resetPointerPosition);

  if (prefersReducedMotion.matches) {
    resetPointerPosition();
  }
})();
