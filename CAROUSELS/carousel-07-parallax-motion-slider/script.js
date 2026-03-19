(() => {
  const carousels = document.querySelectorAll('[data-carousel]');

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  class ParallaxCarousel {
    constructor(root) {
      this.root = root;
      this.viewport = root.querySelector('[data-carousel-viewport]');
      this.track = root.querySelector('[data-carousel-track]');
      this.slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
      this.status = root.querySelector('[data-carousel-status]');
      this.prevButton = root.querySelector('[data-carousel-prev]');
      this.nextButton = root.querySelector('[data-carousel-next]');
      this.pagination = root.querySelector('[data-carousel-pagination]');
      this.currentIndex = Math.max(0, this.slides.findIndex((slide) => slide.classList.contains('is-active')));
      this.targetPosition = this.currentIndex;
      this.renderPosition = this.currentIndex;
      this.animationFrame = 0;
      this.resizeObserver = null;
      this.visibilityObserver = null;
      this.isVisible = true;
      this.pointerState = { x: 0, y: 0 };
      this.pointerTarget = { x: 0, y: 0 };
      this.drag = {
        active: false,
        startX: 0,
        deltaX: 0,
        pointerId: null,
        originPosition: this.currentIndex,
      };
      this.hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
      this.intensity = 1;
      this.boundTick = this.tick.bind(this);

      if (!this.viewport || !this.track || !this.slides.length) {
        return;
      }

      this.buildPagination();
      this.updateIntensity();
      this.attachEvents();
      this.goTo(this.currentIndex, { announce: false, emit: false });
      this.update();
      this.emit('carousel:ready', { index: this.currentIndex, slide: this.slides[this.currentIndex] });
    }

    buildPagination() {
      if (!this.pagination) {
        return;
      }

      const labels = this.slides.map((slide) => {
        const heading = slide.querySelector('.pm-slide__headline');
        return heading ? heading.textContent.trim() : 'Slide';
      });

      this.pagination.innerHTML = '';
      this.dots = labels.map((label, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'pm-slider__dot';
        button.setAttribute('data-carousel-dot', '');
        button.setAttribute('aria-label', `Go to slide ${index + 1}: ${label}`);
        button.innerHTML = `<span class="pm-slider__dot-index">${String(index + 1).padStart(2, '0')}</span><span class="pm-slider__dot-label">${label}</span>`;
        button.addEventListener('click', () => this.goTo(index));
        this.pagination.appendChild(button);
        return button;
      });
    }

    attachEvents() {
      this.prevButton?.addEventListener('click', () => this.goTo(this.currentIndex - 1));
      this.nextButton?.addEventListener('click', () => this.goTo(this.currentIndex + 1));

      this.viewport.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
          return;
        }

        event.preventDefault();
        this.goTo(this.currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
      });

      this.viewport.addEventListener('pointerdown', (event) => this.onPointerDown(event));
      this.viewport.addEventListener('pointermove', (event) => this.onPointerMove(event));
      this.viewport.addEventListener('pointerup', (event) => this.onPointerUp(event));
      this.viewport.addEventListener('pointercancel', (event) => this.onPointerUp(event));
      this.viewport.addEventListener('pointerleave', () => this.resetPointerTarget());

      this.hasReducedMotion.addEventListener('change', () => {
        this.updateIntensity();
        this.update();
      });

      this.hasFinePointer.addEventListener('change', () => {
        this.viewport.classList.toggle('is-draggable', this.hasFinePointer.matches);
      });

      this.viewport.classList.toggle('is-draggable', this.hasFinePointer.matches);

      if ('ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver(() => this.updateIntensity());
        this.resizeObserver.observe(this.root);
      }

      if ('IntersectionObserver' in window) {
        this.visibilityObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.target === this.root) {
                this.isVisible = entry.isIntersecting;
                if (this.isVisible) {
                  this.start();
                }
              }
            });
          },
          { threshold: 0.2 }
        );

        this.visibilityObserver.observe(this.root);
      }
    }

    updateIntensity() {
      const width = this.root.clientWidth || window.innerWidth;
      const reduced = this.hasReducedMotion.matches;

      if (reduced) {
        this.intensity = 0;
      } else if (width < 680) {
        this.intensity = 0.35;
      } else if (width < 960) {
        this.intensity = 0.58;
      } else {
        this.intensity = 1;
      }
    }

    onPointerDown(event) {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      this.drag.active = true;
      this.drag.startX = event.clientX;
      this.drag.deltaX = 0;
      this.drag.pointerId = event.pointerId;
      this.drag.originPosition = this.targetPosition;
      this.viewport.classList.add('is-dragging');
      this.viewport.setPointerCapture?.(event.pointerId);
      this.start();
    }

    onPointerMove(event) {
      const rect = this.viewport.getBoundingClientRect();
      const relativeX = rect.width ? (event.clientX - rect.left) / rect.width - 0.5 : 0;
      const relativeY = rect.height ? (event.clientY - rect.top) / rect.height - 0.5 : 0;

      if (this.hasFinePointer.matches && !this.hasReducedMotion.matches) {
        this.pointerTarget.x = clamp(relativeX * 18, -8, 8) * this.intensity;
        this.pointerTarget.y = clamp(relativeY * 14, -7, 7) * this.intensity;
        this.start();
      }

      if (!this.drag.active || event.pointerId !== this.drag.pointerId) {
        return;
      }

      this.drag.deltaX = event.clientX - this.drag.startX;
      const progress = rect.width ? this.drag.deltaX / rect.width : 0;
      this.targetPosition = clamp(this.drag.originPosition - progress, 0, this.slides.length - 1);
      this.start();
    }

    onPointerUp(event) {
      if (!this.drag.active || event.pointerId !== this.drag.pointerId) {
        return;
      }

      const rect = this.viewport.getBoundingClientRect();
      const threshold = Math.max(54, rect.width * 0.1);
      const deltaX = this.drag.deltaX;
      const direction = deltaX > threshold ? -1 : deltaX < -threshold ? 1 : 0;
      const nextIndex = direction === 0 ? Math.round(this.targetPosition) : this.currentIndex + direction;

      this.drag.active = false;
      this.drag.pointerId = null;
      this.viewport.classList.remove('is-dragging');
      this.viewport.releasePointerCapture?.(event.pointerId);
      this.goTo(nextIndex);
    }

    resetPointerTarget() {
      this.pointerTarget.x = 0;
      this.pointerTarget.y = 0;
      this.start();
    }

    goTo(index, options = {}) {
      const { announce = true, emit = true } = options;
      const nextIndex = clamp(index, 0, this.slides.length - 1);
      this.currentIndex = nextIndex;
      this.targetPosition = nextIndex;
      this.slides.forEach((slide, slideIndex) => {
        const active = slideIndex === nextIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });

      this.dots?.forEach((dot, dotIndex) => {
        const active = dotIndex === nextIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-current', active ? 'true' : 'false');
      });

      if (this.prevButton) {
        this.prevButton.disabled = nextIndex === 0;
      }

      if (this.nextButton) {
        this.nextButton.disabled = nextIndex === this.slides.length - 1;
      }

      if (this.status && announce) {
        const heading = this.slides[nextIndex].querySelector('.pm-slide__headline')?.textContent?.trim() || `Slide ${nextIndex + 1}`;
        this.status.textContent = `Slide ${nextIndex + 1} of ${this.slides.length}: ${heading}`;
      }

      if (emit) {
        this.emit('carousel:change', { index: nextIndex, slide: this.slides[nextIndex] });
      }

      this.start();
    }

    start() {
      if (!this.animationFrame && this.isVisible) {
        this.animationFrame = window.requestAnimationFrame(this.boundTick);
      }
    }

    tick() {
      this.animationFrame = 0;
      this.update();

      const stillMoving =
        Math.abs(this.renderPosition - this.targetPosition) > 0.001 ||
        Math.abs(this.pointerState.x - this.pointerTarget.x) > 0.01 ||
        Math.abs(this.pointerState.y - this.pointerTarget.y) > 0.01;

      if (stillMoving && this.isVisible) {
        this.animationFrame = window.requestAnimationFrame(this.boundTick);
      }
    }

    update() {
      const reduced = this.hasReducedMotion.matches;
      const easing = reduced ? 1 : 0.085;
      const pointerEase = reduced ? 1 : 0.12;

      this.renderPosition += (this.targetPosition - this.renderPosition) * easing;
      this.pointerState.x += (this.pointerTarget.x - this.pointerState.x) * pointerEase;
      this.pointerState.y += (this.pointerTarget.y - this.pointerState.y) * pointerEase;

      if (Math.abs(this.renderPosition - this.targetPosition) < 0.001) {
        this.renderPosition = this.targetPosition;
      }

      if (Math.abs(this.pointerState.x - this.pointerTarget.x) < 0.01) {
        this.pointerState.x = this.pointerTarget.x;
      }

      if (Math.abs(this.pointerState.y - this.pointerTarget.y) < 0.01) {
        this.pointerState.y = this.pointerTarget.y;
      }

      this.track.style.setProperty('--pm-track-progress', this.renderPosition.toFixed(4));

      this.slides.forEach((slide, index) => {
        const offset = (index - this.renderPosition) * this.intensity;
        const activeDistance = Math.abs(index - this.currentIndex);
        const pointerX = activeDistance < 0.5 ? this.pointerState.x : 0;
        const pointerY = activeDistance < 0.5 ? this.pointerState.y : 0;
        const scaleFactor = activeDistance < 0.5 ? 1 : 0;

        slide.style.setProperty('--pm-slide-offset', offset.toFixed(4));
        slide.style.setProperty('--pm-pointer-x', `${pointerX.toFixed(2)}px`);
        slide.style.setProperty('--pm-pointer-y', `${pointerY.toFixed(2)}px`);
        slide.style.setProperty('--pm-parallax-scale', String(scaleFactor));
      });
    }

    emit(name, detail) {
      this.root.dispatchEvent(
        new CustomEvent(name, {
          bubbles: true,
          detail,
        })
      );
    }
  }

  carousels.forEach((carousel) => {
    new ParallaxCarousel(carousel);
  });
})();
