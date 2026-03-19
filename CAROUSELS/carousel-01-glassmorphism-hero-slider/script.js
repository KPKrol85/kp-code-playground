(() => {
  const SELECTORS = {
    carousel: '[data-carousel]',
    viewport: '[data-carousel-viewport]',
    slides: '[data-slide]',
    prev: '[data-carousel-prev]',
    next: '[data-carousel-next]',
    dots: '[data-carousel-dot]',
    status: '.ghs-carousel__status'
  };

  class GlassHeroCarousel {
    constructor(root) {
      this.root = root;
      this.viewport = root.querySelector(SELECTORS.viewport);
      this.slides = Array.from(root.querySelectorAll(SELECTORS.slides));
      this.prevButton = root.querySelector(SELECTORS.prev);
      this.nextButton = root.querySelector(SELECTORS.next);
      this.dots = Array.from(root.querySelectorAll(SELECTORS.dots));
      this.status = root.querySelector(SELECTORS.status);
      this.activeIndex = Math.max(0, this.slides.findIndex((slide) => slide.classList.contains('is-active')));
      this.autoplayEnabled = root.dataset.autoplay !== 'false';
      this.autoplayDelay = Number.parseInt(root.dataset.autoplayDelay || '7000', 10);
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.isHovering = false;
      this.hasFocusWithin = false;
      this.isVisible = true;
      this.isPointerDown = false;
      this.pointerId = null;
      this.dragStartX = 0;
      this.dragDeltaX = 0;
      this.progressValue = 0;
      this.autoplayTimer = null;
      this.progressFrame = null;
      this.autoplayStart = 0;
      this.resizeObserver = null;
      this.intersectionObserver = null;
      this.boundKeydown = this.onKeydown.bind(this);
      this.boundPointerDown = this.onPointerDown.bind(this);
      this.boundPointerMove = this.onPointerMove.bind(this);
      this.boundPointerUp = this.onPointerUp.bind(this);
      this.boundPointerCancel = this.onPointerCancel.bind(this);
      this.boundPointerEnter = () => {
        this.isHovering = true;
        this.stopAutoplay();
      };
      this.boundPointerLeave = () => {
        this.isHovering = false;
        this.maybeStartAutoplay();
      };
      this.boundFocusIn = () => {
        this.hasFocusWithin = true;
        this.stopAutoplay();
      };
      this.boundFocusOut = () => {
        requestAnimationFrame(() => {
          this.hasFocusWithin = this.root.contains(document.activeElement);
          this.maybeStartAutoplay();
        });
      };
    }

    init() {
      if (!this.viewport || this.slides.length === 0) return;

      this.update(true);
      this.attachEvents();
      this.createObservers();
      this.maybeStartAutoplay();

      this.root.dispatchEvent(
        new CustomEvent('carousel:ready', {
          detail: { carousel: this.root, activeIndex: this.activeIndex, slideCount: this.slides.length }
        })
      );
    }

    attachEvents() {
      this.prevButton?.addEventListener('click', () => this.goTo(this.activeIndex - 1, { userInitiated: true }));
      this.nextButton?.addEventListener('click', () => this.goTo(this.activeIndex + 1, { userInitiated: true }));

      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goTo(index, { userInitiated: true }));
      });

      this.root.addEventListener('keydown', this.boundKeydown);
      this.root.addEventListener('pointerenter', this.boundPointerEnter);
      this.root.addEventListener('pointerleave', this.boundPointerLeave);
      this.root.addEventListener('focusin', this.boundFocusIn);
      this.root.addEventListener('focusout', this.boundFocusOut);

      this.viewport.addEventListener('pointerdown', this.boundPointerDown, { passive: true });
      this.viewport.addEventListener('pointermove', this.boundPointerMove, { passive: true });
      this.viewport.addEventListener('pointerup', this.boundPointerUp);
      this.viewport.addEventListener('pointercancel', this.boundPointerCancel);
      this.viewport.addEventListener('lostpointercapture', this.boundPointerCancel);

      this.prefersReducedMotion.addEventListener?.('change', () => this.maybeStartAutoplay());
    }

    createObservers() {
      if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            this.isVisible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.55);
            this.maybeStartAutoplay();
          },
          { threshold: [0, 0.55, 0.85] }
        );
        this.intersectionObserver.observe(this.root);
      }

      if ('ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver(() => {
          if (this.isPointerDown) return;
          this.viewport.style.removeProperty('--drag-offset');
        });
        this.resizeObserver.observe(this.root);
      }
    }

    onKeydown(event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.goTo(this.activeIndex - 1, { userInitiated: true });
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.goTo(this.activeIndex + 1, { userInitiated: true });
      }
    }

    onPointerDown(event) {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      this.isPointerDown = true;
      this.pointerId = event.pointerId;
      this.dragStartX = event.clientX;
      this.dragDeltaX = 0;
      this.stopAutoplay();
      this.viewport.setPointerCapture?.(event.pointerId);
    }

    onPointerMove(event) {
      if (!this.isPointerDown || event.pointerId !== this.pointerId) return;
      this.dragDeltaX = event.clientX - this.dragStartX;
    }

    onPointerUp(event) {
      if (!this.isPointerDown || event.pointerId !== this.pointerId) return;
      const threshold = Math.max(48, this.root.clientWidth * 0.08);
      const deltaX = this.dragDeltaX;
      this.resetPointerState();

      if (Math.abs(deltaX) >= threshold) {
        this.goTo(this.activeIndex + (deltaX < 0 ? 1 : -1), { userInitiated: true });
      } else {
        this.maybeStartAutoplay();
      }
    }

    onPointerCancel() {
      if (!this.isPointerDown) return;
      this.resetPointerState();
      this.maybeStartAutoplay();
    }

    resetPointerState() {
      this.isPointerDown = false;
      this.pointerId = null;
      this.dragStartX = 0;
      this.dragDeltaX = 0;
    }

    goTo(index, options = {}) {
      const nextIndex = (index + this.slides.length) % this.slides.length;
      if (nextIndex === this.activeIndex && !options.force) {
        this.maybeStartAutoplay();
        return;
      }

      this.activeIndex = nextIndex;
      this.update();

      if (options.userInitiated) {
        this.stopAutoplay();
        this.maybeStartAutoplay();
      }
    }

    update(isInitial = false) {
      this.slides.forEach((slide, index) => {
        const isActive = index === this.activeIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      this.dots.forEach((dot, index) => {
        const isActive = index === this.activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
        dot.tabIndex = isActive ? 0 : -1;
        dot.style.setProperty('--progress', isActive ? this.progressValue.toFixed(3) : '0');
      });

      if (this.status) {
        const activeSlide = this.slides[this.activeIndex];
        const title = activeSlide?.querySelector('.ghs-title')?.textContent?.trim() || `Slide ${this.activeIndex + 1}`;
        this.status.textContent = `${title}. Slide ${this.activeIndex + 1} of ${this.slides.length}.`;
      }

      this.root.dispatchEvent(
        new CustomEvent('carousel:change', {
          detail: {
            carousel: this.root,
            activeIndex: this.activeIndex,
            slideCount: this.slides.length,
            isInitial
          }
        })
      );
    }

    maybeStartAutoplay() {
      if (!this.autoplayEnabled || this.prefersReducedMotion.matches || this.isHovering || this.hasFocusWithin || !this.isVisible) {
        this.stopAutoplay();
        return;
      }

      if (this.autoplayTimer) return;

      this.progressValue = 0;
      this.syncProgress();
      this.autoplayStart = performance.now();
      this.autoplayTimer = window.setTimeout(() => {
        this.autoplayTimer = null;
        this.goTo(this.activeIndex + 1, { force: true });
        this.maybeStartAutoplay();
      }, this.autoplayDelay);
      this.animateProgress();
    }

    stopAutoplay() {
      if (this.autoplayTimer) {
        window.clearTimeout(this.autoplayTimer);
        this.autoplayTimer = null;
      }
      if (this.progressFrame) {
        window.cancelAnimationFrame(this.progressFrame);
        this.progressFrame = null;
      }
      this.progressValue = 0;
      this.syncProgress();
    }

    animateProgress() {
      if (!this.autoplayTimer) return;

      const tick = (now) => {
        if (!this.autoplayTimer) return;
        this.progressValue = Math.min((now - this.autoplayStart) / this.autoplayDelay, 1);
        this.syncProgress();
        this.progressFrame = window.requestAnimationFrame(tick);
      };

      this.progressFrame = window.requestAnimationFrame(tick);
    }

    syncProgress() {
      this.dots.forEach((dot, index) => {
        dot.style.setProperty('--progress', index === this.activeIndex ? this.progressValue.toFixed(3) : '0');
      });
    }
  }

  const initCarousels = () => {
    document.querySelectorAll(SELECTORS.carousel).forEach((carousel) => {
      if (carousel.dataset.carouselBound === 'true') return;
      carousel.dataset.carouselBound = 'true';
      new GlassHeroCarousel(carousel).init();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels, { once: true });
  } else {
    initCarousels();
  }
})();
