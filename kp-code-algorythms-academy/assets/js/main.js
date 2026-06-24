const root = document.documentElement;
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.site-nav__links');
const themeToggle = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('kp-academy-theme');
const disclosures = [...document.querySelectorAll('.nav-disclosure')];

if (storedTheme) {
  root.dataset.theme = storedTheme;
  themeToggle?.setAttribute('aria-pressed', String(storedTheme === 'dark'));
}

const closeDisclosures = (exception = null) => {
  disclosures.forEach((disclosure) => {
    if (disclosure === exception) return;
    disclosure.classList.remove('is-open');
    disclosure.querySelector('.nav-disclosure__trigger')?.setAttribute('aria-expanded', 'false');
  });
};

const closeMobileNav = () => {
  navToggle?.setAttribute('aria-expanded', 'false');
  navLinks?.classList.remove('is-open');
  document.body.classList.remove('nav-open');
};

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('nav-open', !isOpen);
  if (isOpen) closeDisclosures();
});

disclosures.forEach((disclosure) => {
  const trigger = disclosure.querySelector('.nav-disclosure__trigger');

  trigger?.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    closeDisclosures(disclosure);
    trigger.setAttribute('aria-expanded', String(!isOpen));
    disclosure.classList.toggle('is-open', !isOpen);
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-nav')) {
    closeDisclosures();
    closeMobileNav();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeDisclosures();
  closeMobileNav();
  navToggle?.focus();
});

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = nextTheme;
  localStorage.setItem('kp-academy-theme', nextTheme);
  themeToggle.setAttribute('aria-pressed', String(nextTheme === 'dark'));
});

const tocLinks = [...document.querySelectorAll('.toc a')];
const sections = tocLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

if ('IntersectionObserver' in window && sections.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      tocLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach((section) => observer.observe(section));
}
