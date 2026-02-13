export function createExperimentManager({ experiments, switcherNode, rootNode }) {
  let active = null;

  function renderButtons() {
    switcherNode.innerHTML = '';
    experiments.forEach((experiment, index) => {
      const button = document.createElement('button');
      button.className = 'switcher-btn';
      button.type = 'button';
      button.textContent = experiment.title;
      button.setAttribute('aria-pressed', String(index === 0));
      button.addEventListener('click', () => activate(experiment.id));
      switcherNode.append(button);
    });
  }

  function syncButtonState(activeId) {
    [...switcherNode.querySelectorAll('.switcher-btn')].forEach((button, index) => {
      button.setAttribute('aria-pressed', String(experiments[index].id === activeId));
    });
  }

  function activate(id) {
    const next = experiments.find((experiment) => experiment.id === id);
    if (!next || active?.id === id) return;

    if (active?.unmount) {
      active.unmount();
    }

    rootNode.innerHTML = `<article class="experiment"><h2>${next.title}</h2><p>${next.description}</p><div data-slot></div></article>`;
    const slot = rootNode.querySelector('[data-slot]');
    next.mount(slot);
    active = next;
    syncButtonState(id);
  }

  function start() {
    renderButtons();
    if (experiments.length > 0) {
      activate(experiments[0].id);
    }
  }

  return { start };
}
