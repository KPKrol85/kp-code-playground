export function orderFocusableDescriptors(descriptors = []) {
  const seen = new Set();
  return descriptors
    .filter((item) => item && !seen.has(item.id) && seen.add(item.id))
    .filter((item) => item.visible !== false && item.disabled !== true && item.inert !== true && Number(item.tabindex ?? 0) >= 0)
    .filter((item) => item.native === true || Number.isInteger(item.tabindex))
    .map((item, domIndex) => ({ ...item, domIndex, tabindex: Number(item.tabindex ?? 0) }))
    .sort((a, b) => {
      const ap = a.tabindex > 0;
      const bp = b.tabindex > 0;
      if (ap || bp) return (ap ? a.tabindex : Number.POSITIVE_INFINITY) - (bp ? b.tabindex : Number.POSITIVE_INFINITY) || a.domIndex - b.domIndex;
      return a.domIndex - b.domIndex;
    })
    .map((item, index) => ({ ...item, position: index + 1 }));
}

export function classifyOverflow({ scrollWidth = 0, clientWidth = 0, rect = {}, viewportWidth = 0, overflowX = 'visible' } = {}) {
  const horizontal = scrollWidth > clientWidth + 2;
  const escapesViewport = Number(rect.right || 0) > viewportWidth + 2 || Number(rect.left || 0) < -2;
  if (!horizontal && !escapesViewport) return { overflow: false, kind: 'fits', direction: 'none' };
  if (horizontal && /auto|scroll/.test(overflowX)) return { overflow: true, kind: 'intentional-scroll', direction: 'horizontal' };
  if (escapesViewport) return { overflow: true, kind: 'viewport-overflow', direction: 'horizontal' };
  return { overflow: true, kind: 'uncertain-overflow', direction: 'horizontal' };
}

export function overlayRemovalSummary(previousMarkers = 0, previousClasses = 0) {
  return { markersRemoved: Math.max(0, previousMarkers), classesRemoved: Math.max(0, previousClasses), activeMode: 'off' };
}
