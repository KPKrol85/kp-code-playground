(() => {
  const SELECTORS = {
    root: '[data-orbit-carousel]',
    orbitRail: '[data-orbit-rail]',
    panel: '[data-carousel-panel]',
    prev: '[data-carousel-prev]',
    next: '[data-carousel-next]',
    template: 'template[data-orbit-item-template]',
    status: '.os-carousel__status',
    trigger: '[data-carousel-trigger]'
  };

  const MOTION_QUERY = window.matchMedia('(prefers-reduced-motion: reduce)');

  class OrbitingShowcase {
    constructor(root, index) {
      this.root = root;
      this.instanceIndex = index;
      this.stage = root.querySelector('.os-carousel__stage');
      this.orbitRail = root.querySelector(SELECTORS.orbitRail);
      this.panels = Array.from(root.querySelectorAll(SELECTORS.panel));
      this.prevButton = root.querySelector(SELECTORS.prev);
      this.nextButton = root.querySelector(SELECTORS.next);
      this.status = root.querySelector(SELECTORS.status);
      this.template = document.querySelector(SELECTORS.template);
      this.activeIndex = this.panels.findIndex((panel) => panel.classList.contains('is-active'));
      this.activeIndex = this.activeIndex >= 0 ? this.activeIndex : 0;
      this.triggers = [];
      this.frame = 0;
      this.isVisible = true;
      this.resizeObserver = null;
      this.intersectionObserver = null;
      this.touchState = null;
      this.boundHandleKeydown = this.handleKeydown.bind(this);
      this.boundHandlePointerDown = this.handlePointerDown.bind(this);
      this.boundHandlePointerMove = this.handlePointerMove.bind(this);
      this.boundHandlePointerUp = this.handlePointerUp.bind(this);
      this.boundScheduleLayout = this.scheduleLayout.bind(this);

      if (!this.stage || !this.orbitRail || !this.panels.length || !this.prevButton || !this.nextButton || !this.template) {
        return;
      }

      this.slideMeta = this.panels.map((panel, panelIndex) => this.extractPanelMeta(panel, panelIndex));
      this.buildOrbitItems();
      this.bindEvents();
      this.setupObservers();
      this.update(true);
      this.emit('carousel:ready', { index: this.activeIndex, slide: this.slideMeta[this.activeIndex] });
    }

    extractPanelMeta(panel, index) {
      const label = panel.querySelector('.os-carousel__panel-label')?.textContent?.trim() || `Slide ${index + 1}`;
      const title = panel.querySelector('.os-carousel__panel-title')?.textContent?.trim() || `Showcase ${index + 1}`;
      const meta = panel.querySelector('.os-carousel__meta span')?.textContent?.trim() || 'Preview';
      return { label, title, meta };
    }

    buildOrbitItems() {
      const fragment = document.createDocumentFragment();

      this.slideMeta.forEach((slide, index) => {
        const node = this.template.content.firstElementChild.cloneNode(true);
        const label = node.querySelector('.os-carousel__orbit-label');
        const title = node.querySelector('.os-carousel__orbit-title');
        const meta = node.querySelector('.os-carousel__orbit-meta');

        node.dataset.index = String(index);
        node.setAttribute('aria-label', `${slide.label}: ${slide.title}`);
        node.setAttribute('aria-pressed', 'false');
        label.textContent = slide.label;
        title.textContent = slide.title;
        meta.textContent = slide.meta;

        fragment.appendChild(node);
        this.triggers.push(node);
      });

      this.orbitRail.innerHTML = '';
      this.orbitRail.appendChild(fragment);
    }

    bindEvents() {
      this.prevButton.addEventListener('click', () => this.goTo(this.activeIndex - 1));
      this.nextButton.addEventListener('click', () => this.goTo(this.activeIndex + 1));

      this.triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => this.goTo(index));
      });

      this.root.addEventListener('keydown', this.boundHandleKeydown);
      this.stage.addEventListener('pointerdown', this.boundHandlePointerDown, { passive: true });
      this.stage.addEventListener('pointermove', this.boundHandlePointerMove, { passive: true });
      this.stage.addEventListener('pointerup', this.boundHandlePointerUp);
      this.stage.addEventListener('pointercancel', this.boundHandlePointerUp);
      window.addEventListener('resize', this.boundScheduleLayout, { passive: true });
    }

    setupObservers() {
      if ('ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver(() => this.scheduleLayout());
        this.resizeObserver.observe(this.root);
      }

      if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.target === this.root) {
                this.isVisible = entry.isIntersecting;
                if (this.isVisible) {
                  this.scheduleLayout();
                }
              }
            });
          },
          { threshold: 0.2 }
        );
        this.intersectionObserver.observe(this.root);
      }
    }

    handleKeydown(event) {
      const isWithin = this.root.contains(event.target);
      if (!isWithin) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.goTo(this.activeIndex - 1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.goTo(this.activeIndex + 1);
          break;
        case 'Home':
          event.preventDefault();
          this.goTo(0);
          break;
        case 'End':
          event.preventDefault();
          this.goTo(this.panels.length - 1);
          break;
        default:
          break;
      }
    }

    handlePointerDown(event) {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      this.touchState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        deltaX: 0,
        deltaY: 0
      };
    }

    handlePointerMove(event) {
      if (!this.touchState || event.pointerId !== this.touchState.pointerId) {
        return;
      }

      this.touchState.deltaX = event.clientX - this.touchState.startX;
      this.touchState.deltaY = event.clientY - this.touchState.startY;
    }

    handlePointerUp(event) {
      if (!this.touchState || event.pointerId !== this.touchState.pointerId) {
        return;
      }

      const { deltaX, deltaY } = this.touchState;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      this.touchState = null;

      if (absX < 44 || absX < absY * 1.15) {
        return;
      }

      if (deltaX < 0) {
        this.goTo(this.activeIndex + 1);
      } else {
        this.goTo(this.activeIndex - 1);
      }
    }

    goTo(nextIndex) {
      const total = this.panels.length;
      const normalized = (nextIndex + total) % total;

      if (normalized === this.activeIndex) {
        return;
      }

      this.activeIndex = normalized;
      this.update();
      this.emit('carousel:change', { index: this.activeIndex, slide: this.slideMeta[this.activeIndex] });
    }

    update(isInitial = false) {
      this.panels.forEach((panel, index) => {
        const isActive = index === this.activeIndex;
        panel.classList.toggle('is-active', isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
      });

      this.triggers.forEach((trigger, index) => {
        const isActive = index === this.activeIndex;
        trigger.classList.toggle('is-active', isActive);
        trigger.setAttribute('aria-pressed', String(isActive));
        trigger.setAttribute('aria-current', isActive ? 'true' : 'false');
        trigger.tabIndex = 0;
      });

      if (this.status) {
        const slide = this.slideMeta[this.activeIndex];
        this.status.textContent = `${slide.title}. ${slide.label}. Slide ${this.activeIndex + 1} of ${this.panels.length}.`;
      }

      if (!isInitial && document.activeElement && this.root.contains(document.activeElement) && document.activeElement.matches(SELECTORS.trigger)) {
        this.triggers[this.activeIndex]?.focus({ preventScroll: true });
      }

      this.scheduleLayout();
    }

    scheduleLayout() {
      if (!this.isVisible) {
        return;
      }

      cancelAnimationFrame(this.frame);
      this.frame = requestAnimationFrame(() => this.applyOrbitLayout());
    }

    applyOrbitLayout() {
      const reducedMotion = MOTION_QUERY.matches;
      const bounds = this.root.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;
      const isCompact = width <= 720;
      const xRadius = isCompact ? Math.max(width * 0.28, 118) : Math.max(Math.min(width * 0.36, 310), 196);
      const yRadius = isCompact ? Math.max(height * 0.15, 70) : Math.max(Math.min(height * 0.22, 172), 108);
      const step = (Math.PI * 2) / this.triggers.length;
      const baseAngle = isCompact ? -Math.PI / 2 : -Math.PI / 2.3;

      this.triggers.forEach((trigger, index) => {
        const offset = this.normalizeOffset(index - this.activeIndex);
        const angle = baseAngle + offset * step;
        const x = Math.cos(angle) * xRadius;
        const y = Math.sin(angle) * yRadius + (isCompact ? yRadius * 0.85 : 0);
        const distance = Math.abs(offset);
        const depthScale = reducedMotion ? 1 - Math.min(distance, 3) * 0.04 : 1 - Math.min(distance, 3) * 0.08;
        const opacity = Math.max(0.34, 1 - distance * 0.16);
        const blur = reducedMotion ? 0 : `${Math.min(distance * 0.8, 2.4).toFixed(2)}px`;
        const zIndex = this.triggers.length - distance;

        trigger.style.setProperty('--item-x', `${x.toFixed(1)}px`);
        trigger.style.setProperty('--item-y', `${y.toFixed(1)}px`);
        trigger.style.setProperty('--item-scale', depthScale.toFixed(3));
        trigger.style.setProperty('--item-opacity', opacity.toFixed(3));
        trigger.style.setProperty('--item-blur', blur);
        trigger.style.setProperty('--item-z', String(zIndex));
      });
    }

    normalizeOffset(offset) {
      const total = this.triggers.length;
      let normalized = offset;

      if (normalized > total / 2) {
        normalized -= total;
      }

      if (normalized < -total / 2) {
        normalized += total;
      }

      return normalized;
    }

    emit(name, detail) {
      this.root.dispatchEvent(
        new CustomEvent(name, {
          bubbles: true,
          detail: {
            instance: this.instanceIndex,
            ...detail
          }
        })
      );
    }
  }

  const init = () => {
    const carousels = Array.from(document.querySelectorAll(SELECTORS.root));
    carousels.forEach((root, index) => {
      if (!root.__orbitingShowcase) {
        root.__orbitingShowcase = new OrbitingShowcase(root, index);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
