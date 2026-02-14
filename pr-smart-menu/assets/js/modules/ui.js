import { relativeTime } from './utils.js';

export function createFrequentMarkup(container) {
  const section = document.createElement('section');
  section.className = 'smart-menu__frequent';
  section.setAttribute('aria-label', 'Frequently used links');
  section.innerHTML = `
    <h2 class="smart-menu__section-title">Frequently used</h2>
    <ul class="smart-menu__frequent-list" data-frequent-list></ul>
  `;
  container.before(section);
  return section;
}

export function renderMenuList(list, items) {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'smart-menu__item';
    const link = document.createElement('a');
    link.className = 'smart-menu__item-link';
    link.href = item.href;
    link.textContent = item.label;
    link.dataset.menuId = item.id;
    if (item.isPinned) {
      const badge = document.createElement('span');
      badge.className = 'smart-menu__badge';
      badge.textContent = 'Pinned';
      link.appendChild(badge);
    }
    li.appendChild(link);
    fragment.appendChild(li);
  });
  list.replaceChildren(fragment);
}

export function renderFrequentList(list, items) {
  if (!items.length) {
    list.innerHTML = '<li class="smart-menu__item">No data yet. Use menu links to start learning.</li>';
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'smart-menu__item';
    li.innerHTML = `<a class="smart-menu__frequent-link" href="${item.href}" data-menu-id="${item.id}">${item.label}</a>`;
    fragment.appendChild(li);
  });
  list.replaceChildren(fragment);
}

export function renderExplain(listNode, items) {
  if (!items.length) {
    listNode.innerHTML = '<li>Insights will appear after you use the navigation.</li>';
    return;
  }

  listNode.innerHTML = items
    .map(
      (item) =>
        `<li><strong>${item.label}</strong>: Used ${item.clickCount} times • last used ${relativeTime(item.lastUsedAt)}</li>`
    )
    .join('');
}

export function readFileAsJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result));
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
