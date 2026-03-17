(function () {
  var media = document.querySelector('[data-hero-interactive]');

  if (!media) {
    return;
  }

  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointerQuery = window.matchMedia('(pointer: fine)');

  function canEnhance() {
    return !reduceMotionQuery.matches && finePointerQuery.matches;
  }

  function resetCards() {
    var cards = media.querySelectorAll('.med-hero03__float-card');
    cards.forEach(function (card) {
      card.style.transform = '';
    });
  }

  function handlePointerMove(event) {
    if (!canEnhance()) {
      return;
    }

    var rect = media.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var xPercent = (x / rect.width) * 100;
    var yPercent = (y / rect.height) * 100;

    media.style.setProperty('--med-hero03-glow-x', xPercent + '%');
    media.style.setProperty('--med-hero03-glow-y', yPercent + '%');

    var centerX = (x / rect.width - 0.5) * 2;
    var centerY = (y / rect.height - 0.5) * 2;

    var appointmentCard = media.querySelector('.med-hero03__float-card--appointment');
    var ratingCard = media.querySelector('.med-hero03__float-card--rating');

    if (appointmentCard) {
      appointmentCard.style.transform = 'translate3d(' + centerX * -5 + 'px,' + centerY * -4 + 'px,0)';
    }

    if (ratingCard) {
      ratingCard.style.transform = 'translate3d(' + centerX * 6 + 'px,' + centerY * 5 + 'px,0)';
    }
  }

  function handlePointerLeave() {
    media.style.setProperty('--med-hero03-glow-x', '50%');
    media.style.setProperty('--med-hero03-glow-y', '50%');
    resetCards();
  }

  media.addEventListener('pointermove', handlePointerMove, { passive: true });
  media.addEventListener('pointerleave', handlePointerLeave);

  reduceMotionQuery.addEventListener('change', handlePointerLeave);
  finePointerQuery.addEventListener('change', handlePointerLeave);
})();
