(() => {
  class DraggableCardStack {
    constructor(root) {
      this.root = root;
      this.viewport = root.querySelector('[data-stack-viewport]');
      this.track = root.querySelector('[data-stack-track]');
      this.cards = Array.from(root.querySelectorAll('[data-card]'));
      this.status = root.querySelector('[data-stack-status]');
      this.completion = root.querySelector('[data-stack-completion]');
      this.restartButton = root.querySelector('[data-stack-restart]');
      this.prevButton = root.querySelector('[data-stack-prev]');
      this.nextButton = root.querySelector('[data-stack-next]');

      this.activeIndex = 0;
      this.dismissThreshold = 120;
      this.velocityThreshold = 0.45;
      this.width = 0;
      this.stackScale = 0.038;
      this.stackOffset = 1;
      this.drag = null;
      this.frame = 0;
      this.pointerId = null;
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.handlePointerDown = this.handlePointerDown.bind(this);
      this.handlePointerMove = this.handlePointerMove.bind(this);
      this.handlePointerUp = this.handlePointerUp.bind(this);
      this.handleNext = this.handleNext.bind(this);
      this.handlePrev = this.handlePrev.bind(this);
      this.handleRestart = this.handleRestart.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);

      this.setup();
    }

    setup() {
      this.resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        this.width = entry.contentRect.width;
        const rootStyles = getComputedStyle(document.documentElement);
        this.stackScale = parseFloat(rootStyles.getPropertyValue('--dcs-stack-scale')) || 0.038;
        this.stackOffset = parseFloat(rootStyles.getPropertyValue('--dcs-stack-offset')) || 1;
        this.dismissThreshold = Math.max(88, Math.min(160, this.width * 0.28));
      });
      this.resizeObserver.observe(this.viewport);

      this.track.addEventListener('pointerdown', this.handlePointerDown);
      this.track.addEventListener('pointermove', this.handlePointerMove);
      this.track.addEventListener('pointerup', this.handlePointerUp);
      this.track.addEventListener('pointercancel', this.handlePointerUp);
      this.track.addEventListener('lostpointercapture', this.handlePointerUp);

      this.root.addEventListener('keydown', this.handleKeydown);
      this.nextButton.addEventListener('click', this.handleNext);
      this.prevButton.addEventListener('click', this.handlePrev);
      this.restartButton.addEventListener('click', this.handleRestart);

      this.track.style.touchAction = 'pan-y';
      this.refresh();
      this.emit('carousel:ready', { activeIndex: this.activeIndex, total: this.cards.length, isEnd: false });
    }

    emit(name, detail) {
      this.root.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
    }

    handleKeydown(event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.handleNext();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.handlePrev();
      }
    }

    handleNext() {
      if (this.activeIndex >= this.cards.length) return;
      const card = this.cards[this.activeIndex];
      this.dismissCard(card, 1, true);
    }

    handlePrev() {
      if (this.activeIndex <= 0) return;
      this.activeIndex -= 1;
      this.resetCardPosition(this.cards[this.activeIndex]);
      this.refresh();
      this.announce();
      this.emit('carousel:change', {
        activeIndex: this.activeIndex,
        total: this.cards.length,
        direction: 'backward',
        isEnd: false,
      });
    }

    handleRestart() {
      this.activeIndex = 0;
      this.cards.forEach((card) => {
        card.classList.remove('is-exiting', 'is-dragging');
        card.hidden = false;
        this.resetCardPosition(card);
      });
      this.refresh();
      this.announce();
      this.emit('carousel:change', {
        activeIndex: this.activeIndex,
        total: this.cards.length,
        direction: 'restart',
        isEnd: false,
      });
    }

    handlePointerDown(event) {
      const activeCard = this.cards[this.activeIndex];
      if (!activeCard || event.button > 0) return;
      if (!activeCard.contains(event.target)) return;
      if (event.target.closest('a, button')) return;

      this.pointerId = event.pointerId;
      this.drag = {
        startX: event.clientX,
        startY: event.clientY,
        x: 0,
        y: 0,
        lastX: event.clientX,
        lastTime: performance.now(),
        velocityX: 0,
      };

      activeCard.classList.add('is-dragging');
      activeCard.setPointerCapture(event.pointerId);
    }

    handlePointerMove(event) {
      const activeCard = this.cards[this.activeIndex];
      if (!this.drag || !activeCard || event.pointerId !== this.pointerId) return;

      const now = performance.now();
      const deltaX = event.clientX - this.drag.startX;
      const deltaY = event.clientY - this.drag.startY;
      const dt = Math.max(16, now - this.drag.lastTime);

      this.drag.x = deltaX;
      this.drag.y = deltaY;
      this.drag.velocityX = (event.clientX - this.drag.lastX) / dt;
      this.drag.lastX = event.clientX;
      this.drag.lastTime = now;

      if (!this.frame) {
        this.frame = requestAnimationFrame(() => {
          this.frame = 0;
          this.paintDrag(activeCard);
        });
      }
    }

    handlePointerUp(event) {
      const activeCard = this.cards[this.activeIndex];
      if (!this.drag || event.pointerId !== this.pointerId || !activeCard) return;

      if (activeCard.hasPointerCapture(event.pointerId)) {
        activeCard.releasePointerCapture(event.pointerId);
      }

      const shouldDismiss =
        Math.abs(this.drag.x) > this.dismissThreshold || Math.abs(this.drag.velocityX) > this.velocityThreshold;

      const direction = this.drag.x >= 0 ? 1 : -1;
      activeCard.classList.remove('is-dragging');

      if (shouldDismiss) {
        this.dismissCard(activeCard, direction, false);
      } else {
        this.resetCardPosition(activeCard);
      }

      this.pointerId = null;
      this.drag = null;
    }

    paintDrag(card) {
      if (!this.drag) return;
      const rotation = this.clamp((this.drag.x / Math.max(this.width, 1)) * 18, -11, 11);
      const lift = this.clamp(this.drag.y * 0.18, -10, 18);
      const intent = Math.abs(this.drag.x) > 16 ? (this.drag.x < 0 ? 'left' : 'right') : '';
      const intentOpacity = Math.min(Math.abs(this.drag.x) / (this.dismissThreshold * 1.1), 1);

      card.dataset.intent = intent;
      card.style.setProperty('--intent-opacity', intentOpacity.toFixed(3));
      card.style.transform = `translate3d(${this.drag.x}px, ${lift}px, 0) rotate(${rotation}deg)`;
    }

    dismissCard(card, direction, fromControl) {
      const travel = Math.max(window.innerWidth, this.width || 0) * 1.15;
      const reducedOffset = direction > 0 ? travel : -travel;
      card.classList.add('is-exiting');
      card.dataset.intent = direction > 0 ? 'right' : 'left';
      card.style.setProperty('--intent-opacity', '1');
      card.style.transform = `translate3d(${reducedOffset}px, -18px, 0) rotate(${direction * 16}deg)`;

      if (!this.isReducedMotion && fromControl && navigator.vibrate) {
        navigator.vibrate(12);
      }

      window.setTimeout(() => {
        if (this.activeIndex < this.cards.length) {
          this.activeIndex += 1;
        }
        this.refresh();
        this.announce();
        this.emit('carousel:change', {
          activeIndex: this.activeIndex,
          total: this.cards.length,
          direction: direction > 0 ? 'forward' : 'dismiss-left',
          isEnd: this.activeIndex >= this.cards.length,
        });
      }, this.isReducedMotion ? 30 : 280);
    }

    refresh() {
      const isEnd = this.activeIndex >= this.cards.length;

      this.cards.forEach((card, index) => {
        const depth = Math.max(index - this.activeIndex, 0);
        const isPast = index < this.activeIndex;
        const isActive = index === this.activeIndex;
        const isPeek = index === this.activeIndex + 1;
        const isUnder = index > this.activeIndex + 1;
        const scale = 1 - depth * this.stackScale;
        const offset = depth * this.stackOffset;

        card.style.setProperty('--card-depth', String(depth));
        card.classList.toggle('is-active', isActive);
        card.classList.toggle('is-peek', isPeek);
        card.classList.toggle('is-under', isUnder);
        card.classList.toggle('is-past', isPast);
        card.hidden = false;

        if (isPast) {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          card.style.transform = 'translate3d(0, 0, 0) scale(0.98)';
          card.dataset.intent = '';
          return;
        }

        if (isEnd) {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          card.dataset.intent = '';
          return;
        }

        card.classList.remove('is-exiting');
        card.style.opacity = String(Math.max(1 - depth * 0.18, 0));
        card.style.filter = depth > 0 ? `saturate(${1 - depth * 0.1}) brightness(${1 - depth * 0.04})` : 'none';
        card.style.transform = `translate3d(0, ${offset}rem, 0) scale(${Math.max(scale, 0.88)})`;
        card.dataset.intent = '';
        card.style.setProperty('--intent-opacity', '0');
      });

      this.completion.hidden = !isEnd;
      this.prevButton.disabled = this.activeIndex <= 0;
      this.nextButton.disabled = isEnd;
    }

    announce() {
      if (this.activeIndex >= this.cards.length) {
        this.status.textContent = 'Stack complete. All cards have been reviewed.';
        return;
      }

      const card = this.cards[this.activeIndex];
      const title = card.querySelector('.dcs-card__tag')?.textContent?.trim() || `Card ${this.activeIndex + 1}`;
      this.status.textContent = `Showing card ${this.activeIndex + 1} of ${this.cards.length}: ${title}.`;
    }

    resetCardPosition(card) {
      if (!card) return;
      card.classList.remove('is-dragging');
      card.classList.remove('is-exiting');
      card.dataset.intent = '';
      card.style.setProperty('--intent-opacity', '0');
      card.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
    }

    clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }
  }

  document.querySelectorAll('[data-card-stack]').forEach((root) => {
    new DraggableCardStack(root);
  });
})();
