const root = document.documentElement;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealGroups = [...document.querySelectorAll('[data-reveal-group]')];
const depthNodes = [...document.querySelectorAll('[data-depth]')];
const hero = document.querySelector('.editorial-hero');
const mediaImage = document.querySelector('.editorial-hero__image');

const setRevealOrder = () => {
  revealGroups.forEach((group) => {
    [...group.querySelectorAll('[data-reveal]')].forEach((item, index) => {
      item.style.setProperty('--reveal-index', index.toString());
    });
  });
};

const startEntrance = () => {
  root.classList.add('js-enhanced');
  setRevealOrder();

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      root.classList.add('is-ready');
    });
  });
};

const resetDepth = () => {
  depthNodes.forEach((node) => {
    node.style.setProperty('--shift-x', '0px');
    node.style.setProperty('--shift-y', '0px');
  });
};

const updateDepth = (xRatio, yRatio) => {
  depthNodes.forEach((node) => {
    const depth = Number(node.dataset.depth || 0);
    const shiftX = (xRatio * depth).toFixed(2);
    const shiftY = (yRatio * depth * 0.72).toFixed(2);
    node.style.setProperty('--shift-x', `${shiftX}px`);
    node.style.setProperty('--shift-y', `${shiftY}px`);
  });
};

let rafId = null;
let motionBound = false;

const applyDepthMotion = (xRatio, yRatio) => {
  if (rafId) {
    window.cancelAnimationFrame(rafId);
  }

  rafId = window.requestAnimationFrame(() => {
    updateDepth(xRatio, yRatio);
  });
};

const syncImageBreathing = () => {
  if (!hero || !mediaImage || prefersReducedMotion.matches) {
    return;
  }

  const rect = hero.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;
  const visible = Math.max(0, Math.min(1, 1 - rect.top / viewportHeight));
  const scale = 1.01 + visible * 0.018;
  mediaImage.style.transform = `scale(${scale.toFixed(3)})`;
};

const bindMotion = () => {
  if (!hero || prefersReducedMotion.matches || motionBound) {
    if (prefersReducedMotion.matches) {
      resetDepth();
      if (mediaImage) {
        mediaImage.style.transform = 'none';
      }
    }
    return;
  }

  motionBound = true;

  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const xRatio = ((event.clientX - rect.left) / rect.width - 0.5) * 0.9;
    const yRatio = ((event.clientY - rect.top) / rect.height - 0.5) * 0.75;
    applyDepthMotion(xRatio, yRatio);
  });

  hero.addEventListener('pointerleave', () => {
    resetDepth();
  });

  window.addEventListener(
    'scroll',
    () => {
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = 1 - Math.min(Math.abs(rect.top) / viewportHeight, 1);
      applyDepthMotion(0, (0.5 - progress) * 0.45);
      syncImageBreathing();
    },
    { passive: true }
  );

  syncImageBreathing();
};

const handleMotionPreferenceChange = () => {
  if (prefersReducedMotion.matches) {
    resetDepth();
    if (mediaImage) {
      mediaImage.style.transform = 'none';
    }
    return;
  }

  syncImageBreathing();
  bindMotion();
};

startEntrance();
bindMotion();

if (typeof prefersReducedMotion.addEventListener === 'function') {
  prefersReducedMotion.addEventListener('change', handleMotionPreferenceChange);
} else if (typeof prefersReducedMotion.addListener === 'function') {
  prefersReducedMotion.addListener(handleMotionPreferenceChange);
}
