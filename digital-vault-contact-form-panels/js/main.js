const navLinks = [...document.querySelectorAll('.nav-chip')];
const panels = [...document.querySelectorAll('.panel[id^="form-"]')];

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  },
  { rootMargin: '-30% 0px -55% 0px', threshold: 0.1 }
);

panels.forEach((panel) => observer.observe(panel));

navLinks.forEach((link) => {
  link.addEventListener('keydown', (event) => {
    const currentIndex = navLinks.indexOf(link);
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      navLinks[(currentIndex + 1) % navLinks.length].focus();
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      navLinks[(currentIndex - 1 + navLinks.length) % navLinks.length].focus();
    }
  });
});

document.querySelectorAll('textarea[data-counter]').forEach((textarea) => {
  const counter = document.getElementById(textarea.dataset.counter);
  const max = textarea.getAttribute('maxlength') || 0;
  const update = () => { counter.textContent = `${textarea.value.length} / ${max}`; };
  textarea.addEventListener('input', update);
  update();
});

document.querySelectorAll('.contact-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = form.querySelector('.form-feedback');
    const requiredFields = [...form.querySelectorAll('[required]')];
    let valid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
        valid = false;
        field.classList.add('invalid');
      } else {
        field.classList.remove('invalid');
      }
    });

    if (valid) {
      feedback.className = 'form-feedback success';
      feedback.textContent = 'Form looks good. Ready for backend integration.';
    } else {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please complete required fields before submitting.';
    }
  });
});
