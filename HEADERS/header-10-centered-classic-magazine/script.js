const previewContent = {
  dispatches: {
    label: 'Dispatches desk',
    title: 'Scene reports and notebook fragments from cities, studios, and independent publishing offices.',
    meta: 'This week: a studio visit in Milan and a field memo on neighborhood reading rooms.',
    image: 'linear-gradient(135deg, #9b7759, #3d3028)'
  },
  essays: {
    label: 'Essay feature',
    title: 'Commissioned long-form arguments with generous pacing, typographic clarity, and a point of view.',
    meta: 'Featured: “The patience economy and the return of the thoughtful homepage.”',
    image: 'linear-gradient(135deg, #c7a37f, #5a4636)'
  },
  criticism: {
    label: 'Criticism column',
    title: 'Reviews and close readings that slow the conversation down enough to make real distinctions.',
    meta: 'Currently highlighted: architecture criticism, literary dispatches, and exhibition notes.',
    image: 'linear-gradient(135deg, #ab8f74, #41362f)'
  },
  archives: {
    label: 'Archive shelf',
    title: 'Resurfaced pieces from past volumes, framed as a living library rather than a forgotten backlog.',
    meta: 'Editor’s pick: a 1998 meditation on newsstands, memory, and city weather.',
    image: 'linear-gradient(135deg, #8f765e, #2d2520)'
  },
  'city-notes': {
    label: 'City notes',
    title: 'Shorter pieces on movement, public space, signage, cafés, and everyday rituals of urban attention.',
    meta: 'Latest cue: a dawn walk through bookshop corridors before opening hours.',
    image: 'linear-gradient(135deg, #d5b293, #67513f)'
  }
};

const body = document.body;
const header = document.querySelector('[data-header-root]');
const progressBar = document.querySelector('[data-reading-progress]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
const stickyTitle = document.querySelector('[data-sticky-article-title]');
const featureTitle = document.getElementById('feature-title');
const previewRegion = document.querySelector('[data-nav-preview]');
const previewLabel = document.querySelector('[data-preview-label]');
const previewTitle = document.querySelector('[data-preview-title]');
const previewMeta = document.querySelector('[data-preview-meta]');
const previewImage = document.querySelector('[data-preview-image]');
const publicationDate = document.getElementById('publication-date');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let lastScrollY = window.scrollY;

const setHeaderOffset = () => {
  if (!header) return;
  document.documentElement.style.setProperty('--mag-header-height', `${header.offsetHeight}px`);
};

const updateDate = () => {
  if (!publicationDate) return;

  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  publicationDate.textContent = formatter.format(new Date());
};

const updateProgress = () => {
  if (!progressBar) return;

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;
  progressBar.style.width = `${progress * 100}%`;
};

const updateStickyState = () => {
  if (!header) return;

  const currentScroll = window.scrollY;
  const scrollingDown = currentScroll > lastScrollY;
  const beyondThreshold = currentScroll > 220;
  const condensedThreshold = currentScroll > 100;

  header.classList.toggle('is-condensed', condensedThreshold);
  header.classList.toggle('is-hidden', beyondThreshold && scrollingDown);

  if (!scrollingDown && beyondThreshold) {
    header.classList.add('is-condensed');
    header.classList.remove('is-hidden');
  }

  if (currentScroll <= 24) {
    header.classList.remove('is-condensed', 'is-hidden');
  }

  lastScrollY = currentScroll;
};

const setTheme = (theme) => {
  const isSepia = theme === 'sepia';
  body.dataset.theme = isSepia ? 'sepia' : '';
  themeToggle?.setAttribute('aria-pressed', String(isSepia));
  themeToggle?.setAttribute(
    'aria-label',
    isSepia ? 'Switch to default light reading mode' : 'Switch to sepia reading mode'
  );
  window.localStorage.setItem('magazine-theme', isSepia ? 'sepia' : 'default');
};

const syncThemePreference = () => {
  const savedTheme = window.localStorage.getItem('magazine-theme');
  if (savedTheme === 'sepia') {
    setTheme('sepia');
  }
};

const setPreview = (key) => {
  if (!header || !previewLabel || !previewTitle || !previewMeta || !previewImage) return;

  const preview = previewContent[key];
  if (!preview) {
    header.dataset.previewActive = 'false';
    return;
  }

  previewLabel.textContent = preview.label;
  previewTitle.textContent = preview.title;
  previewMeta.textContent = preview.meta;
  previewImage.style.background = `${preview.image}, linear-gradient(135deg, rgba(255,255,255,0.25), transparent)`;
  header.dataset.previewActive = 'true';
};

const clearPreview = () => {
  if (!header) return;
  header.dataset.previewActive = 'false';
};

const bindPreviewEvents = () => {
  const previewLinks = document.querySelectorAll('[data-preview]');

  previewLinks.forEach((link) => {
    const key = link.getAttribute('data-preview');
    link.addEventListener('mouseenter', () => {
      if (window.innerWidth <= 780 || prefersReducedMotion.matches) return;
      setPreview(key);
    });
    link.addEventListener('focus', () => setPreview(key));
    link.addEventListener('mouseleave', clearPreview);
    link.addEventListener('blur', clearPreview);
  });

  previewRegion?.addEventListener('mouseenter', () => {
    if (header?.dataset.previewActive === 'true') {
      header.dataset.previewActive = 'true';
    }
  });
  previewRegion?.addEventListener('mouseleave', clearPreview);
};

const bindMenuToggle = () => {
  if (!menuToggle || !navigation) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
};

const setArticleTitle = () => {
  if (stickyTitle && featureTitle) {
    stickyTitle.textContent = featureTitle.textContent.trim();
  }
};

updateDate();
setHeaderOffset();
updateProgress();
updateStickyState();
syncThemePreference();
setArticleTitle();
bindPreviewEvents();
bindMenuToggle();

window.addEventListener('resize', () => {
  setHeaderOffset();
  if (window.innerWidth > 780 && navigation) {
    navigation.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener('scroll', () => {
  updateProgress();
  updateStickyState();
}, { passive: true });

themeToggle?.addEventListener('click', () => {
  const nextTheme = body.dataset.theme === 'sepia' ? 'default' : 'sepia';
  setTheme(nextTheme);
});
