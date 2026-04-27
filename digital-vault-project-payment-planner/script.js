(() => {
  const VAT_RATE = 23;
  const CURRENCY = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });

  const MODEL_CONFIG = {
    "30-40-30": { label: "30 / 40 / 30", depositPct: 30, milestonePct: 40, finalPct: 30 },
    "40-40-20": { label: "40 / 40 / 20", depositPct: 40, milestonePct: 40, finalPct: 20 },
    "50-30-20": { label: "50 / 30 / 20", depositPct: 50, milestonePct: 30, finalPct: 20 },
    "50-50": { label: "50 / 50", depositPct: 50, milestonePct: 0, finalPct: 50 },
    "100-upfront": { label: "100 z góry", depositPct: 100, milestonePct: 0, finalPct: 0 }
  };

  const form = document.getElementById("planner-form");
  const paymentModel = document.getElementById("payment-model");
  const customSplitFields = document.getElementById("custom-split-fields");
  const customSplitMessage = document.getElementById("custom-split-message");
  const scheduleBody = document.getElementById("schedule-body");
  const copyMessage = document.getElementById("copy-message");
  const roundingNote = document.getElementById("rounding-note");
  const milestoneNote = document.getElementById("milestone-note");
  const alerts = document.getElementById("alerts");
  const copyButton = document.getElementById("copy-plan");
  const resetButton = document.getElementById("reset-form");

  const fields = {
    projectTotal: document.getElementById("project-total"),
    milestones: document.getElementById("milestones"),
    startDate: document.getElementById("start-date"),
    durationWeeks: document.getElementById("duration-weeks"),
    vatMode: document.getElementById("vat-mode"),
    invoicePrefix: document.getElementById("invoice-prefix"),
    dueDays: document.getElementById("due-days"),
    customZaliczka: document.getElementById("custom-deposit"),
    customEtap: document.getElementById("custom-milestone"),
    customKońcowa: document.getElementById("custom-final")
  };

  const outputs = {
    inputKwota: document.getElementById("input-amount"),
    vatKwota: document.getElementById("vat-amount"),
    grossKwota: document.getElementById("gross-amount"),
    modelLabel: document.getElementById("model-label"),
    depositKwota: document.getElementById("deposit-amount"),
    milestonePool: document.getElementById("milestone-pool"),
    finalKwota: document.getElementById("final-amount")
  };

  let latestPlanText = "";

  function plnToGrosze(value) {
    const normalized = String(value || "").replace(",", ".").trim();
    if (!normalized) return NaN;
    const amount = Number(normalized);
    if (!Number.isFinite(amount) || amount < 0) return NaN;
    return Math.round(amount * 100);
  }

  function groszeToPln(grosze) {
    return CURRENCY.format(grosze / 100);
  }

  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  function parseStartDate(value) {
    if (!value) return null;
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("pl-PL", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  }

  function resolveModel() {
    if (paymentModel.value !== "custom") {
      return { ...MODEL_CONFIG[paymentModel.value], valid: true, source: "preset" };
    }

    const deposit = Number(fields.customZaliczka.value);
    const milestone = Number(fields.customEtap.value);
    const final = Number(fields.customKońcowa.value);
    const sum = deposit + milestone + final;

    if ([deposit, milestone, final].some((n) => !Number.isFinite(n) || n < 0 || n > 100)) {
      return { valid: false, reason: "Własne wartości procentowe muszą mieścić się między 0 a 100." };
    }
    if (sum !== 100) {
      return {
        valid: false,
        reason: `Własny podział musi dawać dokładnie 100%. Obecnie: ${sum}%.`
      };
    }

    return {
      label: `Własny (${deposit} / ${milestone} / ${final})`,
      depositPct: deposit,
      milestonePct: milestone,
      finalPct: final,
      valid: true,
      source: "custom"
    };
  }

  function calculate() {
    alerts.innerHTML = "";
    copyMessage.textContent = "";
    copyMessage.className = "message";
    roundingNote.hidden = true;
    milestoneNote.hidden = true;

    const totalGroszeInput = plnToGrosze(fields.projectTotal.value);
    const dueDays = Number(fields.dueDays.value);

    if (Number.isNaN(totalGroszeInput)) {
      renderError("Wpisz poprawną łączną kwotę projektu (0 PLN lub więcej).");
      clearSchedule();
      return;
    }

    if (!Number.isInteger(dueDays) || dueDays < 0 || dueDays > 60) {
      renderError("Termin płatności musi być liczbą całkowitą od 0 do 60.");
      clearSchedule();
      return;
    }

    const model = resolveModel();
    if (!model.valid) {
      customSplitMessage.textContent = model.reason;
      customSplitMessage.className = "message error";
      renderError("Własny split is invalid. Fix the percentages to generate accurate results.");
      clearSchedule();
      return;
    }
    customSplitMessage.textContent = paymentModel.value === "custom" ? "Własny split is valid." : "";
    customSplitMessage.className = paymentModel.value === "custom" ? "message success" : "message";

    const vatMode = fields.vatMode.value;
    const netGrosze = totalGroszeInput;
    const vatGrosze = vatMode === "vat23" ? Math.round((netGrosze * VAT_RATE) / 100) : 0;
    const grossGrosze = netGrosze + vatGrosze;

    const milestonesCount = Number(fields.milestones.value);
    const depositGrosze = Math.floor((grossGrosze * model.depositPct) / 100);
    let milestonePoolGrosze = Math.floor((grossGrosze * model.milestonePct) / 100);
    let finalGrosze = grossGrosze - depositGrosze - milestonePoolGrosze;

    const rows = [];
    const prefix = (fields.invoicePrefix.value || "KP-DV").trim().slice(0, 20) || "KP-DV";
    const startDate = parseStartDate(fields.startDate.value);
    const durationDays = Number(fields.durationWeeks.value) * 7;

    rows.push(createRow(`${prefix}-001`, "Zaliczka", model.depositPct, depositGrosze, 0, startDate, durationDays, dueDays));

    if (milestonePoolGrosze > 0 && milestonesCount > 0) {
      const baseEtap = Math.floor(milestonePoolGrosze / milestonesCount);
      let distributed = 0;
      for (let i = 0; i < milestonesCount; i += 1) {
        const amount = i === milestonesCount - 1 ? milestonePoolGrosze - distributed : baseEtap;
        distributed += amount;
        const pct = Number((model.milestonePct / milestonesCount).toFixed(2));
        rows.push(createRow(
          `${prefix}-${String(rows.length + 1).padStart(3, "0")}`,
          `Etap ${i + 1}`,
          pct,
          amount,
          i + 1,
          startDate,
          durationDays,
          dueDays,
          milestonesCount
        ));
      }
    } else if (milestonePoolGrosze > 0 && milestonesCount === 0) {
      finalGrosze += milestonePoolGrosze;
      milestonePoolGrosze = 0;
      milestoneNote.hidden = false;
      milestoneNote.textContent = "Etap pool moved to final payment because 0 milestones were selected.";
    }

    const finalRowPct = rows.length === 1 && model.finalPct === 0 ? 0 : model.finalPct + (model.milestonePct > 0 && milestonesCount === 0 ? model.milestonePct : 0);
    rows.push(createRow(`${prefix}-${String(rows.length + 1).padStart(3, "0")}`, "Końcowa", finalRowPct, finalGrosze, milestonesCount + 1, startDate, durationDays, dueDays, milestonesCount));

    const plannedSum = rows.reduce((acc, row) => acc + row.amountGrosze, 0);
    const diff = grossGrosze - plannedSum;
    if (diff !== 0) {
      rows[rows.length - 1].amountGrosze += diff;
      roundingNote.hidden = false;
      const direction = diff > 0 ? "dodano do" : "odjęto od";
      roundingNote.textContent = `Korekta zaokrąglenia: ${groszeToPln(Math.abs(diff))} ${direction} płatności końcowej, aby suma zgadzała się co do grosza.`;
    }

    render(rows, {
      inputGrosze: totalGroszeInput,
      vatGrosze,
      grossGrosze,
      model,
      depositGrosze,
      milestonePoolGrosze,
      finalGrosze: rows[rows.length - 1].amountGrosze,
      hasStartDate: Boolean(startDate),
      dueDays
    });
  }

  function createRow(invoiceLabel, type, pct, amountGrosze, index, startDate, durationDays, dueDays, milestonesCount = 0) {
    let issueDate = "jeszcze nie zaplanowano";
    let dueDate = "jeszcze nie zaplanowano";

    if (startDate) {
      let issue = startDate;
      if (type.startsWith("Etap")) {
        const spacing = Math.round(durationDays / (milestonesCount + 1));
        issue = addDays(startDate, spacing * index);
      }
      if (type === "Końcowa") {
        issue = addDays(startDate, durationDays);
      }

      issueDate = formatDate(issue);
      dueDate = formatDate(addDays(issue, dueDays));
    }

    return { invoiceLabel, type, pct, amountGrosze, issueDate, dueDate };
  }

  function clearSchedule() {
    outputs.inputAmount.textContent = "—";
    outputs.vatAmount.textContent = "—";
    outputs.grossAmount.textContent = "—";
    outputs.modelLabel.textContent = "—";
    outputs.depositAmount.textContent = "—";
    outputs.milestonePool.textContent = "—";
    outputs.finalAmount.textContent = "—";
    scheduleBody.innerHTML = "";
    latestPlanText = "";
  }

  function renderError(message) {
    const block = document.createElement("p");
    block.className = "alert error";
    block.textContent = message;
    alerts.append(block);
  }

  function render(rows, context) {
    outputs.inputAmount.textContent = groszeToPln(context.inputGrosze);
    outputs.vatAmount.textContent = context.vatGrosze ? groszeToPln(context.vatGrosze) : "Nie doliczono VAT";
    outputs.grossAmount.textContent = groszeToPln(context.grossGrosze);
    outputs.modelLabel.textContent = context.model.label;
    outputs.depositAmount.textContent = groszeToPln(context.depositGrosze);
    outputs.milestonePool.textContent = groszeToPln(context.milestonePoolGrosze);
    outputs.finalAmount.textContent = groszeToPln(context.finalGrosze);

    scheduleBody.innerHTML = "";
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.invoiceLabel}</td>
        <td>${row.type}</td>
        <td>${row.pct}%</td>
        <td>${row.issueDate}</td>
        <td>${row.dueDate}</td>
        <td>${groszeToPln(row.amountGrosze)}</td>
      `;
      scheduleBody.appendChild(tr);
    });

    if (!context.hasStartDate) {
      const block = document.createElement("p");
      block.className = "alert error";
      block.textContent = "Wybierz datę startu, aby wygenerować daty harmonogramu.";
      alerts.append(block);
    }

    latestPlanText = [
      "Planer Płatności Projektu — KP_Code Digital Vault",
      `Kwota wejściowa projektu: ${groszeToPln(context.inputGrosze)}`,
      `Kwota VAT: ${context.vatGrosze ? groszeToPln(context.vatGrosze) : "Bez VAT"}`,
      `Łączna kwota projektu użyta w harmonogramie: ${groszeToPln(context.grossGrosze)}`,
      `Model płatności: ${context.model.label}`,
      "",
      "Pozycje płatności:",
      ...rows.map((row) => `${row.invoiceLabel} | ${row.type} | ${row.pct}% | Wystawienie: ${row.issueDate} | Termin: ${row.dueDate} | Kwota: ${groszeToPln(row.amountGrosze)}`),
      "",
      "Zastrzeżenie: narzędzie wspierające planowanie; nie jest poradą księgową, podatkową, prawną ani umowną."
    ].join("\n");
  }

  async function copyPlan() {
    if (!latestPlanText) {
      copyMessage.textContent = "Brak poprawnego planu płatności do skopiowania.";
      copyMessage.className = "message error";
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(latestPlanText);
      } else {
        const area = document.createElement("textarea");
        area.value = latestPlanText;
        document.body.append(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      copyMessage.textContent = "Plan płatności skopiowany.";
      copyMessage.className = "message success";
    } catch {
      copyMessage.textContent = "Kopiowanie nie powiodło się w tej przeglądarce. Skopiuj treść ręcznie z harmonogramu.";
      copyMessage.className = "message error";
    }
  }

  function updateWłasnyVisibility() {
    customSplitFields.hidden = paymentModel.value !== "custom";
  }

  form.addEventListener("input", calculate);
  form.addEventListener("change", calculate);
  paymentModel.addEventListener("change", () => {
    updateWłasnyVisibility();
    calculate();
  });

  copyButton.addEventListener("click", copyPlan);

  resetButton.addEventListener("click", () => {
    window.setTimeout(() => {
      paymentModel.value = "30-40-30";
      fields.milestones.value = "2";
      fields.durationWeeks.value = "4";
      fields.vatMode.value = "none";
      fields.invoicePrefix.value = "KP-DV";
      fields.dueDays.value = "7";
      fields.customZaliczka.value = "40";
      fields.customEtap.value = "40";
      fields.customKońcowa.value = "20";
      updateWłasnyVisibility();
      calculate();
    }, 0);
  });

  updateWłasnyVisibility();
  calculate();
})();
