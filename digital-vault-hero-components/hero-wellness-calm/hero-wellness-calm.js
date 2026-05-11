(function () {
  'use strict';

  var moodButtons = Array.prototype.slice.call(document.querySelectorAll('.hero-wellness-calm-mood-selector__button'));
  var sessionTitle = document.querySelector('[data-session-title]');
  var sessionMeta = document.querySelector('[data-session-meta]');
  var sessionDescription = document.querySelector('[data-session-description]');
  var breathCircle = document.querySelector('[data-breath-circle]');
  var revealElements = Array.prototype.slice.call(document.querySelectorAll('.hero-wellness-calm-reveal'));
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var sessionByMood = {
    grounded: {
      title: '5-minute Centering Breath',
      meta: 'Guided breathing • Soft audio cue • No equipment',
      description: 'A simple inhale-exhale rhythm to settle attention and support a calm start to your next activity.'
    },
    overwhelmed: {
      title: '3-minute Reset Pause',
      meta: 'Gentle voice guidance • Quiet timer • Seated practice',
      description: 'A short reset to ease mental noise and help you reconnect with what matters most right now.'
    },
    'low-energy': {
      title: '7-minute Light Focus Flow',
      meta: 'Breath + stretch prompts • Steady pace • Beginner-friendly',
      description: 'Soft movement and rhythmic breathing to encourage clarity and a more supported sense of momentum.'
    }
  };

  function updateSession(mood) {
    if (!sessionByMood[mood] || !sessionTitle || !sessionMeta || !sessionDescription) return;
    sessionTitle.textContent = sessionByMood[mood].title;
    sessionMeta.textContent = sessionByMood[mood].meta;
    sessionDescription.textContent = sessionByMood[mood].description;
  }

  moodButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var mood = button.getAttribute('data-mood');
      moodButtons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false');
      });
      updateSession(mood);
    });

    button.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        button.click();
      }
    });
  });

  if (breathCircle && !reduceMotion) {
    breathCircle.classList.add('is-animated');
  }

  if (revealElements.length && 'IntersectionObserver' in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add('is-visible');
    });
  }
})();
