(function () {
  var hero = document.querySelector('.premium-hero');

  if (!hero) {
    return;
  }

  var floatingCards = hero.querySelectorAll('.premium-hero__floating-card');
  var supportsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  hero.classList.add('premium-hero--enhanced');

  if (supportsReducedMotion || floatingCards.length === 0) {
    return;
  }

  var clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
  };

  var updateCardMotion = function (event) {
    var bounds = hero.getBoundingClientRect();
    var relativeX = (event.clientX - bounds.left) / bounds.width;
    var relativeY = (event.clientY - bounds.top) / bounds.height;
    var offsetX = clamp((relativeX - 0.5) * 10, -5, 5);
    var offsetY = clamp((relativeY - 0.5) * 8, -4, 4);

    floatingCards.forEach(function (card, index) {
      var direction = index % 2 === 0 ? 1 : -1;
      card.style.transform = 'translate3d(' + offsetX * direction + 'px, ' + offsetY * direction + 'px, 0)';
    });
  };

  var resetCardMotion = function () {
    floatingCards.forEach(function (card) {
      card.style.transform = '';
    });
  };

  hero.addEventListener('pointermove', updateCardMotion);
  hero.addEventListener('pointerleave', resetCardMotion);
})();
