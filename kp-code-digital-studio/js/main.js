const navToggle = document.querySelector('[data-nav-toggle]');
const navBackdrop = document.querySelector('[data-nav-backdrop]');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const navDesktopQuery = window.matchMedia('(min-width: 1024px)');
const storageKey = 'theme-preference'
const onClick = () => { theme.value = theme.value === 'light' ? 'dark' : 'light'; setPreference() }
const getColorPreference = () => { if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey); else return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }
const setPreference = () => { localStorage.setItem(storageKey, theme.value); reflectPreference() }
const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value)
  document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value)
}
const theme = { value: getColorPreference() }
reflectPreference()
window.onload = () => {
  reflectPreference()
  document.querySelector('#theme-toggle')?.addEventListener('click', onClick)
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches:isDark}) => {
  theme.value = isDark ? 'dark' : 'light'
  setPreference()
})

const getFocusableNavItems = () => {
  if (!navLinks) {
    return [];
  }
  return Array.from(
    navLinks.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
  ).filter((el) => el.getClientRects().length);
};

const setNavAria = (isOpen) => {
  if (!navToggle || !navLinks) {
    return;
  }
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Zamknij menu' : 'Otwórz menu');
  navLinks.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
};

const openNav = () => {
  if (!nav || !navLinks || !navToggle || navDesktopQuery.matches) {
    return;
  }
  if (nav.classList.contains('nav--open')) {
    return;
  }
  nav.classList.add('nav--open');
  document.body.classList.add('nav-open');
  setNavAria(true);
  document.addEventListener('keydown', handleNavKeydown);
  requestAnimationFrame(() => {
    const focusTarget = navLinks.querySelector('.nav__link');
    focusTarget?.focus();
  });
};

const closeNav = (returnFocus = true) => {
  if (!nav || !navLinks || !navToggle) {
    return;
  }
  if (!nav.classList.contains('nav--open')) {
    setNavAria(false);
    document.body.classList.remove('nav-open');
    return;
  }
  nav.classList.remove('nav--open');
  document.body.classList.remove('nav-open');
  setNavAria(false);
  document.removeEventListener('keydown', handleNavKeydown);
  if (returnFocus) {
    navToggle.focus();
  }
};

const handleNavKeydown = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeNav();
    return;
  }
  if (event.key !== 'Tab') {
    return;
  }
  const focusable = getFocusableNavItems();
  if (!focusable.length) {
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!navLinks.contains(document.activeElement)) {
    event.preventDefault();
    first.focus();
    return;
  }
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
    return;
  }
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const syncNavToViewport = () => {
  if (!navLinks) {
    return;
  }
  if (navDesktopQuery.matches) {
    closeNav(false);
    navLinks.removeAttribute('aria-hidden');
    return;
  }
  const isOpen = nav?.classList.contains('nav--open');
  navLinks.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
};

if (navToggle) {
  navToggle.addEventListener('click', () => {
    if (nav?.classList.contains('nav--open')) {
      closeNav();
      return;
    }
    openNav();
  });
}

if (navBackdrop) {
  navBackdrop.addEventListener('click', () => closeNav());
}

if (navLinks) {
  navLinks.addEventListener('click', (event) => {
    const link = event.target.closest('.nav__link');
    if (link && !navDesktopQuery.matches) {
      closeNav();
    }
  });
}

syncNavToViewport();
navDesktopQuery.addEventListener('change', syncNavToViewport);

const initHeaderShrink = () => {
  const header = document.querySelector('.header');
  if (!header) {
    return;
  }

  const enter = 18;
  const exit = 8;
  let isShrink = false;
  let ticking = false;

  const apply = () => {
    ticking = false;
    const y = window.scrollY || window.pageYOffset;

    if (y <= 0) {
      if (isShrink) {
        isShrink = false;
        header.classList.remove('is-shrink');
      }
      return;
    }

    if (!isShrink && y >= enter) {
      isShrink = true;
      header.classList.add('is-shrink');
      return;
    }

    if (isShrink && y <= exit) {
      isShrink = false;
      header.classList.remove('is-shrink');
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  apply();
};

initHeaderShrink();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) {
      return;
    }
    event.preventDefault();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.scrollIntoView();
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const revealElements = document.querySelectorAll('[data-reveal]');
if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal', 'is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealElements.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  const formMessage = contactForm.querySelector('[data-form-message]');
  const fields = contactForm.querySelectorAll('.form__field');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let hasError = false;

    fields.forEach((field) => {
      field.classList.remove('form__field--error');
      const input = field.querySelector('input, textarea');
      if (!input) {
        return;
      }
      const isValid = input.checkValidity();
      if (!isValid) {
        field.classList.add('form__field--error');
        hasError = true;
      }
    });

    if (hasError) {
      formMessage.textContent = 'Uzupełnij wszystkie pola formularza.';
      return;
    }

    formMessage.textContent = 'Dziękuję! Wrócę z odpowiedzią w ciągu 24h.';
    contactForm.reset();
  });
}

const filterWrapper = document.querySelector('.project-filter');
const projectGrid = document.querySelector('[data-project-grid]');
if (filterWrapper && projectGrid) {
  const filterButtons = Array.from(filterWrapper.querySelectorAll('[data-filter]'));
  if (filterButtons.length) {
    const items = Array.from(projectGrid.children);
    // This UI filters a single grid (not separate panels), so we use toggle buttons instead of ARIA tabs.
    const setActiveFilter = (filterKey) => {
      filterButtons.forEach((button) => {
        const isActive = button.getAttribute('data-filter') === filterKey;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });

      items.forEach((item) => {
        const category = item.getAttribute('data-category');
        const visible = filterKey === 'all' || filterKey === category;
        item.style.display = visible ? 'grid' : 'none';
      });
    };

    const defaultButton = filterButtons.find((button) => button.classList.contains('is-active'))
      ?? filterButtons.find((button) => button.getAttribute('data-filter') === 'all')
      ?? filterButtons[0];
    if (defaultButton) {
      setActiveFilter(defaultButton.getAttribute('data-filter'));
    }

    filterWrapper.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button || !filterWrapper.contains(button)) {
        return;
      }
      setActiveFilter(button.getAttribute('data-filter'));
    });
  }
}
