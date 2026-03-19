(function () {
  const STATE_CLASSES = [
    'is-active',
    'is-prev',
    'is-next',
    'is-far-left',
    'is-far-right',
    'is-hidden-left',
    'is-hidden-right'
  ];

  class PerspectiveCarousel {
    constructor(root, index) {
      this.root = root;
      this.instanceIndex = index;
      this.track = root.querySelector('[data-carousel-track]');
      this.stage = root.querySelector('[data-carousel-stage]');
      this.liveRegion = root.querySelector('[data-carousel-live]');
      this.currentReadout = root.querySelector('[data-carousel-current]');
      this.totalReadout = root.querySelector('[data-carousel-total]');
      this.prevButton = root.querySelector('[data-carousel-prev]');
      this.nextButton = root.querySelector('[data-carousel-next]');
      this.pagination = root.querySelector('[data-carousel-pagination]');
      this.slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
      this.focusButtons = this.slides.map((slide) => slide.querySelector('[data-carousel-focus]'));
      this.contentRegions = this.slides.map((slide) => slide.querySelector('[data-carousel-content]'));
      this.activeIndex = this.slides.findIndex((slide) => slide.classList.contains('is-active'));
      this.activeIndex = this.activeIndex >= 0 ? this.activeIndex : 0;
      this.touch = {
        startX: 0,
        deltaX: 0,
        active: false
      };
      this.rafHandle = 0;
      this.resizeObserver = null;
      this.dotButtons = [];
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

      if (!this.track || !this.stage || this.slides.length === 0) {
        return;
      }

      this.setupSlides();
      this.buildPagination();
      this.bindEvents();
      this.observeSize();
      this.update(false);
      this.emit('carousel:ready');
    }

    setupSlides() {
      this.totalReadout.textContent = String(this.slides.length).padStart(2, '0');
      this.root.tabIndex = 0;

      this.slides.forEach((slide, slideIndex) => {
        const title = slide.querySelector('.pc3d-card__title');
        const titleId = `pc3d-carousel-${this.instanceIndex}-title-${slideIndex}`;
        const descId = `pc3d-carousel-${this.instanceIndex}-desc-${slideIndex}`;
        const description = slide.querySelector('.pc3d-card__description');
        const focusButton = slide.querySelector('[data-carousel-focus]');

        if (title) {
          title.id = titleId;
          slide.setAttribute('aria-labelledby', titleId);
        }

        if (description) {
          description.id = descId;
          slide.setAttribute('aria-describedby', descId);
        }

        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');

        if (focusButton) {
          focusButton.type = 'button';
          focusButton.addEventListener('click', () => {
            if (slideIndex !== this.activeIndex) {
              this.goTo(slideIndex);
            }
          });
        }
      });
    }

    buildPagination() {
      if (!this.pagination) {
        return;
      }

      this.pagination.innerHTML = '';
      this.dotButtons = this.slides.map((slide, slideIndex) => {
        const dot = document.createElement('button');
        dot.className = 'pc3d-carousel__dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${slideIndex + 1}`);
        dot.addEventListener('click', () => this.goTo(slideIndex));
        this.pagination.appendChild(dot);
        return dot;
      });
    }

    bindEvents() {
      this.prevButton?.addEventListener('click', () => this.goTo(this.activeIndex - 1));
      this.nextButton?.addEventListener('click', () => this.goTo(this.activeIndex + 1));

      this.root.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
          return;
        }

        const targetTag = event.target.tagName;
        const isTextInput = /INPUT|TEXTAREA|SELECT/.test(targetTag);
        if (isTextInput) {
          return;
        }

        event.preventDefault();

        if (event.key === 'ArrowLeft') {
          this.goTo(this.activeIndex - 1);
        } else if (event.key === 'ArrowRight') {
          this.goTo(this.activeIndex + 1);
        } else if (event.key === 'Home') {
          this.goTo(0);
        } else if (event.key === 'End') {
          this.goTo(this.slides.length - 1);
        }
      });

      this.stage.addEventListener(
        'touchstart',
        (event) => {
          const touch = event.changedTouches[0];
          if (!touch) {
            return;
          }

          this.touch.startX = touch.clientX;
          this.touch.deltaX = 0;
          this.touch.active = true;
        },
        { passive: true }
      );

      this.stage.addEventListener(
        'touchmove',
        (event) => {
          if (!this.touch.active) {
            return;
          }

          const touch = event.changedTouches[0];
          if (!touch) {
            return;
          }

          this.touch.deltaX = touch.clientX - this.touch.startX;
        },
        { passive: true }
      );

      this.stage.addEventListener(
        'touchend',
        () => {
          if (!this.touch.active) {
            return;
          }

          const threshold = 46;
          const delta = this.touch.deltaX;
          this.touch.active = false;
          this.touch.deltaX = 0;

          if (Math.abs(delta) < threshold) {
            return;
          }

          this.goTo(delta < 0 ? this.activeIndex + 1 : this.activeIndex - 1);
        },
        { passive: true }
      );

      this.reducedMotion.addEventListener?.('change', () => this.update(false));
    }

    observeSize() {
      if (!('ResizeObserver' in window)) {
        this.syncCompactMode(this.root.clientWidth);
        return;
      }

      this.resizeObserver = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect.width || this.root.clientWidth;

        if (this.rafHandle) {
          cancelAnimationFrame(this.rafHandle);
        }

        this.rafHandle = requestAnimationFrame(() => {
          this.syncCompactMode(width);
        });
      });

      this.resizeObserver.observe(this.root);
    }

    syncCompactMode(width) {
      this.root.dataset.compact = width < 780 ? 'true' : 'false';
    }

    normalizeIndex(index) {
      const length = this.slides.length;
      return ((index % length) + length) % length;
    }

    getRelativeDistance(slideIndex) {
      const length = this.slides.length;
      let delta = slideIndex - this.activeIndex;

      if (delta > length / 2) {
        delta -= length;
      } else if (delta < -length / 2) {
        delta += length;
      }

      return delta;
    }

    stateFromDistance(distance) {
      if (distance === 0) {
        return 'is-active';
      }
      if (distance === -1) {
        return 'is-prev';
      }
      if (distance === 1) {
        return 'is-next';
      }
      if (distance === -2) {
        return 'is-far-left';
      }
      if (distance === 2) {
        return 'is-far-right';
      }
      return distance < 0 ? 'is-hidden-left' : 'is-hidden-right';
    }

    announce() {
      const slide = this.slides[this.activeIndex];
      const title = slide.querySelector('.pc3d-card__title')?.textContent?.trim() || `Slide ${this.activeIndex + 1}`;
      const message = `Slide ${this.activeIndex + 1} of ${this.slides.length}: ${title}`;

      if (this.liveRegion) {
        this.liveRegion.textContent = message;
      }
    }

    update(announce = true) {
      this.currentReadout.textContent = String(this.activeIndex + 1).padStart(2, '0');

      this.slides.forEach((slide, slideIndex) => {
        const state = this.stateFromDistance(this.getRelativeDistance(slideIndex));
        const content = this.contentRegions[slideIndex];
        const focusButton = this.focusButtons[slideIndex];
        const isActive = slideIndex === this.activeIndex;

        slide.classList.remove(...STATE_CLASSES);
        slide.classList.add(state);
        slide.dataset.state = state.replace('is-', '');
        slide.setAttribute('aria-label', `${slideIndex + 1} of ${this.slides.length}`);
        slide.setAttribute('aria-current', String(isActive));

        if (content) {
          content.setAttribute('aria-hidden', String(!isActive));
          if ('inert' in content) {
            content.inert = !isActive;
          }
        }

        if (focusButton) {
          focusButton.tabIndex = isActive ? -1 : 0;
          focusButton.setAttribute('aria-hidden', String(isActive));
          focusButton.disabled = isActive;
        }
      });

      this.dotButtons.forEach((dot, dotIndex) => {
        const selected = dotIndex === this.activeIndex;
        if (selected) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
        dot.setAttribute('aria-label', selected ? `Slide ${dotIndex + 1}, current` : `Go to slide ${dotIndex + 1}`);
      });

      if (announce) {
        this.announce();
      }
    }

    goTo(index) {
      const nextIndex = this.normalizeIndex(index);

      if (nextIndex === this.activeIndex) {
        return;
      }

      this.activeIndex = nextIndex;
      this.update(true);
      this.emit('carousel:change');
    }

    emit(name) {
      this.root.dispatchEvent(
        new CustomEvent(name, {
          bubbles: true,
          detail: {
            activeIndex: this.activeIndex,
            slideCount: this.slides.length,
            activeTitle: this.slides[this.activeIndex]?.querySelector('.pc3d-card__title')?.textContent?.trim() || ''
          }
        })
      );
    }
  }

  const carousels = Array.from(document.querySelectorAll('[data-carousel="perspective-3d"]'));

  carousels.forEach((carousel, index) => {
    const instance = new PerspectiveCarousel(carousel, index + 1);
    if (!carousel.__perspectiveCarousel) {
      carousel.__perspectiveCarousel = instance;
    }
  });
})();
