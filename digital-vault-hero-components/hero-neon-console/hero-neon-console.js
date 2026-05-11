(() => {
  const commandTarget = document.getElementById('hero-neon-console-command');
  const statusTarget = document.querySelector('[data-status-line]');
  const copyButton = document.querySelector('.hero-neon-console-copy-btn');
  const copyLive = document.getElementById('hero-neon-console-copy-status');

  const commandText = '$ kp deploy --env=production --pipeline=neon-console --verify';
  const statusLines = [
    'Policy gate: passed • zero elevated permission calls',
    'Build mesh: healthy • 32 services synchronized',
    'Edge rollout: 78% complete • expected finish in 22s',
    'Observability stream: clean • no regressions detected'
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeCommand(text) {
    if (!commandTarget) return;
    if (reduceMotion) {
      commandTarget.textContent = text;
      return;
    }

    let index = 0;
    const frame = () => {
      commandTarget.textContent = text.slice(0, index);
      index += 1;
      if (index <= text.length) {
        window.setTimeout(frame, 22);
      }
    };
    frame();
  }

  function cycleStatus() {
    if (!statusTarget) return;
    let cursor = 0;
    const render = () => {
      statusTarget.textContent = statusLines[cursor];
      cursor = (cursor + 1) % statusLines.length;
    };

    render();
    if (!reduceMotion) {
      window.setInterval(render, 2600);
    }
  }

  async function copyCommand() {
    if (!copyLive) return;
    try {
      await navigator.clipboard.writeText(commandText);
      copyLive.textContent = 'Command copied. Paste into your deployment shell.';
    } catch (error) {
      copyLive.textContent = 'Copy unavailable in this context. Select command text manually.';
    }
  }

  function setupCopyButton() {
    if (!copyButton) return;

    const handler = (event) => {
      if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
      if (event.type === 'keydown') event.preventDefault();
      copyCommand();
    };

    copyButton.addEventListener('click', handler);
    copyButton.addEventListener('keydown', handler);
  }

  function setupRevealObserver() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  typeCommand(commandText);
  cycleStatus();
  setupCopyButton();
  setupRevealObserver();
})();
