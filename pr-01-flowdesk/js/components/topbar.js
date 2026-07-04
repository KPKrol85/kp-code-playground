import { auth } from '../core/auth.js';

export const renderTopbar = () => {
  const session = auth.getSession();
  return `
    <header class="topbar">
      <div class="topbar__inner">
        <div class="topbar__left">
          <button class="btn btn--icon" id="drawerToggle" aria-label="Otwórz menu" aria-expanded="false">☰</button>
        </div>
        <div class="search" role="search">
          <label class="visually-hidden" for="searchInput">Szukaj</label>
          <input class="search__input" id="searchInput" type="search" placeholder="Szukaj klientów, zleceń..." />
        </div>
        <div class="topbar__actions">
          <button class="btn btn--secondary" id="quickAdd">Nowy</button>
          <button class="btn btn--icon" id="themeToggle" aria-label="Zmień motyw">🌓</button>
          <div class="user-menu">
            <button class="btn btn--icon" id="userMenuBtn" aria-label="Otwórz menu użytkownika" aria-haspopup="true" aria-expanded="false">
              <span class="avatar" aria-hidden="true"></span>
            </button>
            <div class="user-menu__panel" id="userMenuPanel" role="menu">
              <p role="none">${session?.name || 'Użytkownik'} · ${session?.role || 'Demo'}</p>
              <button class="btn btn--ghost" id="logoutBtn" role="menuitem">Wyloguj</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
};
