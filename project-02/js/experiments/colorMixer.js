export function createColorMixerExperiment() {
  const id = 'color-mixer';
  let cleanup = () => {};

  function mount(node) {
    node.innerHTML = `
      <div class="grid">
        <div class="controls">
          <label>Hue A <input data-hue-a type="range" min="0" max="360" value="220" /></label>
          <label>Hue B <input data-hue-b type="range" min="0" max="360" value="320" /></label>
        </div>
        <div class="preview preview--gradient" aria-hidden="true"></div>
      </div>
    `;

    const hueA = node.querySelector('[data-hue-a]');
    const hueB = node.querySelector('[data-hue-b]');

    const onChange = () => {
      document.documentElement.style.setProperty('--mix-a', hueA.value);
      document.documentElement.style.setProperty('--mix-b', hueB.value);
    };

    hueA.addEventListener('input', onChange);
    hueB.addEventListener('input', onChange);
    onChange();

    cleanup = () => {
      hueA.removeEventListener('input', onChange);
      hueB.removeEventListener('input', onChange);
    };
  }

  return {
    id,
    title: 'Color Mixer Lab',
    description: 'Blend two hue channels with CSS variables and inspect live gradient transitions.',
    mount,
    unmount: () => cleanup()
  };
}
