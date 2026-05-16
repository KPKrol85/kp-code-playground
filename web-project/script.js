(() => {
  const state = {
    products: [],
    filtered: [],
    inquiry: [],
    activeCategory: 'all',
    searchTerm: '',
  };

  const els = {
    menuToggle: document.querySelector('[data-menu-toggle]'),
    menu: document.querySelector('[data-menu]'),
    productsGrid: document.getElementById('products-grid'),
    categoryFilter: document.getElementById('category-filter'),
    searchInput: document.getElementById('search-input'),
    detail: document.getElementById('product-detail-content'),
    inquiryList: document.getElementById('inquiry-list'),
    inquiryEmpty: document.getElementById('inquiry-empty'),
  };

  const setupMenu = () => {
    if (!els.menuToggle || !els.menu) return;
    els.menuToggle.addEventListener('click', () => {
      const expanded = els.menuToggle.getAttribute('aria-expanded') === 'true';
      els.menuToggle.setAttribute('aria-expanded', String(!expanded));
      els.menu.dataset.open = String(!expanded);
    });

    els.menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        els.menuToggle.setAttribute('aria-expanded', 'false');
        els.menu.dataset.open = 'false';
      });
    });
  };

  const normalize = (value) => value.toLowerCase().trim();

  const matchesSearch = (product, term) => {
    if (!term) return true;
    const haystack = [product.name, product.category, ...(product.tags || [])].join(' ').toLowerCase();
    return haystack.includes(term);
  };

  const renderCategoryOptions = () => {
    const categories = [...new Set(state.products.map((p) => p.category))].sort();
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      els.categoryFilter.append(option);
    });
  };

  const renderProducts = () => {
    if (!els.productsGrid) return;
    els.productsGrid.innerHTML = '';

    if (!state.filtered.length) {
      els.productsGrid.innerHTML = '<p>Brak wyników dla wybranych filtrów.</p>';
      return;
    }

    const fragment = document.createDocumentFragment();

    state.filtered.forEach((product) => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <h4>${product.name}</h4>
        <p>${product.shortDescription}</p>
        <div class="product-card__meta">
          <span class="badge">${product.category}</span>
          <span class="badge">${product.priceLabel}</span>
          <span class="badge">${product.leadTime}</span>
        </div>
        <div class="product-card__actions">
          <button class="button button--ghost" type="button" data-detail-id="${product.id}">Szczegóły</button>
          <button class="button button--accent" type="button" data-add-id="${product.id}">Dodaj do zapytania</button>
        </div>
      `;
      fragment.append(card);
    });

    els.productsGrid.append(fragment);
  };

  const renderDetail = (product) => {
    if (!els.detail) return;
    els.detail.innerHTML = `
      <article>
        <h4>${product.name}</h4>
        <p>${product.longDescription}</p>
        <ul>
          <li><strong>Materiał:</strong> ${product.material}</li>
          <li><strong>Wykończenie:</strong> ${product.finish}</li>
          <li><strong>Termin:</strong> ${product.leadTime}</li>
          <li><strong>Zalecane zastosowanie:</strong> ${product.recommendedUse}</li>
        </ul>
      </article>
    `;
  };

  const renderInquiry = () => {
    els.inquiryList.innerHTML = '';
    const isEmpty = state.inquiry.length === 0;
    els.inquiryEmpty.hidden = !isEmpty;

    state.inquiry.forEach((itemId) => {
      const product = state.products.find((p) => p.id === itemId);
      if (!product) return;

      const li = document.createElement('li');
      li.className = 'inquiry-list__item';
      li.innerHTML = `
        <span>${product.name}</span>
        <button class="button button--small button--ghost" type="button" data-remove-id="${product.id}">Usuń</button>
      `;
      els.inquiryList.append(li);
    });
  };

  const applyFilters = () => {
    const term = normalize(state.searchTerm);
    state.filtered = state.products.filter((product) => {
      const categoryOk = state.activeCategory === 'all' || product.category === state.activeCategory;
      return categoryOk && matchesSearch(product, term);
    });
    renderProducts();
  };

  const addToInquiry = (productId) => {
    if (state.inquiry.includes(productId)) return;
    state.inquiry.push(productId);
    renderInquiry();
  };

  const removeFromInquiry = (productId) => {
    state.inquiry = state.inquiry.filter((id) => id !== productId);
    renderInquiry();
  };

  const bindEvents = () => {
    els.categoryFilter.addEventListener('change', (event) => {
      state.activeCategory = event.target.value;
      applyFilters();
    });

    els.searchInput.addEventListener('input', (event) => {
      state.searchTerm = event.target.value;
      applyFilters();
    });

    els.productsGrid.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const detailId = target.getAttribute('data-detail-id');
      if (detailId) {
        const product = state.products.find((p) => p.id === detailId);
        if (product) renderDetail(product);
      }

      const addId = target.getAttribute('data-add-id');
      if (addId) addToInquiry(addId);
    });

    els.inquiryList.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const removeId = target.getAttribute('data-remove-id');
      if (removeId) removeFromInquiry(removeId);
    });
  };

  const init = async () => {
    setupMenu();
    try {
      const response = await fetch('products.json');
      if (!response.ok) throw new Error('Nie udało się pobrać produktów.');
      state.products = await response.json();
      state.filtered = [...state.products];

      renderCategoryOptions();
      renderProducts();
      renderInquiry();
      bindEvents();
    } catch (error) {
      if (els.productsGrid) {
        els.productsGrid.innerHTML = `<p>Wystąpił błąd ładowania danych: ${error.message}</p>`;
      }
    }
  };

  init();
})();
