const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements = document.querySelectorAll('[data-reveal]');
const marquee = document.querySelector('.typo-marquee__track');

document.body.classList.add('js-ready');

const showAllReveals = () => {
  revealElements.forEach((element) => element.classList.add('is-visible'));
};

const initializeReveals = () => {
  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    showAllReveals();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const delay = Number(entry.target.dataset.delay || 0);
        window.setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);

        activeObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  revealElements.forEach((element, index) => {
    element.dataset.delay = String(index * 90);
    observer.observe(element);
  });
};

const duplicateMarqueeContent = () => {
  if (!marquee || marquee.dataset.enhanced === 'true') return;
  marquee.innerHTML += marquee.innerHTML;
  marquee.dataset.enhanced = 'true';
};

const setMarqueePlayback = (shouldPause) => {
  if (!marquee) return;
  marquee.style.animationPlayState = shouldPause ? 'paused' : 'running';
};

const initializeMarquee = () => {
  if (!marquee || prefersReducedMotion.matches) return;

  duplicateMarqueeContent();
  marquee.addEventListener('mouseenter', () => setMarqueePlayback(true));
  marquee.addEventListener('mouseleave', () => setMarqueePlayback(false));
  marquee.addEventListener('focusin', () => setMarqueePlayback(true));
  marquee.addEventListener('focusout', () => setMarqueePlayback(false));
};

const handleMotionPreferenceChange = (event) => {
  if (event.matches) {
    showAllReveals();
    setMarqueePlayback(true);
    return;
  }

  initializeReveals();
  initializeMarquee();
  setMarqueePlayback(false);
};

initializeReveals();
initializeMarquee();

if (typeof prefersReducedMotion.addEventListener === 'function') {
  prefersReducedMotion.addEventListener('change', handleMotionPreferenceChange);
} else if (typeof prefersReducedMotion.addListener === 'function') {
  prefersReducedMotion.addListener(handleMotionPreferenceChange);
}
