document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'kp_digital_vault_conversion_path_manager_v1';
  const statusValues = { Brak: 0, Słabo: 1, Dobrze: 2, 'Bardzo dobrze': 3 };
  const impactValues = { niski: 1, średni: 2, wysoki: 3, krytyczny: 4 };

  const config = [
    ['Pierwsze wrażenie', ['użytkownik od razu rozumie, czym zajmuje się firma','nagłówek mówi konkretnie, co jest oferowane','podtytuł wyjaśnia wartość bez pustych haseł','pierwszy ekran ma widoczne CTA','strona wygląda aktualnie i profesjonalnie']],
    ['Oferta i decyzja', ['usługi lub produkty są opisane jasno','klient widzi, dla kogo jest oferta','zakres współpracy jest zrozumiały','wyróżniki są konkretne, nie ogólnikowe','użytkownik wie, dlaczego ma wybrać tę firmę']],
    ['Zaufanie i dowody', ['są opinie lub referencje','są realizacje, portfolio lub przykłady','są konkretne efekty albo rezultaty','pokazany jest proces współpracy','strona redukuje obawy przed kontaktem']],
    ['Nawigacja i flow', ['użytkownik wie, gdzie kliknąć dalej','sekcje są ułożone logicznie','CTA pojawiają się w odpowiednich miejscach','najważniejsze informacje nie są ukryte','strona nie przeciąża użytkownika treścią']],
    ['Kontakt i zapytanie', ['kontakt jest łatwy do znalezienia','formularz jest prosty i zrozumiały','użytkownik wie, czego spodziewać się po wysłaniu zapytania','są alternatywne formy kontaktu','CTA końcowe domyka ścieżkę']],
    ['Mobile i szybkość decyzji', ['ścieżka jest czytelna na telefonie','CTA są wygodne do kliknięcia','kluczowe treści nie giną na mobile','strona nie wymaga nadmiernego przewijania bez celu','użytkownik szybko znajduje najważniejsze informacje']]
  ].map(([stageName, items], stageIndex) => ({
    id: `stage-${stageIndex}`,
    name: stageName,
    items: items.map((title, itemIndex) => ({
      id: `item-${stageIndex}-${itemIndex}`,
      title,
      explanation: 'Ocena tego punktu pokazuje, czy użytkownik płynnie przechodzi do kolejnego kroku decyzji.',
      why: 'Ten element wpływa na tempo decyzji i liczbę zapytań.',
      impact: ['średni','wysoki','wysoki','krytyczny','średni'][itemIndex] || 'średni',
      suggestion: 'Doprecyzuj komunikat i umieść go tam, gdzie użytkownik podejmuje decyzję.'
    }))
  }));

  const state = loadState() || { statuses: {}, notes: {}, updatedAt: null };
  const el = (id) => document.getElementById(id);

  function saveState(msg = 'Zmiany zapisane lokalnie') {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    el('save-indicator').textContent = `Ostatnia aktualizacja: ${new Date(state.updatedAt).toLocaleTimeString('pl-PL')}`;
    el('live-feedback').textContent = msg;
  }
  function loadState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; } }

  function getScoreLabel(score) {
    if (score <= 35) return ['Ścieżka konwersji jest słaba', 'Użytkownik może nie rozumieć, co zrobić dalej albo dlaczego warto wysłać zapytanie.'];
    if (score <= 60) return ['Ścieżka wymaga uporządkowania', 'Strona ma kilka dobrych elementów, ale prawdopodobnie traci część użytkowników po drodze.'];
    if (score <= 80) return ['Ścieżka jest czytelna', 'Strona prowadzi użytkownika do działania, ale nadal można wzmocnić kluczowe miejsca.'];
    return ['Ścieżka jest mocna', 'Strona jasno prowadzi od pierwszego wrażenia do decyzji i kontaktu.'];
  }

  function compute() {
    let actual = 0, max = 0;
    const stageScores = config.map(stage => {
      let sActual = 0, sMax = 0;
      stage.items.forEach(item => {
        const status = state.statuses[item.id] || 'Brak';
        const a = statusValues[status] * impactValues[item.impact];
        const m = 3 * impactValues[item.impact];
        sActual += a; sMax += m; actual += a; max += m;
      });
      return { stage: stage.name, score: Math.round((sActual / sMax) * 100) || 0 };
    });
    const total = Math.round((actual / max) * 100) || 0;
    return { total, stageScores };
  }

  function blockersAndPlan() {
    const blockers = []; const unlock = []; const organize = []; const optimize = [];
    config.forEach(stage => stage.items.forEach(item => {
      const status = state.statuses[item.id] || 'Brak';
      const val = statusValues[status];
      const imp = impactValues[item.impact];
      const row = `${item.title} (${stage.name}) — ${item.suggestion}`;
      if (val <= 1 && imp >= 3) blockers.push(`Bloker: ${item.title}.`);
      if (val === 0 && imp >= 3) unlock.push(row);
      else if (val === 1 && imp >= 3) organize.push(row);
      else if (val <= 1) optimize.push(row);
    }));
    return { blockers, unlock, organize, optimize };
  }

  function render() {
    const c = el('stages-container');
    c.innerHTML = '';
    const calc = compute();

    config.forEach(stage => {
      const stageScore = calc.stageScores.find(s => s.stage === stage.name)?.score ?? 0;
      const stageEl = document.createElement('article');
      stageEl.className = 'stage';
      stageEl.innerHTML = `<div class="stage__header"><h3>${stage.name}</h3><p class="stage__score">Wynik etapu: ${stageScore}/100</p></div>`;
      const items = document.createElement('div'); items.className = 'items';
      stage.items.forEach(item => {
        const status = state.statuses[item.id] || 'Brak';
        const card = document.createElement('article');
        card.className = `item ${status !== 'Brak' ? 'item--active' : ''}`;
        card.innerHTML = `
          <h4>${item.title}</h4>
          <p>${item.explanation}</p>
          <p><strong>Dlaczego to ważne:</strong> ${item.why}</p>
          <div class="item__meta"><span class="pill pill--impact-${item.impact}">Wpływ: ${item.impact}</span><span class="pill">Sugestia: ${item.suggestion}</span></div>
          <div class="controls">
            <label for="status-${item.id}">Status</label>
            <select id="status-${item.id}" data-kind="status" data-id="${item.id}">
              ${Object.keys(statusValues).map(opt => `<option ${opt === status ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
            <label for="note-${item.id}">Notatka (opcjonalna)</label>
            <textarea id="note-${item.id}" data-kind="note" data-id="${item.id}" placeholder="Co poprawić i jak?">${state.notes[item.id] || ''}</textarea>
          </div>`;
        items.appendChild(card);
      });
      stageEl.appendChild(items); c.appendChild(stageEl);
    });

    const [label, description] = getScoreLabel(calc.total);
    const strongest = [...calc.stageScores].sort((a, b) => b.score - a.score)[0];
    const weakest = [...calc.stageScores].sort((a, b) => a.score - b.score)[0];
    const plan = blockersAndPlan();

    el('metric-score').textContent = `${calc.total}/100`;
    el('metric-strongest').textContent = `${strongest?.stage || '—'} (${strongest?.score || 0}/100)`;
    el('metric-weakest').textContent = `${weakest?.stage || '—'} (${weakest?.score || 0}/100)`;
    el('metric-blockers').textContent = String(plan.blockers.length);
    el('metric-status').textContent = label;

    renderList('blockers-list', plan.blockers, 'Brak krytycznych blokerów na ten moment.');
    renderList('plan-unlock', plan.unlock, 'Brak elementów do pilnego odblokowania.');
    renderList('plan-organize', plan.organize, 'Brak elementów do uporządkowania.');
    renderList('plan-optimize', plan.optimize, 'Brak elementów do optymalizacji.');

    el('report-status').textContent = `Wynik: ${calc.total}/100 • ${label}`;
    el('report-stages').innerHTML = calc.stageScores.map(s => `<p>${s.stage}: ${s.score}/100</p>`).join('');
    el('report-summary').innerHTML = `<p>${description}</p><p>Najmocniejszy etap: ${strongest?.stage || '—'}. Najsłabszy etap: ${weakest?.stage || '—'}.</p>`;
  }

  function renderList(id, entries, emptyText) {
    const node = el(id);
    node.innerHTML = entries.length ? entries.map(e => `<li>${e}</li>`).join('') : `<li>${emptyText}</li>`;
  }

  document.body.addEventListener('change', (event) => {
    const t = event.target;
    if (t.matches('[data-kind="status"]')) {
      state.statuses[t.dataset.id] = t.value;
      saveState();
      render();
    }
  });
  document.body.addEventListener('input', (event) => {
    const t = event.target;
    if (t.matches('[data-kind="note"]')) {
      state.notes[t.dataset.id] = t.value;
      saveState('Notatka zapisana lokalnie');
    }
  });

  document.querySelector('[data-action="reset"]').addEventListener('click', () => {
    state.statuses = {}; state.notes = {}; saveState('Dane zresetowane'); render();
  });
  document.querySelector('[data-action="print"]').addEventListener('click', () => window.print());
  document.querySelector('[data-action="copy"]').addEventListener('click', async () => {
    const { total, stageScores } = compute();
    const [label] = getScoreLabel(total);
    const p = blockersAndPlan();
    const notes = Object.values(state.notes).filter(Boolean);
    const text = `Manager ścieżki konwersji na stronie\nConversion Path Score: ${total}/100\nStatus: ${label}\n\nEtapy:\n${stageScores.map(s => `- ${s.stage}: ${s.score}/100`).join('\n')}\n\nGłówne blokery:\n${p.blockers.map(b => `- ${b}`).join('\n') || '- Brak'}\n\nNAJPIERW ODBLOKUJ:\n${p.unlock.map(a => `- ${a}`).join('\n') || '- Brak'}\n\nNASTĘPNIE UPORZĄDKUJ:\n${p.organize.map(a => `- ${a}`).join('\n') || '- Brak'}\n\nPÓŹNIEJ ZOPTYMALIZUJ:\n${p.optimize.map(a => `- ${a}`).join('\n') || '- Brak'}\n\nNotatki:\n${notes.map(n => `- ${n}`).join('\n') || '- Brak'}\n\nTo narzędzie pomaga uporządkować ścieżkę konwersji. Nie zastępuje pełnego audytu UX, SEO ani analityki zachowania użytkowników.`;
    await navigator.clipboard.writeText(text);
    el('live-feedback').textContent = 'Raport skopiowany do schowka';
  });

  if (state.updatedAt) el('save-indicator').textContent = `Ostatnia aktualizacja: ${new Date(state.updatedAt).toLocaleTimeString('pl-PL')}`;
  render();
});
