(() => {
  const form = document.querySelector("#risk-form");
  const checkboxes = Array.from(
    document.querySelectorAll('#red-flag-list input[type="checkbox"]')
  );
  const totalScoreEl = document.querySelector("#total-score");
  const selectedCountEl = document.querySelector("#selected-count");
  const riskLevelEl = document.querySelector("#risk-level");
  const explanationEl = document.querySelector("#risk-explanation");
  const nextStepsEl = document.querySelector("#next-steps-list");
  const yearEl = document.querySelector("#year");

  const riskProfiles = {
    low: {
      label: "Niskie ryzyko",
      className: "low",
      explanation:
        "Sytuacja wygląda stabilnie. Działaj zgodnie ze swoim standardowym procesem i dbaj o jasną dokumentację.",
      steps: [
        "Wyślij standardową ofertę i harmonogram.",
        "Opisz na piśmie zakres dostarczanych elementów i limity poprawek.",
        "Potwierdź zaliczkę i datę startu przed rozpoczęciem prac."
      ]
    },
    medium: {
      label: "Średnie ryzyko",
      className: "medium",
      explanation:
        "Wykryto potencjalne tarcia. Przed startem doprecyzuj zakres, warunki płatności, harmonogram i zapisy umowy.",
      steps: [
        "Podziel prace na czytelne etapy i punkty akceptacji.",
        "Wymagaj podpisanej umowy z jasno określonym limitem poprawek.",
        "Pobierz zaliczkę przed wejściem w aktywną realizację."
      ]
    },
    high: {
      label: "Wysokie ryzyko",
      className: "high",
      explanation:
        "Wykryto wiele sygnałów ostrzegawczych. Zatrzymaj proces i ustal twarde zasady przed przyjęciem projektu.",
      steps: [
        "Wymagaj pisemnej umowy i jednoznacznie zdefiniowanego zakresu przed rozpoczęciem prac.",
        "Ustal realną zaliczkę na start oraz płatności etapowe.",
        "Odrzuć lub odłóż projekt, jeśli oczekiwania nadal są niejasne albo ryzykowne."
      ]
    }
  };

  const getSelectedMetrics = () => {
    let score = 0;
    let count = 0;

    checkboxes.forEach((box) => {
      if (box.checked) {
        count += 1;
        score += Number(box.dataset.score || 0);
      }
    });

    return { score, count };
  };

  const getRiskBand = (score) => {
    if (score >= 16) {
      return "high";
    }

    if (score >= 7) {
      return "medium";
    }

    return "low";
  };

  const renderNextSteps = (steps) => {
    nextStepsEl.innerHTML = "";

    steps.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      nextStepsEl.appendChild(li);
    });
  };

  const renderResult = () => {
    const { score, count } = getSelectedMetrics();
    const band = getRiskBand(score);
    const profile = riskProfiles[band];

    totalScoreEl.textContent = String(score);
    selectedCountEl.textContent = String(count);
    riskLevelEl.textContent = profile.label;
    riskLevelEl.className = `risk-pill ${profile.className}`;
    explanationEl.textContent = profile.explanation;

    renderNextSteps(profile.steps);
  };

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (!form || checkboxes.length === 0) {
    return;
  }

  form.addEventListener("change", renderResult);
  form.addEventListener("reset", () => {
    window.requestAnimationFrame(renderResult);
  });

  renderResult();
})();
