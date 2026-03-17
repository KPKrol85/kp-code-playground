(function () {
  var hero = document.querySelector('[data-hero-02]');
  var media = document.querySelector('[data-hero-02-media]');

  if (!hero || !media) {
    return;
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return;
  }

  hero.classList.add('hero-02--enhanced');

  var cardNear = media.querySelector('[data-hero-02-layer="near"]');
  var cardFar = media.querySelector('[data-hero-02-layer="far"]');

  if (cardNear) {
    cardNear.classList.add('hero-02__card--near');
  }

  if (cardFar) {
    cardFar.classList.add('hero-02__card--far');
  }

  var rafId = 0;

  function setMotion(clientX, clientY) {
    var rect = media.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    var x = (clientX - rect.left) / rect.width;
    var y = (clientY - rect.top) / rect.height;

    var clampedX = Math.min(Math.max(x, 0), 1);
    var clampedY = Math.min(Math.max(y, 0), 1);

    var offsetX = (clampedX - 0.5) * 2;
    var offsetY = (clampedY - 0.5) * 2;

    media.style.setProperty('--hero-02-pointer-x', clampedX * 100 + '%');
    media.style.setProperty('--hero-02-pointer-y', clampedY * 100 + '%');

    hero.style.setProperty('--hero-02-layer-near-x', offsetX * 7 + 'px');
    hero.style.setProperty('--hero-02-layer-near-y', offsetY * 7 + 'px');
    hero.style.setProperty('--hero-02-layer-far-x', offsetX * -5 + 'px');
    hero.style.setProperty('--hero-02-layer-far-y', offsetY * -5 + 'px');
  }

  function onPointerMove(event) {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }

    rafId = window.requestAnimationFrame(function () {
      setMotion(event.clientX, event.clientY);
    });
  }

  function resetMotion() {
    media.style.setProperty('--hero-02-pointer-x', '50%');
    media.style.setProperty('--hero-02-pointer-y', '50%');

    hero.style.setProperty('--hero-02-layer-near-x', '0px');
    hero.style.setProperty('--hero-02-layer-near-y', '0px');
    hero.style.setProperty('--hero-02-layer-far-x', '0px');
    hero.style.setProperty('--hero-02-layer-far-y', '0px');
  }

  media.addEventListener('pointermove', onPointerMove, { passive: true });
  media.addEventListener('pointerleave', resetMotion);
})();
