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
      label: "Low risk",
      className: "low",
      explanation:
        "Client looks manageable. Proceed with your normal process and keep documentation clear.",
      steps: [
        "Share your standard proposal and timeline.",
        "Define deliverables and revision limits in writing.",
        "Confirm deposit and start date before kickoff."
      ]
    },
    medium: {
      label: "Medium risk",
      className: "medium",
      explanation:
        "Potential friction detected. Clarify scope, payment terms, timeline, and contract details before starting.",
      steps: [
        "Break work into clear phases and approvals.",
        "Require a signed agreement with revision boundaries.",
        "Collect a deposit before scheduling active production."
      ]
    },
    high: {
      label: "High risk",
      className: "high",
      explanation:
        "Multiple warning signs detected. Pause and set firm boundaries before taking on the project.",
      steps: [
        "Require a written agreement and explicit scope before work.",
        "Collect a meaningful upfront deposit and milestone payments.",
        "Decline or defer if expectations remain unclear or unsafe."
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
