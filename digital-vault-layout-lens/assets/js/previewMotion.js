export function isReducedMotionRequested(mediaQueryList = null) {
  if (mediaQueryList && typeof mediaQueryList.matches === 'boolean') return mediaQueryList.matches;
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getPreviewScrollBehavior(reducedMotion = isReducedMotionRequested()) {
  return reducedMotion ? 'auto' : 'smooth';
}

export function getPreviewViewportMotionState(reducedMotion = isReducedMotionRequested()) {
  return {
    reducedMotion: Boolean(reducedMotion),
    animatedViewportResize: !reducedMotion,
    overlayTransitions: !reducedMotion,
    focusHighlightPulse: false,
    scrollBehavior: getPreviewScrollBehavior(reducedMotion)
  };
}
