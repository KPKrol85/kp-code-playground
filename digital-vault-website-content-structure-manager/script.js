document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "kpcdv-content-structure-manager";
  const STATUS = { brak: 0, szkic: 1, gotowe: 2, mocne: 3 };
  const IMPACT = { niski: 1, średni: 2, wysoki: 3, krytyczny: 4 };

  const groups = [
    ["fundament", "Fundament strony", [["jasny nagłówek główny","konwersja","krytyczny"],["krótki opis wartości","tekst","wysoki"],["konkretna informacja, dla kogo jest oferta","tekst","krytyczny"],["główne CTA","konwersja","krytyczny"],["szybkie potwierdzenie wiarygodności","zaufanie","wysoki"]]],
    ["oferta", "Oferta i usługi", [["lista usług lub produktów","struktura","krytyczny"],["opis zakresu każdej usługi","tekst","wysoki"],["korzyści opisane konkretnie","tekst","wysoki"],["informacje o procesie współpracy","struktura","średni"],["podstawowe pakiety lub poziomy usługi","konwersja","średni"]]],
    ["zaufanie", "Dowody i zaufanie", [["opinie klientów","zaufanie","wysoki"],["realizacje lub portfolio","zaufanie","krytyczny"],["case studies albo przykłady","zaufanie","średni"],["liczby, efekty lub rezultaty","zaufanie","wysoki"],["sekcja o firmie/osobie","tekst","średni"]]],
    ["decyzja", "Decyzja i konwersja", [["CTA po ważnych sekcjach","konwersja","wysoki"],["jasne informacje kontaktowe","konwersja","krytyczny"],["krótka sekcja FAQ","tekst","średni"],["opis kolejnego kroku po kontakcie","konwersja","wysoki"],["redukcja obaw klienta","zaufanie","wysoki"]]],
    ["seo", "SEO i struktura informacji", [["logiczne nagłówki H1/H2/H3","SEO","wysoki"],["frazy lokalne lub branżowe","SEO","średni"],["meta title i meta description","SEO","średni"],["treści dla osobnych podstron usług","SEO","wysoki"],["linkowanie wewnętrzne","SEO","średni"]]],
    ["formalności", "Formalności i gotowość publikacji", [["polityka prywatności","formalność","krytyczny"],["regulamin lub informacje prawne","formalność","średni"],["zgody przy formularzu","formalność","krytyczny"],["poprawne dane firmy","formalność","wysoki"],["finalna korekta językowa i merytoryczna","tekst","wysoki"]]],
  ];

  const app = { blocks: {} };
  const mapEl = document.getElementById("contentMap");
  const liveRegion = document.getElementById("liveRegion");

  const load = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) app.blocks = JSON.parse(saved);
  };
  const save = (msg = "Zmiany zapisane lokalnie") => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(app.blocks));
    document.getElementById("saveStatus").textContent = msg;
    document.getElementById("lastUpdate").textContent = `Ostatnia aktualizacja: ${new Date().toLocaleTimeString("pl-PL")}`;
  };
  const keyFor = (gid, title) => `${gid}::${title}`;

  function renderMap() {
    mapEl.innerHTML = "";
    groups.forEach(([gid, gname, blocks]) => {
      const group = document.createElement("article");
      group.className = "group-card";
      group.innerHTML = `<div class="group-header"><h2>${gname}</h2><p id="score-${gid}">0%</p></div><div class="block-list"></div>`;
      const list = group.querySelector(".block-list");
      blocks.forEach(([title, type, impact]) => {
        const k = keyFor(gid, title);
        app.blocks[k] ||= { status: "brak", note: "" };
        const card = document.createElement("article");
        card.className = "block-card";
        card.dataset.key = k;
        card.dataset.group = gname;
        card.dataset.impact = impact;
        card.dataset.title = title;
        card.innerHTML = `
          <div class="block-head"><h3>${title}</h3><span class="chip">${type}</span></div>
          <p class="meta">Wpływ: ${impact} · Dlaczego ważne: porządkuje decyzję i wdrożenie.</p>
          <p class="meta">Wskazówka: napisz wersję konkretną i mierzalną.</p>
          <div class="block-controls">
            <label>Status
              <select data-role="status">
                <option value="brak">Brak</option>
                <option value="szkic">Szkic</option>
                <option value="gotowe">Gotowe</option>
                <option value="mocne">Mocne</option>
              </select>
            </label>
            <label>Notatka do bloku
              <textarea data-role="note" placeholder="Co dopisać, uprościć lub przenieść?"></textarea>
            </label>
          </div>`;
        card.querySelector("select").value = app.blocks[k].status;
        card.querySelector("textarea").value = app.blocks[k].note;
        list.appendChild(card);
      });
      mapEl.appendChild(group);
    });
  }

  function analyze() {
    let actual = 0, max = 0;
    const perGroup = [];
    const missingCritical = [], weakDraft = [];
    groups.forEach(([gid, gname, blocks]) => {
      let ga = 0, gm = 0;
      blocks.forEach(([title, , impact]) => {
        const b = app.blocks[keyFor(gid, title)];
        const w = IMPACT[impact];
        ga += STATUS[b.status] * w; gm += 3 * w;
        if (b.status === "brak" && (impact === "krytyczny" || impact === "wysoki")) missingCritical.push({ title, gname, impact });
        if (b.status === "szkic" && (impact === "krytyczny" || impact === "wysoki")) weakDraft.push({ title, gname, impact });
      });
      actual += ga; max += gm;
      perGroup.push({ gid, gname, score: Math.round((ga / gm) * 100) || 0 });
    });
    const score = Math.round((actual / max) * 100) || 0;
    return { score, perGroup, missingCritical, weakDraft };
  }

  function readiness(score) {
    if (score <= 35) return ["Treści nie są gotowe", "Brakuje ważnych bloków, które pomagają użytkownikowi zrozumieć ofertę i podjąć decyzję."];
    if (score <= 60) return ["Treści wymagają uporządkowania", "Część materiałów istnieje, ale struktura może być zbyt słaba, aby dobrze wspierać stronę."];
    if (score <= 80) return ["Treści mają solidną bazę", "Struktura jest czytelna, ale warto dopracować najważniejsze miejsca przed publikacją."];
    return ["Treści są dobrze przygotowane", "Strona ma mocną strukturę treści i może lepiej wspierać projekt, SEO oraz decyzję użytkownika."];
  }

  function refresh() {
    const a = analyze();
    const [label, explain] = readiness(a.score);
    document.getElementById("mainScore").textContent = `${a.score}/100`;
    document.getElementById("globalProgress").value = a.score;
    document.getElementById("readinessLabel").textContent = label;
    document.getElementById("criticalCount").textContent = a.missingCritical.length;
    const strongest = [...a.perGroup].sort((x,y)=>y.score-x.score)[0];
    const weakest = [...a.perGroup].sort((x,y)=>x.score-y.score)[0];
    document.getElementById("strongestGroup").textContent = `${strongest.gname} (${strongest.score}%)`;
    document.getElementById("weakestGroup").textContent = `${weakest.gname} (${weakest.score}%)`;
    document.getElementById("groupSummary").innerHTML = a.perGroup.map(g=>`<div class="group-summary__item"><span>${g.gname}</span><strong>${g.score}%</strong></div>`).join("");
    a.perGroup.forEach(g => { const el = document.getElementById(`score-${g.gid}`); if (el) el.textContent = `${g.score}%`; });

    const insights = [];
    if (a.missingCritical.length >= 4) insights.push("Najpierw dopracuj pierwszy ekran strony — bez jasnego komunikatu użytkownik może nie zrozumieć oferty.");
    if (weakInGroup("oferta", "szkic")) insights.push("Oferta wymaga konkretniejszego opisu zakresu, aby klient wiedział, co właściwie kupuje lub zleca.");
    if (weakInGroup("zaufanie", "brak")) insights.push("Brakuje dowodów, które pomagają zmniejszyć ryzyko decyzji po stronie klienta.");
    if (weakInGroup("seo", "brak") || weakInGroup("seo", "szkic")) insights.push("Struktura treści może ograniczać widoczność strony, szczególnie jeśli usługi nie mają własnych jasnych sekcji.");
    if (weakInGroup("formalności", "brak")) insights.push("Przed publikacją uzupełnij podstawy formalne, zwłaszcza przy formularzu kontaktowym.");
    if (a.score > 80) insights.push("Treść ma dobrą bazę. Kolejnym krokiem może być dopracowanie języka, mikrocopy i linkowania między sekcjami.");
    insights.push(explain);
    document.getElementById("insightsList").innerHTML = insights.slice(0,8).map(i=>`<li>${i}</li>`).join("");

    const priority = buildPlan(a);
    document.getElementById("planNow").innerHTML = priority.now.map(x=>`<li><strong>${x.title}</strong> (${x.group}) — ${x.fix}</li>`).join("") || "<li>Brak pilnych działań.</li>";
    document.getElementById("planNext").innerHTML = priority.next.map(x=>`<li><strong>${x.title}</strong> (${x.group}) — ${x.fix}</li>`).join("") || "<li>Brak działań.</li>";
    document.getElementById("planLater").innerHTML = priority.later.map(x=>`<li><strong>${x.title}</strong> (${x.group}) — ${x.fix}</li>`).join("") || "<li>Brak działań.</li>";

    document.getElementById("reportText").textContent = generateReport(a, label, insights, priority, strongest, weakest);
  }

  function weakInGroup(groupId, status){
    const group = groups.find(g => g[0] === groupId);
    return group[2].some(([title]) => app.blocks[keyFor(groupId, title)].status === status);
  }

  function buildPlan(a){
    const mapAction = (arr, fix) => arr.map(i => ({ title: i.title, group: i.gname, fix }));
    const now = mapAction(a.missingCritical, "Uzupełnij pełną wersję bloku przed publikacją.");
    const next = mapAction(a.weakDraft, "Przepisz szkic na wersję konkretną i gotową do wdrożenia.");
    const later = a.perGroup.filter(g=>g.score<70).map(g=>({title:`Rozbuduj obszar: ${g.gname}`,group:g.gname,fix:"Dodaj przykłady, konkret i lepsze połączenia między sekcjami."}));
    return { now: now.slice(0,8), next: next.slice(0,8), later: later.slice(0,8) };
  }

  function generateReport(a, label, insights, priority, strongest, weakest){
    const notes = Object.entries(app.blocks).filter(([,v])=>v.note.trim()).map(([k,v])=>`- ${k.split("::")[1]}: ${v.note.trim()}`);
    return `Manager struktury treści strony\nContent Structure Score: ${a.score}/100\nStatus: ${label}\n\nNajmocniejszy obszar:\n- ${strongest.gname} (${strongest.score}%)\n\nNajsłabszy obszar:\n- ${weakest.gname} (${weakest.score}%)\n\nBraki krytyczne:\n${a.missingCritical.map(i=>`- ${i.title} (${i.gname})`).join("\n") || "- Brak"}\n\nSzkice do dopracowania:\n${a.weakDraft.map(i=>`- ${i.title} (${i.gname})`).join("\n") || "- Brak"}\n\nPriorytety:\nNAJPIERW UZUPEŁNIJ:\n${priority.now.map(i=>`- ${i.title} (${i.group})`).join("\n") || "- Brak"}\n\nNASTĘPNIE DOPRACUJ:\n${priority.next.map(i=>`- ${i.title} (${i.group})`).join("\n") || "- Brak"}\n\nPÓŹNIEJ ROZBUDUJ:\n${priority.later.map(i=>`- ${i.title}`).join("\n") || "- Brak"}\n\nWnioski:\n${insights.map(i=>`- ${i}`).join("\n")}\n\nNotatki:\n${notes.join("\n") || "- Brak"}\n\nNastępne kroki:\n- Uzupełnij braki krytyczne i wysokiego wpływu.\n- Dopracuj szkice tak, aby każdy blok nadawał się do wdrożenia.\n- Po aktualizacji wykonaj ponowną ocenę.\n\nTo narzędzie pomaga uporządkować strukturę treści przed wdrożeniem strony. Nie zastępuje pełnej strategii komunikacji, audytu SEO ani redakcji copywriterskiej.`;
  }

  mapEl.addEventListener("input", (e) => {
    const card = e.target.closest(".block-card");
    if (!card) return;
    const state = app.blocks[card.dataset.key];
    if (e.target.dataset.role === "status") state.status = e.target.value;
    if (e.target.dataset.role === "note") state.note = e.target.value;
    save(); refresh();
  });

  document.getElementById("resetButton").addEventListener("click", () => {
    app.blocks = {};
    save("Dane wyzerowane lokalnie");
    renderMap(); refresh();
    liveRegion.textContent = "Wyczyszczono wszystkie dane";
  });
  document.getElementById("printButton").addEventListener("click", () => window.print());
  document.getElementById("copyButton").addEventListener("click", async () => {
    await navigator.clipboard.writeText(document.getElementById("reportText").textContent);
    liveRegion.textContent = "Raport skopiowany do schowka";
    save("Raport skopiowany i dane zapisane");
  });

  load(); renderMap(); refresh(); save();
});
