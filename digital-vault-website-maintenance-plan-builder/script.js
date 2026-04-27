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
      { name: 'Opieka Essential', min: 0, max: 6, basePrice: 350 },
      { name: 'Opieka Growth', min: 7, max: 13, basePrice: 750 },
      { name: 'Opieka Pro', min: 14, max: 21, basePrice: 1400 },
      { name: 'Opieka Priority', min: 22, max: Number.POSITIVE_INFINITY, basePrice: 2400 }
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
        static: 'Statyczna strona firmowa',
        wordpress: 'Strona WordPress',
        ecommerce: 'Mały sklep e-commerce',
        custom: 'Dedykowana aplikacja webowa / zaawansowana strona'
      },
      updateFrequency: {
        occasional: 'okazjonalnymi aktualizacjami',
        monthly: 'miesięcznymi aktualizacjami',
        weekly: 'tygodniowymi aktualizacjami',
        frequent: 'częstymi zmianami / aktywnym rozwojem'
      },
      backupPolicy: {
        none: 'Brak kopii zapasowej',
        monthly: 'Kopia miesięczna',
        weekly: 'Kopia tygodniowa',
        daily: 'Kopia dzienna'
      },
      monitoring: {
        none: 'Brak monitoringu',
        uptime: 'Monitoring uptime',
        basic: 'Uptime + podstawowy monitoring wydajności',
        advanced: 'Uptime + wydajność + kontrole bezpieczeństwa'
      }
    },
    tones: {
      simple: ({ tier, price, supportHours, serviceList }) =>
        `${tier} to rekomendowany pakiet dla tej konfiguracji strony. Szacowana miesięczna cena startowa to ${price}. ` +
        `W pakiecie znajduje się ${serviceList.join(', ')}, z ${supportHours} miesięczn(y/e/ych) godzinami wsparcia. ` +
        'Work outside this scope, major redesign tasks, and external paid tools are not automatically included. ' +
        'Finalne warunki należy potwierdzić w pisemnej ofercie lub umowie.',
      premium: ({ tier, price, supportHours, serviceList }) =>
        `Na podstawie wybranego zakresu, ${tier} to najbardziej adekwatny plan. Szacowana miesięczna inwestycja startowa to ${price}, ` +
        `obejmująca ${serviceList.join(', ')} and ${supportHours} dedykowanych godzin wsparcia miesięcznie. ` +
        'Strategic projects, third-party subscriptions, and non-standard requests are handled separately. ' +
        'Exact service terms should be approved through a written commercial offer and agreement.',
      technical: ({ tier, price, supportHours, serviceList, frequency, monitoring, backup }) =>
        `Rekomendowany pakiet: ${tier}. Szacowana miesięczna cena startowa: ${price}. Zakres obejmuje ${serviceList.join(', ')}, ` +
        `z ${supportHours} godzin(y) wsparcia technicznego miesięcznie, ${frequency} cadence, ${monitoring.toLowerCase()}, and ${backup.toLowerCase()}. ` +
        'Zadania poza zdefiniowanym zakresem opieki, major feature development, and licensed external tooling are excluded by default. ' +
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
      `regular website updates z ${config.labels.updateFrequency[state.updateFrequency]}`,
      `${config.labels.backupPolicy[state.backupPolicy].toLowerCase()}`,
      `${config.labels.monitoring[state.monitoring].toLowerCase()}`,
      `${state.supportHours} miesięczn(y/e/ych) godzinami wsparcia`
    ];

    if (state.minorContentEdits) items.push('drobne edycje treści');
    if (state.technicalUpdates) items.push('aktualizacje techniczne i poprawki maintenance');
    if (state.monthlyReport) items.push('miesięczny raport podsumowujący');
    if (state.seoCheck) items.push('kontrola kondycji SEO');
    if (state.prioritySupport) items.push('obsługa priorytetowych zgłoszeń');
    if (state.emergencyFixes) items.push('obsługa poprawek awaryjnych');

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
      customHoursError.textContent = 'Wpisz poprawną wartość własną od 0 do 40.';
      resultEls.monthlyPrice.textContent = '—';
      resultEls.clientSummary.textContent = 'Popraw własną liczbę godzin wsparcia, aby wygenerować poprawny plan.';
      return;
    }

    customHoursError.textContent = '';

    const score = calculateScore(state);
    const tier = getTier(score);
    const includedServices = buildIncludedServices(state);
    const estimatedPrice = calculatePrice(state, tier);
    const formattedPrice = currencyFormatter.format(estimatedPrice);

    resultEls.recommendedTier.textContent = tier.name;
    resultEls.monthlyPrice.textContent = `${formattedPrice} (szacowana miesięczna cena startowa)`;
    resultEls.supportHoursDisplay.textContent = `${state.supportHours} hour(s) / month`;
    resultEls.backupPolicyDisplay.textContent = config.labels.backupPolicy[state.backupPolicy];
    resultEls.monitoringDisplay.textContent = config.labels.monitoring[state.monitoring];
    resultEls.reportingDisplay.textContent = state.monthlyReport ? 'Raport miesięczny w pakiecie' : 'Bez raportu miesięcznego';
    resultEls.seoDisplay.textContent = state.seoCheck ? 'Kontrola SEO w pakiecie' : 'Bez kontroli SEO';
    resultEls.priorityDisplay.textContent = state.prioritySupport ? 'Wsparcie priorytetowe włączone' : 'Standardowy priorytet wsparcia';

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
      `Rekomendacja na podstawie łącznego wyniku ${score}, driven by ${config.labels.websiteType[state.websiteType].toLowerCase()}, ` +
      `${config.labels.updateFrequency[state.updateFrequency]}, ${config.labels.monitoring[state.monitoring].toLowerCase()}, and selected add-ons. ` +
      'Traktuj to jako bazę planistyczną i doprecyzuj szczegóły zakresu w finalnej ofercie.';
  }

  async function copyPlan() {
    const state = getState();
    if (supportHoursSelect.value === 'custom' && state.supportHours === null) {
      copyStatus.textContent = 'Nie można skopiować: najpierw popraw własną liczbę godzin wsparcia.';
      copyStatus.style.color = 'var(--danger)';
      return;
    }

    const title = 'KP_Code Digital Vault - Generator Planu Opieki nad Stroną';
    const planText = [
      title,
      `Rekomendowany plan: ${resultEls.recommendedTier.textContent}`,
      `Szacowana miesięczna cena startowa: ${resultEls.monthlyPrice.textContent}`,
      'Wybrane usługi w pakiecie:',
      ...Array.from(resultEls.includedServices.querySelectorAll('li')).map((li) => `- ${li.textContent}`),
      '',
      'Wygenerowane podsumowanie:',
      resultEls.clientSummary.textContent,
      '',
      'Zastrzeżenie:',
      document.getElementById('disclaimerText').textContent
    ].join('\n');

    try {
      await navigator.clipboard.writeText(planText);
      copyStatus.textContent = 'Plan opieki skopiowany do schowka.';
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
          ? 'Maintenance plan copied z fallback method.'
          : 'Kopiowanie nie powiodło się. Skopiuj treść ręcznie z panelu podsumowania.';
        copyStatus.style.color = success ? 'var(--success)' : 'var(--danger)';
      } catch {
        copyStatus.textContent = 'Kopiowanie nie powiodło się. Skopiuj treść ręcznie z panelu podsumowania.';
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
