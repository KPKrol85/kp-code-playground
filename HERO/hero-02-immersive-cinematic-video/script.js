(() => {
  const hero = document.querySelector('.hero-cinematic');
  const media = document.querySelector('.hero-cinematic__media');
  const video = document.querySelector('.hero-cinematic__video');
  const soundToggle = document.querySelector('[data-sound-toggle]');
  const soundText = document.querySelector('.hero-cinematic__sound-text');
  const status = document.getElementById('media-status');
  const revealItems = document.querySelectorAll('.reveal-item');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarsePointer = window.matchMedia('(pointer: coarse)');

  const heroState = {
    reducedMotion: prefersReducedMotion.matches,
    audioEnabled: false,
    parallaxEnabled: !prefersReducedMotion.matches && !coarsePointer.matches,
  };

  const setButtonState = (enabled) => {
    heroState.audioEnabled = enabled;
    soundToggle?.setAttribute('aria-pressed', String(enabled));
    soundToggle?.setAttribute('aria-label', enabled ? 'Mute ambient sound' : 'Enable ambient sound');

    if (soundText) {
      soundText.textContent = enabled ? 'Sound on' : 'Sound off';
    }

    if (status) {
      status.textContent = enabled ? 'Ambient sound enabled' : 'Muted ambience';
    }
  };

  const applyVideoSource = () => {
    if (!video) return;

    const useMobileSource = window.innerWidth <= 720 || coarsePointer.matches;
    const nextSource = useMobileSource ? video.dataset.mobileSrc : video.dataset.desktopSrc;

    if (!nextSource || video.currentSrc.includes(nextSource)) {
      return;
    }

    video.src = nextSource;
    video.load();

    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {
        if (status) {
          status.textContent = 'Poster fallback active';
        }
      });
    }
  };

  const revealContent = () => {
    if (!revealItems.length) return;

    if (heroState.reducedMotion) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    revealItems.forEach((item, index) => {
      window.setTimeout(() => {
        item.classList.add('is-visible');
      }, 140 * index + 120);
    });
  };

  let rafId = 0;
  const updateParallax = () => {
    rafId = 0;

    if (!hero || !media || !heroState.parallaxEnabled) return;

    const rect = hero.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - viewport / 2) / viewport));
    const translateY = progress * -18;
    const scale = 1.04 - Math.abs(progress) * 0.015;

    media.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
  };

  const queueParallax = () => {
    if (!heroState.parallaxEnabled || rafId) return;
    rafId = window.requestAnimationFrame(updateParallax);
  };

  const handleAudioToggle = () => {
    if (!video) return;

    const nextEnabled = !heroState.audioEnabled;
    video.muted = !nextEnabled;
    video.volume = nextEnabled ? 0.45 : 0;

    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {
        setButtonState(false);
        if (status) {
          status.textContent = 'Sound unavailable in this browser state';
        }
      });
    }

    setButtonState(nextEnabled);
  };

  const handleMotionPreferenceChange = (event) => {
    heroState.reducedMotion = event.matches;
    heroState.parallaxEnabled = !event.matches && !coarsePointer.matches;

    if (heroState.reducedMotion) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      if (media) {
        media.style.transform = 'translate3d(0, 0, 0) scale(1.02)';
      }
    } else {
      queueParallax();
    }
  };

  const handlePointerChange = (event) => {
    heroState.parallaxEnabled = !heroState.reducedMotion && !event.matches;
    applyVideoSource();
    queueParallax();
  };

  setButtonState(false);
  applyVideoSource();
  revealContent();
  queueParallax();

  soundToggle?.addEventListener('click', handleAudioToggle);
  window.addEventListener('scroll', queueParallax, { passive: true });
  window.addEventListener('resize', () => {
    applyVideoSource();
    queueParallax();
  });
  prefersReducedMotion.addEventListener('change', handleMotionPreferenceChange);
  coarsePointer.addEventListener('change', handlePointerChange);
})();
