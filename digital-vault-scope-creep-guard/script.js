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
      status: 'Included / low risk',
      risk: 'Low',
      action: 'Handle within current scope and proceed with normal delivery flow.',
      tone: 'simple confirmation',
      explanation: 'Current signals suggest this request aligns with the existing scope and delivery plan.',
      response: 'Thanks for the request. This is within the current scope, so I can include it in our planned workflow and keep delivery moving.'
    },
    {
      min: 4,
      max: 7,
      key: 'medium',
      status: 'Minor scope risk',
      risk: 'Moderate',
      action: 'Clarify details before implementation and confirm effort impact.',
      tone: 'confirm scope and effort',
      explanation: 'The request has limited impact but needs explicit clarification before committing development time.',
      response: 'Thanks for sharing this update. I can likely include it, but I want to confirm the exact scope and effort first so we stay aligned on timeline and expectations.'
    },
    {
      min: 8,
      max: 12,
      key: 'high',
      status: 'Change request',
      risk: 'High',
      action: 'Document as a change request and secure approval before starting work.',
      tone: 'professional change request message',
      explanation: 'This request materially changes effort, timeline, or agreed deliverables and should be handled through formal approval.',
      response: 'This request looks like a change to our original scope. I will document it as a formal change request with effort, timeline, and cost impact for your approval before implementation.'
    },
    {
      min: 13,
      max: Number.POSITIVE_INFINITY,
      key: 'critical',
      status: 'Out of scope',
      risk: 'Critical',
      action: 'Estimate separately and obtain paid approval before implementation.',
      tone: 'firm but polite paid-scope message',
      explanation: 'The request is outside current project boundaries and should be treated as separately priced work to protect delivery quality.',
      response: 'Thanks for the request. This is outside the current project scope, so I will prepare a separate estimate and timeline for approval before we proceed.'
    }
  ];

  function getCategory(totalScore) {
    return categories.find((category) => totalScore >= category.min && totalScore <= category.max) || categories[0];
  }

  function calculateScore(values) {
    return Object.keys(scores).reduce((total, field) => total + scores[field][values[field]], 0);
  }

  function buildExplanation(values, totalScore, category) {
    const notes = values.requestNotes ? ` Internal note: ${values.requestNotes.trim()}.` : '';
    return `${category.explanation} Score ${totalScore} reflects request type, agreement fit, effort, and delivery impact.${notes}`;
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

    copyFeedback.textContent = copied ? 'Copied to clipboard.' : 'Unable to copy automatically. Please copy manually.';
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
