import { qs } from '../core/dom.js';
import { selectUiPreferences } from '../core/selectors.js';
import { store } from '../core/store.js';
import { button } from '../components/button.js';
import { openConfirmDialog } from '../components/confirmDialog.js';
import { pageHeader } from '../components/pageHeader.js';
import { showToast } from '../components/toast.js';

export const renderSettingsView = (container) => {
  const ui = selectUiPreferences(store.getState());

  container.innerHTML = `
    <main id="main" class="container">
      ${pageHeader({ title: 'Ustawienia', description: 'Zarządzaj profilem, preferencjami i narzędziami danych.' })}

      <section class="settings-grid">
        <div class="card">
          <h2 class="card__title">Profil</h2>
          <div class="list">
            <div><strong>Imię i nazwisko:</strong> Alicja Maj</div>
            <div><strong>Rola:</strong> Owner</div>
            <div><strong>Email:</strong> alicja@flowdesk.pl</div>
          </div>
          <p class="input__helper">To jest mock danych profilu (bez backendu).</p>
        </div>

        <div class="card">
          <h2 class="card__title">Preferencje</h2>
          <div class="list">
            <label class="list__item">
              <span>Motyw ciemny</span>
              <input type="checkbox" id="themeSwitch" ${ui.theme === 'dark' ? 'checked' : ''} />
            </label>
            <label class="list__item">
              <span>Ogranicz animacje</span>
              <input type="checkbox" id="motionSwitch" ${ui.reducedMotion ? 'checked' : ''} />
            </label>
          </div>
        </div>
      </section>

      <section class="card">
        <h2 class="card__title">Narzędzia danych</h2>
        <div class="list">
          ${button({ label: 'Eksportuj JSON', id: 'exportData', variant: 'secondary', iconName: 'export' })}
          ${button({ label: 'Reset demo danych', id: 'resetData', variant: 'ghost', iconName: 'reset' })}
        </div>
        <p class="input__helper">Reset przywróci dane demo zapisane w localStorage.</p>
      </section>
    </main>
  `;

  qs('#themeSwitch', container)?.addEventListener('change', (event) => {
    const result = store.actions.updateUiPreferences({ theme: event.target.checked ? 'dark' : 'light' });
    if (!result.ok) {
      showToast('Nie udało się zaktualizować motywu.');
      return;
    }
    showToast('Zaktualizowano motyw.');
  });

  qs('#motionSwitch', container)?.addEventListener('change', (event) => {
    const result = store.actions.updateUiPreferences({ reducedMotion: event.target.checked });
    if (!result.ok) {
      showToast('Nie udało się zaktualizować preferencji animacji.');
      return;
    }
    showToast('Zaktualizowano preferencje animacji.');
  });

  qs('#exportData', container)?.addEventListener('click', () => {
    const result = store.actions.exportState();
    if (!result.ok) {
      showToast('Nie udało się wyeksportować danych.');
      return;
    }
    const blob = new Blob([result.data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'flowdesk-data.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Eksport danych gotowy.');
  });

  qs('#resetData', container)?.addEventListener('click', () => {
    openConfirmDialog({
      title: 'Reset demo danych',
      message: 'Czy na pewno przywrócić dane demo?',
      confirmLabel: 'Resetuj',
      destructive: true,
      onConfirm: () => {
        const result = store.actions.resetDemoData();
        if (!result.ok) {
          showToast('Nie udało się przywrócić danych demo.');
          return;
        }
        showToast('Dane demo zostały przywrócone.');
        renderSettingsView(container);
      }
    });
  });
};
