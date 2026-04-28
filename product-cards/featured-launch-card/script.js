(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reduceMotion.matches) {
    return;
  }

  const previewNodes = document.querySelectorAll(".featured-launch__preview");
  if (!previewNodes.length) {
    return;
  }

  const setState = (preview, xPercent, yPercent) => {
    const mockup = preview.querySelector(".featured-launch__mockup");
    if (!mockup) {
      return;
    }

    const tiltX = ((0.5 - yPercent) * 7).toFixed(2);
    const tiltY = ((xPercent - 0.5) * 8).toFixed(2);

    mockup.style.setProperty("--tilt-x", `${tiltX}deg`);
    mockup.style.setProperty("--tilt-y", `${tiltY}deg`);
    preview.style.setProperty("--shine-x", `${(xPercent * 100).toFixed(1)}%`);
    preview.style.setProperty("--shine-y", `${(yPercent * 100).toFixed(1)}%`);
    preview.style.setProperty("--shine-opacity", "0.58");
  };

  const resetState = (preview) => {
    const mockup = preview.querySelector(".featured-launch__mockup");
    if (!mockup) {
      return;
    }

    mockup.style.setProperty("--tilt-x", "0deg");
    mockup.style.setProperty("--tilt-y", "0deg");
    preview.style.setProperty("--shine-x", "15%");
    preview.style.setProperty("--shine-y", "25%");
    preview.style.setProperty("--shine-opacity", "0.4");
  };

  previewNodes.forEach((preview) => {
    preview.addEventListener("pointermove", (event) => {
      const rect = preview.getBoundingClientRect();
      const xPercent = (event.clientX - rect.left) / rect.width;
      const yPercent = (event.clientY - rect.top) / rect.height;

      if (xPercent < 0 || xPercent > 1 || yPercent < 0 || yPercent > 1) {
        return;
      }

      setState(preview, xPercent, yPercent);
    });

    preview.addEventListener("pointerleave", () => resetState(preview));
    preview.addEventListener("pointercancel", () => resetState(preview));
  });
})();
