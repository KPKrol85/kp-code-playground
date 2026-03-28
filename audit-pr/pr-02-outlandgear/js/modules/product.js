import { CONFIG } from "../config.js";
import { qs, qsa, on } from "./dom.js";
import { formatCurrency } from "../utils.js";
import { addToCart, updateCartCount } from "./cart.js";
import { showToast } from "./toast.js";
import { createFallbackNotice } from "./fallback.js";

const SITE_NAME = "Outland Gear";
const getMainImageAlt = (productName, index = 0) => `Zdjęcie ${index + 1} produktu ${productName}`;
const getThumbLabel = (productName, index = 0) => `Pokaż zdjęcie ${index + 1} produktu ${productName}`;

const setProductMetadata = (product, slug) => {
  if (!product || !slug) return;

  const titleParts = [product.name, product.category, SITE_NAME];
  document.title = titleParts.filter(Boolean).join(" | ");

  const description = [product.shortDescription, product.subcategory]
    .filter(Boolean)
    .join(" ");
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }

  const canonicalUrl = new URL("produkt.html", window.location.origin);
  canonicalUrl.searchParams.set("slug", slug);

  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute("href", canonicalUrl.href);
  }
};

const renderProduct = (product) => {
  const root = qs(CONFIG.selectors.productRoot);
  if (!root) return;

  const title = qs("[data-product-title]", root);
  const price = qs("[data-product-price]", root);
  const oldPrice = qs("[data-product-old-price]", root);
  const rating = qs("[data-product-rating]", root);
  const stock = qs("[data-product-stock]", root);
  const description = qs("[data-product-description]", root);
  const highlights = qs("[data-product-highlights]", root);
  const specs = qs("[data-product-specs]", root);

  if (title) title.textContent = product.name || "";
  if (price) price.textContent = formatCurrency(product.price, product.currency);
  if (oldPrice) {
    if (product.oldPrice) {
      oldPrice.textContent = formatCurrency(product.oldPrice, product.currency);
    } else {
      oldPrice.textContent = "";
    }
  }
  if (rating) rating.textContent = `Ocena ${product.rating} • ${product.reviewsCount} opinii`;
  if (stock) stock.textContent = product.stockStatus;
  if (description) description.textContent = product.shortDescription || "";

  if (highlights) {
    highlights.innerHTML = "";
    const items = Array.isArray(product.highlights) ? product.highlights : [];
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      highlights.appendChild(li);
    });
  }

  if (specs) {
    specs.innerHTML = "";
    Object.entries(product.specs || {}).forEach(([label, value]) => {
      const row = document.createElement("tr");
      const th = document.createElement("th");
      th.scope = "row";
      th.textContent = label;
      const td = document.createElement("td");
      td.textContent = value;
      row.append(th, td);
      specs.appendChild(row);
    });
  }

  const mainImage = qs("[data-product-main]", root);
  const thumbs = qsa("[data-product-thumb]", root);
  const setActiveThumb = (activeIndex) => {
    thumbs.forEach((thumb, index) => {
      thumb.setAttribute("aria-pressed", index === activeIndex ? "true" : "false");
    });
  };

  if (mainImage) {
    mainImage.src = images[0] || "";
    mainImage.alt = product.name || "";
  }

  setActiveThumb(0);

  thumbs.forEach((thumb, index) => {
    const img = qs("img", thumb);
    if (img && images[index]) {
      img.src = images[index];
      img.alt = `${product.name} ${index + 1}`;
    }

    thumb.setAttribute("aria-label", `Pokaż zdjęcie ${index + 1} produktu ${product.name}`);

    on(thumb, "click", () => {
      if (mainImage && product.images[index]) {
        mainImage.src = product.images[index];
        mainImage.alt = getMainImageAlt(product.name, index);
      }
      setActiveThumb(index);
    });
  });

  const addBtn = qs("[data-add-product]", root);
  const qtyInput = qs("[data-qty-input]", root);
  on(addBtn, "click", () => {
    const qty = qtyInput ? Number(qtyInput.value) : 1;
    const saved = addToCart(product, qty);
    if (!saved) return;

    updateCartCount();
    showToast(`Dodano „${product.name}” do koszyka.`, { type: "success" });
  });
};

const renderRelated = (products, current) => {
  const grid = qs(CONFIG.selectors.relatedGrid);
  if (!grid) return;
  grid.innerHTML = "";
  const related = products
    .filter((item) => item.category === current.category && item.id !== current.id)
    .slice(0, 3);
  related.forEach((product) => {
    const article = document.createElement("article");
    article.className = "card product-card";
    const media = document.createElement("div");
    media.className = "product-card__media";
    const img = document.createElement("img");
    img.src = product.images[0];
    img.alt = product.name;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 320;
    img.height = 220;
    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "product-card__content";
    const title = document.createElement("h3");
    title.className = "product-card__title";
    title.textContent = product.name;

    const price = document.createElement("div");
    price.className = "product-card__price";
    price.textContent = formatCurrency(product.price, product.currency);

    const meta = document.createElement("p");
    meta.className = "product-card__meta";
    meta.textContent = `Ocena ${product.rating} • ${product.reviewsCount} opinii`;

    const actions = document.createElement("div");
    actions.className = "product-card__actions";

    const link = document.createElement("a");
    link.href = `produkt.html?slug=${product.slug}`;
    link.className = "btn btn--outline btn--small";
    link.textContent = "Zobacz";

    actions.append(link);
    body.append(title, price, meta, actions);
    article.append(media, body);
    grid.appendChild(article);
  });
};


const renderProductLoadError = (root) => {
  if (!root) return;

  root.innerHTML = "";
  const section = document.createElement("section");
  section.className = "section";
  const container = document.createElement("div");
  container.className = "container";

  const fallback = createFallbackNotice({
    message: "Nie udało się załadować produktu. Odśwież stronę i spróbuj ponownie.",
    actionLabel: "Odśwież stronę",
    onAction: () => window.location.reload(),
  });

  container.appendChild(fallback);
  section.appendChild(container);
  root.appendChild(section);
};

export const initProduct = async () => {
  const root = qs(CONFIG.selectors.productRoot);
  if (!root) return;
  let products = [];
  try {
    products = await fetchJson("data/products.json");
  } catch (error) {
    console.error("Product data error", error);
    renderProductLoadError(root);
    return;
  }

  const slug = new URLSearchParams(window.location.search).get("slug");
  const normalizedSlug = slug?.trim() || "";
  const matchedProduct = findProductBySlug(products, normalizedSlug);
  const product = matchedProduct || products[0];

  if (matchedProduct) {
    setProductMetadata(matchedProduct, normalizedSlug);
  }

  renderProduct(product);
  renderRelated(products, product);

  if (!matchedProduct && normalizedSlug) {
    setUiState(stateRegion, {
      type: "info",
      title: "Nie znaleźliśmy tego produktu",
      message: "Wyświetlamy najbliższą dostępną propozycję.",
    });
    return;
  }

  clearUiState(stateRegion);
};
