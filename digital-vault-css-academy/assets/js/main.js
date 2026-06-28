(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('is-open');
    });
  }

  const page = document.body.dataset.page;
  const activeLink = document.querySelector(`[data-nav="${page}"]`);
  if (activeLink) {
    activeLink.setAttribute('aria-current', 'page');
  }

  const progressBar = document.getElementById('lesson-progress');
  if (progressBar) {
    const updateProgress = function () {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(function (button) {
    button.addEventListener('click', async function () {
      const targetId = button.getAttribute('data-copy-target');
      const codeElement = targetId ? document.getElementById(targetId) : null;
      if (!codeElement) return;

      try {
        await navigator.clipboard.writeText(codeElement.textContent || '');
        const originalText = button.textContent;
        button.textContent = 'Skopiowano';
        setTimeout(function () {
          button.textContent = originalText;
        }, 1400);
      } catch (error) {
        button.textContent = 'Błąd kopiowania';
      }
    });
  });
})();
