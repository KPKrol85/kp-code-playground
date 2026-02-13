export function createTypeScaleExperiment() {
  const id = 'type-scale';
  let cleanup = () => {};

  function mount(node) {
    node.innerHTML = `
      <div class="grid">
        <div class="controls">
          <label>Scale factor <input data-scale type="range" min="80" max="160" value="100" /></label>
        </div>
        <div class="preview preview--type">
          <h3>Adaptive typography preview</h3>
          <p>
            This module changes font-size rhythm through a CSS variable so UI text responds to a single control point.
          </p>
        </div>
      </div>
    `;

    const scale = node.querySelector('[data-scale]');
    const onInput = () => {
      document.documentElement.style.setProperty('--type-scale', Number(scale.value) / 100);
    };

    scale.addEventListener('input', onInput);
    onInput();

    cleanup = () => scale.removeEventListener('input', onInput);
  }

  return {
    id,
    title: 'Type Scale Studio',
    description: 'Adjust one slider to remap typographic hierarchy using custom properties.',
    mount,
    unmount: () => cleanup()
  };
}
