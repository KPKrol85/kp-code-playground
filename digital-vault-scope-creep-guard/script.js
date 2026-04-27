(function () {
  const form = document.getElementById('assessment-form');
  const resultCard = document.querySelector('.result-card');
  const copyButton = document.getElementById('copyResponseButton');
  const copyFeedback = document.getElementById('copyFeedback');

  const output = {
    score: document.getElementById('scoreValue'),
    status: document.getElementById('statusValue'),
    risk: document.getElementById('riskValue'),
    action: document.getElementById('actionValue'),
    response: document.getElementById('responseValue'),
    explanation: document.getElementById('explanationValue')
  };

  const scores = {
    agreementIncluded: { yes: 0, partly: 2, unclear: 3, no: 4 },
    effortEstimate: { under30: 0, thirtyToTwo: 1, halfDay: 3, fullDay: 5 },
    timelineImpact: { no: 0, slightly: 1, unknown: 2, yes: 3 },
    priceImpact: { no: 0, maybe: 2, unknown: 2, yes: 4 },
    clientAssets: { no: 0, unclear: 1, yes: 2 },
    requestType: {
      contentChange: 0,
      designChange: 1,
      technicalFix: 1,
      seoAnalytics: 2,
      newPage: 3,
      integration: 4,
      newFeature: 5,
      postLaunchSupport: 4
    },
    projectPhase: {
      discovery: 0,
      design: 1,
      development: 2,
      review: 3,
      preLaunch: 4,
      postLaunch: 5
    }
  };

  const categories = [
    {
      min: 0,
      max: 3,
      key: 'low',
      status: 'W zakresie / niskie ryzyko',
      risk: 'Niskie',
      action: 'Realizuj w bieżącym zakresie i kontynuuj standardowy przebieg projektu.',
      tone: 'proste potwierdzenie',
      explanation: 'Obecne sygnały wskazują, że ta prośba mieści się w uzgodnionym zakresie i planie realizacji.',
      response: 'Dziękuję za prośbę. To mieści się w obecnym zakresie, więc mogę uwzględnić to w zaplanowanym proces i utrzymać tempo realizacji.'
    },
    {
      min: 4,
      max: 7,
      key: 'medium',
      status: 'Niewielkie ryzyko zakresowe',
      risk: 'Umiarkowane',
      action: 'Doprecyzuj szczegóły przed wdrożeniem i potwierdź wpływ na nakład pracy.',
      tone: 'potwierdzenie zakresu i nakładu',
      explanation: 'Prośba ma ograniczony wpływ, ale wymaga jasnego doprecyzowania przed angażowaniem czasu developerskiego.',
      response: 'Dziękuję za aktualizację. Najprawdopodobniej mogę to uwzględnić, ale najpierw chcę potwierdzić dokładny zakres i nakład, żeby utrzymać zgodność co do terminu i oczekiwań.'
    },
    {
      min: 8,
      max: 12,
      key: 'high',
      status: 'Change request',
      risk: 'Wysokie',
      action: 'Udokumentuj to jako change request i uzyskaj akceptację przed startem prac.',
      tone: 'profesjonalna wiadomość change request',
      explanation: 'Ta prośba istotnie zmienia nakład, harmonogram lub uzgodnione deliverables i powinna przejść formalną ścieżkę akceptacji.',
      response: 'Ta prośba wygląda na zmianę pierwotnego zakresu. Przygotuję formalny change request z wpływem na nakład, termin i koszt do Twojej akceptacji przed wdrożeniem.'
    },
    {
      min: 13,
      max: Number.POSITIVE_INFINITY,
      key: 'critical',
      status: 'Poza zakresem',
      risk: 'Krytyczne',
      action: 'Wyceniaj osobno i uzyskuj płatną akceptację przed wdrożeniem.',
      tone: 'stanowcza, uprzejma wiadomość o płatnym zakresie',
      explanation: 'Ta prośba jest poza bieżącymi granicami projektu i powinna być rozliczana osobno, aby utrzymać jakość realizacji.',
      response: 'Dziękuję za prośbę. To wykracza poza obecny zakres projektu, więc przygotuję osobną wycenę i harmonogram do akceptacji przed dalszymi działaniami.'
    }
  ];

  function getCategory(totalScore) {
    return categories.find((category) => totalScore >= category.min && totalScore <= category.max) || categories[0];
  }

  function calculateScore(values) {
    return Object.keys(scores).reduce((total, field) => total + scores[field][values[field]], 0);
  }

  function buildExplanation(values, totalScore, category) {
    const notes = values.requestNotes ? ` Notatka wewnętrzna: ${values.requestNotes.trim()}.` : '';
    return `${category.explanation} Wynik ${totalScore} odzwierciedla typ prośby, zgodność z umową, nakład i wpływ na realizację.${notes}`;
  }

  function renderAssessment() {
    const values = Object.fromEntries(new FormData(form).entries());
    const totalScore = calculateScore(values);
    const category = getCategory(totalScore);

    output.score.textContent = String(totalScore);
    output.status.textContent = category.status;
    output.risk.textContent = `${category.risk} (${category.tone})`;
    output.action.textContent = category.action;
    output.response.textContent = category.response;
    output.explanation.textContent = buildExplanation(values, totalScore, category);

    resultCard.classList.remove('result-low', 'result-medium', 'result-high', 'result-critical');
    resultCard.classList.add(`result-${category.key}`);
  }

  async function copySuggestedResponse() {
    const text = output.response.textContent.trim();
    if (!text) {
      return;
    }

    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch (error) {
        copied = false;
      }
    }

    if (!copied) {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('readonly', '');
      helper.style.position = 'absolute';
      helper.style.left = '-9999px';
      document.body.appendChild(helper);
      helper.select();
      copied = document.execCommand('copy');
      document.body.removeChild(helper);
    }

    copyFeedback.textContent = copied ? 'Skopiowano do schowka.' : 'Nie udało się skopiować automatycznie. Skopiuj ręcznie.';
    copyFeedback.hidden = false;
    window.setTimeout(() => {
      copyFeedback.hidden = true;
    }, 2200);
  }

  form.addEventListener('input', renderAssessment);
  form.addEventListener('change', renderAssessment);
  form.addEventListener('reset', () => {
    window.setTimeout(renderAssessment, 0);
  });
  copyButton.addEventListener('click', copySuggestedResponse);

  renderAssessment();
})();
