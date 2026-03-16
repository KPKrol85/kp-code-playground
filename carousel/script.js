(() => {
  const carousel = document.querySelector('.carousel');

  if (!carousel) {
    return;
  }

  const track = carousel.querySelector('.carousel__track');
  const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
  const pagination = carousel.querySelector('.carousel__pagination');
  const previousButton = carousel.querySelector('[data-action="prev"]');
  const nextButton = carousel.querySelector('[data-action="next"]');

  let activeIndex = 0;

  const clampIndex = (index) => {
    if (index < 0) {
      return slides.length - 1;
    }

    if (index >= slides.length) {
      return 0;
    }

    return index;
  };

  const updateSlides = (newIndex) => {
    activeIndex = clampIndex(newIndex);
    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    const dots = pagination.querySelectorAll('.carousel__dot');
    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.setAttribute('aria-selected', String(isActive));
      dot.tabIndex = isActive ? 0 : -1;
    });
  };

  const createPagination = () => {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.setAttribute('aria-controls', 'carousel-track');
      dot.setAttribute('aria-selected', String(index === activeIndex));
      dot.tabIndex = index === activeIndex ? 0 : -1;

      dot.addEventListener('click', () => {
        updateSlides(index);
      });

      pagination.appendChild(dot);
    });
  };

  const handleKeyboardNavigation = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      updateSlides(activeIndex - 1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      updateSlides(activeIndex + 1);
    }
  };

  createPagination();
  updateSlides(activeIndex);

  previousButton.addEventListener('click', () => {
    updateSlides(activeIndex - 1);
  });

  nextButton.addEventListener('click', () => {
    updateSlides(activeIndex + 1);
  });

  carousel.addEventListener('keydown', handleKeyboardNavigation);
})();
