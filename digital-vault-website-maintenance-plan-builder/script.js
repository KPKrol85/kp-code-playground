(() => {
  const form = document.getElementById('plan-builder-form');
  const supportHoursSelect = document.getElementById('supportHours');
  const customHoursWrapper = document.getElementById('custom-hours-wrapper');
  const customHoursInput = document.getElementById('customHours');
  const customHoursError = document.getElementById('custom-hours-error');
  const copyStatus = document.getElementById('copy-status');

  const config = {
    scoring: {
      websiteType: { static: 1, wordpress: 3, ecommerce: 5, custom: 6 },
      updateFrequency: { occasional: 1, monthly: 2, weekly: 4, frequent: 6 },
      backupPolicy: { none: 0, monthly: 1, weekly: 2, daily: 4 },
      monitoring: { none: 0, uptime: 1, basic: 3, advanced: 5 },
      supportHours: { '0': 0, '1': 1, '2': 2, '4': 4, '8': 6 },
      checkboxes: {
        minorContentEdits: 1,
        technicalUpdates: 2,
        monthlyReport: 1,
        seoCheck: 2,
        prioritySupport: 3,
        emergencyFixes: 4
      }
    },
    tiers: [
      { name: 'Essential Care', min: 0, max: 6, basePrice: 350 },
      { name: 'Growth Care', min: 7, max: 13, basePrice: 750 },
      { name: 'Pro Care', min: 14, max: 21, basePrice: 1400 },
      { name: 'Priority Care', min: 22, max: Number.POSITIVE_INFINITY, basePrice: 2400 }
    ],
    priceModifiers: {
      websiteType: { static: 0, wordpress: 250, ecommerce: 500, custom: 800 },
      backupPolicy: { none: 0, monthly: 0, weekly: 150, daily: 300 },
      monitoring: { none: 0, uptime: 100, basic: 200, advanced: 450 },
      supportHourPrice: 120,
      addOns: {
        seoCheck: 250,
        prioritySupport: 400,
        emergencyFixes: 600,
        monthlyReport: 150
      }
    },
    labels: {
      websiteType: {
        static: 'Static business website',
        wordpress: 'WordPress website',
        ecommerce: 'Small ecommerce website',
        custom: 'Custom web app / advanced website'
      },
      updateFrequency: {
        occasional: 'occasional updates',
        monthly: 'monthly updates',
        weekly: 'weekly updates',
        frequent: 'frequent / active development'
      },
      backupPolicy: {
        none: 'No backup included',
        monthly: 'Monthly backup',
        weekly: 'Weekly backup',
        daily: 'Daily backup'
      },
      monitoring: {
        none: 'No monitoring',
        uptime: 'Uptime monitoring',
        basic: 'Uptime + basic performance monitoring',
        advanced: 'Uptime + performance + security checks'
      }
    },
    tones: {
      simple: ({ tier, price, supportHours, serviceList }) =>
        `${tier} is recommended for this website setup. The estimated monthly starting price is ${price}. ` +
        `It includes ${serviceList.join(', ')}, with ${supportHours} monthly support hour(s). ` +
        'Work outside this scope, major redesign tasks, and external paid tools are not automatically included. ' +
        'Final terms should be confirmed in a written offer or agreement.',
      premium: ({ tier, price, supportHours, serviceList }) =>
        `Based on your selected scope, ${tier} is the most suitable plan. Your estimated monthly starting investment is ${price}, ` +
        `covering ${serviceList.join(', ')} and ${supportHours} dedicated support hour(s) each month. ` +
        'Strategic projects, third-party subscriptions, and non-standard requests are handled separately. ' +
        'Exact service terms should be approved through a written commercial offer and agreement.',
      technical: ({ tier, price, supportHours, serviceList, frequency, monitoring, backup }) =>
        `Recommended tier: ${tier}. Estimated monthly starting price: ${price}. The scope includes ${serviceList.join(', ')}, ` +
        `with ${supportHours} support engineering hour(s) per month, ${frequency} cadence, ${monitoring.toLowerCase()}, and ${backup.toLowerCase()}. ` +
        'Tasks outside defined maintenance scope, major feature development, and licensed external tooling are excluded by default. ' +
        'Final coverage and response commitments must be documented in a formal written offer or agreement.'
    }
  };

  const currencyFormatter = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0
  });

  const resultEls = {
    recommendedTier: document.getElementById('recommendedTier'),
    monthlyPrice: document.getElementById('monthlyPrice'),
    supportHoursDisplay: document.getElementById('supportHoursDisplay'),
    backupPolicyDisplay: document.getElementById('backupPolicyDisplay'),
    monitoringDisplay: document.getElementById('monitoringDisplay'),
    reportingDisplay: document.getElementById('reportingDisplay'),
    seoDisplay: document.getElementById('seoDisplay'),
    priorityDisplay: document.getElementById('priorityDisplay'),
    includedServices: document.getElementById('includedServices'),
    clientSummary: document.getElementById('clientSummary'),
    internalNote: document.getElementById('internalNote')
  };

  function getSupportHours() {
    if (supportHoursSelect.value !== 'custom') {
      return Number.parseInt(supportHoursSelect.value, 10);
    }

    const value = Number.parseInt(customHoursInput.value, 10);
    if (Number.isNaN(value) || value < 0 || value > 40) {
      return null;
    }

    return value;
  }

  function getSupportPoints(hours) {
    if (supportHoursSelect.value !== 'custom') {
      return config.scoring.supportHours[supportHoursSelect.value] || 0;
    }
    return Math.min(hours, 10);
  }

  function calculateScore(state) {
    let score = 0;
    score += config.scoring.websiteType[state.websiteType];
    score += config.scoring.updateFrequency[state.updateFrequency];
    score += config.scoring.backupPolicy[state.backupPolicy];
    score += config.scoring.monitoring[state.monitoring];
    score += getSupportPoints(state.supportHours);

    Object.entries(config.scoring.checkboxes).forEach(([name, points]) => {
      if (state[name]) score += points;
    });

    return score;
  }

  function getTier(score) {
    return config.tiers.find((tier) => score >= tier.min && score <= tier.max) || config.tiers[0];
  }

  function buildIncludedServices(state) {
    const items = [
      `regular website updates with ${config.labels.updateFrequency[state.updateFrequency]}`,
      `${config.labels.backupPolicy[state.backupPolicy].toLowerCase()}`,
      `${config.labels.monitoring[state.monitoring].toLowerCase()}`,
      `${state.supportHours} monthly support hour(s)`
    ];

    if (state.minorContentEdits) items.push('minor content edits');
    if (state.technicalUpdates) items.push('technical updates and maintenance patches');
    if (state.monthlyReport) items.push('monthly summary report');
    if (state.seoCheck) items.push('SEO health check');
    if (state.prioritySupport) items.push('priority support handling');
    if (state.emergencyFixes) items.push('emergency fix handling');

    return items;
  }

  function calculatePrice(state, tier) {
    let total = tier.basePrice;
    total += config.priceModifiers.websiteType[state.websiteType];
    total += config.priceModifiers.backupPolicy[state.backupPolicy];
    total += config.priceModifiers.monitoring[state.monitoring];
    total += state.supportHours * config.priceModifiers.supportHourPrice;

    if (state.seoCheck) total += config.priceModifiers.addOns.seoCheck;
    if (state.prioritySupport) total += config.priceModifiers.addOns.prioritySupport;
    if (state.emergencyFixes) total += config.priceModifiers.addOns.emergencyFixes;
    if (state.monthlyReport) total += config.priceModifiers.addOns.monthlyReport;

    return total;
  }

  function getState() {
    return {
      websiteType: document.getElementById('websiteType').value,
      updateFrequency: document.getElementById('updateFrequency').value,
      backupPolicy: document.getElementById('backupPolicy').value,
      monitoring: document.getElementById('monitoring').value,
      supportHours: getSupportHours(),
      minorContentEdits: document.getElementById('minorContentEdits').checked,
      technicalUpdates: document.getElementById('technicalUpdates').checked,
      monthlyReport: document.getElementById('monthlyReport').checked,
      seoCheck: document.getElementById('seoCheck').checked,
      prioritySupport: document.getElementById('prioritySupport').checked,
      emergencyFixes: document.getElementById('emergencyFixes').checked,
      tone: document.getElementById('tone').value
    };
  }

  function render() {
    const state = getState();

    const customSelected = supportHoursSelect.value === 'custom';
    customHoursWrapper.classList.toggle('hidden', !customSelected);

    if (customSelected && state.supportHours === null) {
      customHoursError.textContent = 'Enter a valid custom value between 0 and 40.';
      resultEls.monthlyPrice.textContent = '—';
      resultEls.clientSummary.textContent = 'Fix custom support hours to generate a valid maintenance plan.';
      return;
    }

    customHoursError.textContent = '';

    const score = calculateScore(state);
    const tier = getTier(score);
    const includedServices = buildIncludedServices(state);
    const estimatedPrice = calculatePrice(state, tier);
    const formattedPrice = currencyFormatter.format(estimatedPrice);

    resultEls.recommendedTier.textContent = tier.name;
    resultEls.monthlyPrice.textContent = `${formattedPrice} (estimated monthly starting price)`;
    resultEls.supportHoursDisplay.textContent = `${state.supportHours} hour(s) / month`;
    resultEls.backupPolicyDisplay.textContent = config.labels.backupPolicy[state.backupPolicy];
    resultEls.monitoringDisplay.textContent = config.labels.monitoring[state.monitoring];
    resultEls.reportingDisplay.textContent = state.monthlyReport ? 'Monthly report included' : 'No monthly report selected';
    resultEls.seoDisplay.textContent = state.seoCheck ? 'SEO health check included' : 'No SEO check selected';
    resultEls.priorityDisplay.textContent = state.prioritySupport ? 'Priority support enabled' : 'Standard support priority';

    resultEls.includedServices.innerHTML = '';
    includedServices.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      resultEls.includedServices.appendChild(li);
    });

    const summaryContext = {
      tier: tier.name,
      price: formattedPrice,
      supportHours: state.supportHours,
      serviceList: includedServices,
      frequency: config.labels.updateFrequency[state.updateFrequency],
      monitoring: config.labels.monitoring[state.monitoring],
      backup: config.labels.backupPolicy[state.backupPolicy]
    };

    resultEls.clientSummary.textContent = config.tones[state.tone](summaryContext);
    resultEls.internalNote.textContent =
      `Suggested due to a total score of ${score}, driven by ${config.labels.websiteType[state.websiteType].toLowerCase()}, ` +
      `${config.labels.updateFrequency[state.updateFrequency]}, ${config.labels.monitoring[state.monitoring].toLowerCase()}, and selected add-ons. ` +
      'Use this as a planning baseline and refine scope details in the final offer.';
  }

  async function copyPlan() {
    const state = getState();
    if (supportHoursSelect.value === 'custom' && state.supportHours === null) {
      copyStatus.textContent = 'Cannot copy: please fix custom support hours first.';
      copyStatus.style.color = 'var(--danger)';
      return;
    }

    const title = 'KP_Code Digital Vault - Website Maintenance Plan Builder';
    const planText = [
      title,
      `Recommended plan: ${resultEls.recommendedTier.textContent}`,
      `Estimated monthly starting price: ${resultEls.monthlyPrice.textContent}`,
      'Selected included services:',
      ...Array.from(resultEls.includedServices.querySelectorAll('li')).map((li) => `- ${li.textContent}`),
      '',
      'Generated summary:',
      resultEls.clientSummary.textContent,
      '',
      'Disclaimer:',
      document.getElementById('disclaimerText').textContent
    ].join('\n');

    try {
      await navigator.clipboard.writeText(planText);
      copyStatus.textContent = 'Maintenance plan copied to clipboard.';
      copyStatus.style.color = 'var(--success)';
    } catch {
      const fallback = document.createElement('textarea');
      fallback.value = planText;
      fallback.setAttribute('readonly', 'true');
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();

      try {
        const success = document.execCommand('copy');
        copyStatus.textContent = success
          ? 'Maintenance plan copied with fallback method.'
          : 'Copy failed. Please copy manually from the summary panel.';
        copyStatus.style.color = success ? 'var(--success)' : 'var(--danger)';
      } catch {
        copyStatus.textContent = 'Copy failed. Please copy manually from the summary panel.';
        copyStatus.style.color = 'var(--danger)';
      } finally {
        document.body.removeChild(fallback);
      }
    }
  }

  form.addEventListener('input', render);
  form.addEventListener('change', render);

  form.addEventListener('reset', () => {
    window.requestAnimationFrame(() => {
      customHoursInput.value = '0';
      copyStatus.textContent = '';
      render();
    });
  });

  document.getElementById('copyPlanButton').addEventListener('click', copyPlan);

  render();
})();
