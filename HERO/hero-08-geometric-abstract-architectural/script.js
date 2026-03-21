const root = document.documentElement;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const setRevealOrder = () => {
  document.querySelectorAll('[data-reveal-group]').forEach((group) => {
    [...group.querySelectorAll('[data-reveal]')].forEach((item, index) => {
      item.style.setProperty('--reveal-index', index.toString());
    });
  });
};

const enableEntrance = () => {
  root.classList.add('js-enhanced');
  setRevealOrder();

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      root.classList.add('is-ready');
    });
  });
};

const depthNodes = [...document.querySelectorAll('[data-depth]')];

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
    const shiftY = (yRatio * depth * 0.55).toFixed(2);
    node.style.setProperty('--shift-x', `${shiftX}px`);
    node.style.setProperty('--shift-y', `${shiftY}px`);
  });
};

let spatialMotionBound = false;

const bindSpatialMotion = () => {
  if (prefersReducedMotion.matches || depthNodes.length === 0) {
    resetDepth();
    return;
  }

  if (spatialMotionBound) return;

  const hero = document.querySelector('.architect-hero');
  if (!hero) return;

  spatialMotionBound = true;
  let rafId = null;

  const applyRatios = (xRatio, yRatio) => {
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = window.requestAnimationFrame(() => updateDepth(xRatio, yRatio));
  };

  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const xRatio = ((event.clientX - rect.left) / rect.width - 0.5) * 1.2;
    const yRatio = ((event.clientY - rect.top) / rect.height - 0.5) * 1.2;
    applyRatios(xRatio, yRatio);
  });

  hero.addEventListener('pointerleave', () => resetDepth());

  window.addEventListener(
    'scroll',
    () => {
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const visibleRatio = 1 - Math.min(Math.abs(rect.top) / viewportHeight, 1);
      const yRatio = (0.5 - visibleRatio) * 0.8;
      applyRatios(0, yRatio);
    },
    { passive: true }
  );
};

const handleMotionChange = () => {
  if (prefersReducedMotion.matches) {
    resetDepth();
    return;
  }

  bindSpatialMotion();
};

enableEntrance();
bindSpatialMotion();

if (typeof prefersReducedMotion.addEventListener === 'function') {
  prefersReducedMotion.addEventListener('change', handleMotionChange);
} else if (typeof prefersReducedMotion.addListener === 'function') {
  prefersReducedMotion.addListener(handleMotionChange);
}
