(() => {
  const SELECTORS = {
    viewport: '[data-carousel-viewport]',
    track: '[data-carousel-track]',
    item: '[data-carousel-item]',
    status: '[data-carousel-status]',
    prev: '[data-carousel-prev]',
    next: '[data-carousel-next]',
    focusables: 'a[href], button, input, select, textarea, [tabindex]'
  };

  class InfiniteProductLoop {
    constructor(root) {
      this.root = root;
      this.viewport = root.querySelector(SELECTORS.viewport);
      this.track = root.querySelector(SELECTORS.track);
      this.status = root.querySelector(SELECTORS.status);
      this.prevButton = root.querySelector(SELECTORS.prev);
      this.nextButton = root.querySelector(SELECTORS.next);
      this.realItems = Array.from(this.track?.querySelectorAll(SELECTORS.item) ?? []);
      this.allItems = [];
      this.realCount = this.realItems.length;
      this.currentIndex = 0;
      this.visibleCount = 1;
      this.cloneCount = 0;
      this.itemSpan = 0;
      this.pendingTeleport = false;
      this.dragState = null;
      this.autoplayDelay = 4200;
      this.autoplayId = 0;
      this.isHovering = false;
      this.hasFocusWithin = false;
      this.isVisible = true;
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.resizeObserver = null;
      this.visibilityObserver = null;
      this.rafId = 0;
      this.suppressClick = false;

      if (!this.viewport || !this.track || this.realCount < 2) {
        return;
      }

      this.root.dataset.reducedMotion = String(this.prefersReducedMotion.matches);
      this.onPrev = () => this.goTo(this.currentIndex - 1);
      this.onNext = () => this.goTo(this.currentIndex + 1);
      this.onTransitionEnd = this.handleTransitionEnd.bind(this);
      this.onKeydown = this.handleKeydown.bind(this);
      this.onPointerDown = this.handlePointerDown.bind(this);
      this.onPointerMove = this.handlePointerMove.bind(this);
      this.onPointerUp = this.handlePointerUp.bind(this);
      this.onPointerCancel = this.handlePointerCancel.bind(this);
      this.onClickCapture = this.handleClickCapture.bind(this);
      this.onMouseEnter = () => {
        this.isHovering = true;
        this.stopAutoplay();
      };
      this.onMouseLeave = () => {
        this.isHovering = false;
        this.startAutoplay();
      };
      this.onFocusIn = () => {
        this.hasFocusWithin = true;
        this.stopAutoplay();
      };
      this.onFocusOut = (event) => {
        if (this.root.contains(event.relatedTarget)) {
          return;
        }

        this.hasFocusWithin = false;
        this.startAutoplay();
      };
      this.onMotionPreferenceChange = (event) => {
        this.root.dataset.reducedMotion = String(event.matches);
      };

      this.setupImages();
      this.buildTrack();
      this.bindEvents();
      this.observe();
      this.update(true);
      this.startAutoplay();
      this.emitChange('carousel:ready');
    }

    setupImages() {
      const images = this.root.querySelectorAll('img');
      images.forEach((image) => {
        const wrapper = image.closest('.media-skeleton');
        const markLoaded = () => wrapper?.classList.add('is-loaded');

        if (image.complete) {
          markLoaded();
        } else {
          image.addEventListener('load', markLoaded, { once: true });
          image.addEventListener('error', markLoaded, { once: true });
        }
      });
    }

    buildTrack(preserveIndex = this.currentIndex) {
      this.stopAutoplay();
      this.track.querySelectorAll('[data-carousel-clone="true"]').forEach((item) => item.remove());
      this.realItems = Array.from(this.track.querySelectorAll(`${SELECTORS.item}:not([data-carousel-clone="true"])`));
      this.realItems.forEach((item, index) => {
        item.dataset.carouselRealIndex = String(index);
        item.removeAttribute('aria-hidden');
      });

      this.visibleCount = this.getVisibleCount();
      this.cloneCount = Math.min(this.realCount, Math.max(1, this.visibleCount + 1));

      const leading = this.realItems.slice(-this.cloneCount).map((item) => this.createClone(item, 'prepend'));
      const trailing = this.realItems.slice(0, this.cloneCount).map((item) => this.createClone(item, 'append'));

      leading.reverse().forEach((clone) => this.track.prepend(clone));
      trailing.forEach((clone) => this.track.append(clone));

      this.allItems = Array.from(this.track.querySelectorAll(SELECTORS.item));
      this.currentIndex = this.normalizeIndex(preserveIndex);
      this.measure();
      this.jumpToLogicalIndex(this.currentIndex);
      this.updateVisibleSlides();
    }

    createClone(item, position) {
      const clone = item.cloneNode(true);
      clone.dataset.carouselClone = 'true';
      clone.dataset.carouselCloneSource = item.dataset.carouselRealIndex ?? '0';
      clone.dataset.carouselClonePosition = position;
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll(SELECTORS.focusables).forEach((node) => {
        node.setAttribute('tabindex', '-1');
        node.setAttribute('aria-hidden', 'true');
      });
      return clone;
    }

    bindEvents() {
      this.prevButton?.addEventListener('click', this.onPrev);
      this.nextButton?.addEventListener('click', this.onNext);
      this.track.addEventListener('transitionend', this.onTransitionEnd);
      this.viewport.addEventListener('keydown', this.onKeydown);
      this.viewport.addEventListener('pointerdown', this.onPointerDown);
      this.viewport.addEventListener('pointermove', this.onPointerMove);
      this.viewport.addEventListener('pointerup', this.onPointerUp);
      this.viewport.addEventListener('pointercancel', this.onPointerCancel);
      this.viewport.addEventListener('lostpointercapture', this.onPointerCancel);
      this.viewport.addEventListener('click', this.onClickCapture, true);
      this.root.addEventListener('mouseenter', this.onMouseEnter);
      this.root.addEventListener('mouseleave', this.onMouseLeave);
      this.root.addEventListener('focusin', this.onFocusIn);
      this.root.addEventListener('focusout', this.onFocusOut);
      this.prefersReducedMotion.addEventListener('change', this.onMotionPreferenceChange);
    }

    observe() {
      this.resizeObserver = new ResizeObserver(() => {
        window.cancelAnimationFrame(this.rafId);
        this.rafId = window.requestAnimationFrame(() => {
          this.buildTrack(this.currentIndex);
          this.update(false);
          this.startAutoplay();
        });
      });
      this.resizeObserver.observe(this.root);

      this.visibilityObserver = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          this.isVisible = Boolean(entry?.isIntersecting);
          if (this.isVisible) {
            this.startAutoplay();
          } else {
            this.stopAutoplay();
          }
        },
        { threshold: 0.35 }
      );
      this.visibilityObserver.observe(this.root);
    }

    getVisibleCount() {
      const firstItem = this.realItems[0];
      if (!firstItem) {
        return 1;
      }

      const viewportWidth = this.viewport.clientWidth;
      const itemWidth = firstItem.getBoundingClientRect().width || viewportWidth;
      const styles = window.getComputedStyle(this.track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      const span = itemWidth + gap;

      return Math.max(1, Math.floor((viewportWidth + gap * 0.25) / span));
    }

    measure() {
      const firstItem = this.track.querySelector(SELECTORS.item);
      if (!firstItem) {
        return;
      }

      const styles = window.getComputedStyle(this.track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      this.itemSpan = firstItem.getBoundingClientRect().width + gap;
    }

    normalizeIndex(index) {
      return ((index % this.realCount) + this.realCount) % this.realCount;
    }

    getTrackIndex(logicalIndex) {
      return logicalIndex + this.cloneCount;
    }

    jumpToLogicalIndex(index) {
      const trackIndex = this.getTrackIndex(index);
      this.setTrackPosition(trackIndex, false);
    }

    setTrackPosition(trackIndex, animate) {
      if (!this.itemSpan) {
        this.measure();
      }

      this.track.style.transition = animate && !this.prefersReducedMotion.matches
        ? `transform var(--transition-smooth)`
        : 'none';
      this.track.style.transform = `translate3d(${-trackIndex * this.itemSpan}px, 0, 0)`;
    }

    goTo(index, options = {}) {
      const { immediate = false, source = 'programmatic' } = options;
      this.currentIndex = this.normalizeIndex(index);
      this.pendingTeleport = !immediate;
      this.setTrackPosition(this.getTrackIndex(index), !immediate);
      this.update(immediate, source);
      this.startAutoplay();
    }

    update(isInitial = false, source = 'programmatic') {
      this.updateVisibleSlides();
      this.announce();
      this.emitChange('carousel:change', { isInitial, source });
    }

    updateVisibleSlides() {
      const start = this.currentIndex;
      const visibleIndices = new Set();
      for (let offset = 0; offset < this.visibleCount; offset += 1) {
        visibleIndices.add(this.normalizeIndex(start + offset));
      }

      this.allItems.forEach((item) => {
        const isClone = item.dataset.carouselClone === 'true';
        const realIndex = Number(item.dataset.carouselCloneSource ?? item.dataset.carouselRealIndex ?? -1);
        const isVisible = visibleIndices.has(realIndex);
        const focusables = item.querySelectorAll(SELECTORS.focusables);

        if (isClone) {
          item.setAttribute('aria-hidden', 'true');
          focusables.forEach((node) => node.setAttribute('tabindex', '-1'));
          return;
        }

        item.removeAttribute('aria-hidden');
        item.dataset.carouselVisible = String(isVisible);
        focusables.forEach((node) => {
          if (node.hasAttribute('data-orig-tabindex')) {
            node.removeAttribute('tabindex');
          }
          if (isVisible) {
            node.removeAttribute('tabindex');
          } else {
            node.setAttribute('tabindex', '-1');
          }
        });
      });
    }

    announce() {
      if (!this.status) {
        return;
      }

      const start = this.currentIndex + 1;
      const wrappedEnd = this.normalizeIndex(this.currentIndex + this.visibleCount - 1) + 1;
      const message = start <= wrappedEnd
        ? `Showing products ${start} to ${wrappedEnd} of ${this.realCount}`
        : `Showing products ${start} to ${this.realCount}, then ${wrappedEnd} of ${this.realCount}`;
      this.status.textContent = message;
    }

    emitChange(name, detail = {}) {
      this.root.dispatchEvent(
        new CustomEvent(name, {
          bubbles: true,
          detail: {
            currentIndex: this.currentIndex,
            visibleCount: this.visibleCount,
            total: this.realCount,
            ...detail
          }
        })
      );
    }

    handleTransitionEnd(event) {
      if (event.target !== this.track || event.propertyName !== 'transform') {
        return;
      }

      const rawIndex = this.currentIndex;
      if (!this.pendingTeleport) {
        return;
      }

      this.pendingTeleport = false;
      this.setTrackPosition(this.getTrackIndex(this.normalizeIndex(rawIndex)), false);
    }

    handleKeydown(event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.goTo(this.currentIndex - 1, { source: 'keyboard' });
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.goTo(this.currentIndex + 1, { source: 'keyboard' });
      }
    }

    handlePointerDown(event) {
      if (!event.isPrimary || event.button !== 0) {
        return;
      }

      this.dragState = {
        id: event.pointerId,
        startX: event.clientX,
        deltaX: 0,
        dragging: false,
        moved: false,
        baseOffset: -this.getTrackIndex(this.currentIndex) * this.itemSpan
      };

      this.stopAutoplay();
      this.viewport.classList.add('is-dragging');
      this.viewport.setPointerCapture(event.pointerId);
    }

    handlePointerMove(event) {
      if (!this.dragState || event.pointerId !== this.dragState.id) {
        return;
      }

      this.dragState.deltaX = event.clientX - this.dragState.startX;
      if (!this.dragState.dragging && Math.abs(this.dragState.deltaX) > 8) {
        this.dragState.dragging = true;
      }

      if (!this.dragState.dragging) {
        return;
      }

      this.dragState.moved = true;
      window.cancelAnimationFrame(this.rafId);
      this.rafId = window.requestAnimationFrame(() => {
        this.track.style.transition = 'none';
        this.track.style.transform = `translate3d(${this.dragState.baseOffset + this.dragState.deltaX}px, 0, 0)`;
      });
    }

    handlePointerUp(event) {
      if (!this.dragState || event.pointerId !== this.dragState.id) {
        return;
      }

      const { deltaX, dragging, moved } = this.dragState;
      this.viewport.classList.remove('is-dragging');
      if (this.viewport.hasPointerCapture(event.pointerId)) {
        this.viewport.releasePointerCapture(event.pointerId);
      }
      this.dragState = null;

      if (!dragging || !moved) {
        this.jumpToLogicalIndex(this.currentIndex);
        this.startAutoplay();
        return;
      }

      const threshold = Math.min(96, this.itemSpan * 0.18);
      if (Math.abs(deltaX) > 10) {
        this.suppressClick = true;
      }

      if (deltaX <= -threshold) {
        this.goTo(this.currentIndex + 1, { source: 'drag' });
      } else if (deltaX >= threshold) {
        this.goTo(this.currentIndex - 1, { source: 'drag' });
      } else {
        this.jumpToLogicalIndex(this.currentIndex);
        this.update(false, 'drag-cancel');
        this.startAutoplay();
      }
    }


    handleClickCapture(event) {
      if (!this.suppressClick) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      this.suppressClick = false;
    }

    handlePointerCancel() {
      if (!this.dragState) {
        return;
      }

      this.viewport.classList.remove('is-dragging');
      this.dragState = null;
      this.suppressClick = false;
      this.jumpToLogicalIndex(this.currentIndex);
      this.startAutoplay();
    }

    startAutoplay() {
      this.stopAutoplay();
      if (this.prefersReducedMotion.matches || this.isHovering || this.hasFocusWithin || !this.isVisible) {
        return;
      }

      this.autoplayId = window.setTimeout(() => {
        this.goTo(this.currentIndex + 1, { source: 'autoplay' });
      }, this.autoplayDelay);
    }

    stopAutoplay() {
      window.clearTimeout(this.autoplayId);
      this.autoplayId = 0;
    }
  }

  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach((carousel) => new InfiniteProductLoop(carousel));
})();
