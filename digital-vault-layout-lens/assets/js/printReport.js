export function runBrowserPrintWorkflow({ render, print = globalThis.window?.print, requestFrame = globalThis.requestAnimationFrame, focusTarget, onStatus } = {}) {
  if (typeof render !== 'function') throw new TypeError('Print workflow requires a render function.');
  render();
  if (typeof print !== 'function') {
    onStatus?.('Printing is unavailable in this browser environment. The report view remains available on screen.');
    focusTarget?.focus?.();
    return { status: 'unavailable' };
  }
  const invokePrint = () => {
    try {
      print();
      focusTarget?.focus?.();
      onStatus?.('Browser print dialog requested. Choose Print or Save as PDF in your browser.');
    } catch {
      focusTarget?.focus?.();
      onStatus?.('Printing could not be opened in this browser environment. The report view remains available on screen.');
    }
  };
  try {
    if (typeof requestFrame === 'function') requestFrame(invokePrint);
    else invokePrint();
    return { status: 'requested' };
  } catch {
    focusTarget?.focus?.();
    onStatus?.('Printing could not be opened in this browser environment. The report view remains available on screen.');
    return { status: 'failed' };
  }
}
