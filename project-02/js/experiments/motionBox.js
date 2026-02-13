export function createMotionBoxExperiment() {
  const id = 'motion-box';
  let rafId = null;

  function mount(node) {
    node.innerHTML = `
      <div class="grid">
        <div class="controls">
          <label>Motion speed <input data-speed type="range" min="1" max="6" value="2" /></label>
        </div>
        <div data-field class="preview preview--motion">
          <div data-dot class="motion-dot"></div>
        </div>
      </div>
    `;

    const field = node.querySelector('[data-field]');
    const dot = node.querySelector('[data-dot]');
    const speedInput = node.querySelector('[data-speed]');

    let x = 20;
    let y = 20;
    let vx = 2;
    let vy = 1.6;

    const loop = () => {
      const speed = Number(speedInput.value);
      x += vx * speed;
      y += vy * speed;

      const maxX = field.clientWidth - dot.clientWidth;
      const maxY = field.clientHeight - dot.clientHeight;

      if (x <= 0 || x >= maxX) vx *= -1;
      if (y <= 0 || y >= maxY) vy *= -1;

      dot.style.transform = `translate(${Math.max(0, Math.min(x, maxX))}px, ${Math.max(0, Math.min(y, maxY))}px)`;
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
  }

  function unmount() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  return {
    id,
    title: 'Motion Sandbox',
    description: 'An isolated animation loop with runtime speed controls and clean teardown.',
    mount,
    unmount
  };
}
