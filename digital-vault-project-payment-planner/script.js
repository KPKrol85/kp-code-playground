(() => {
  const VAT_RATE = 23;
  const CURRENCY = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });

  const MODEL_CONFIG = {
    "30-40-30": { label: "30 / 40 / 30", depositPct: 30, milestonePct: 40, finalPct: 30 },
    "40-40-20": { label: "40 / 40 / 20", depositPct: 40, milestonePct: 40, finalPct: 20 },
    "50-30-20": { label: "50 / 30 / 20", depositPct: 50, milestonePct: 30, finalPct: 20 },
    "50-50": { label: "50 / 50", depositPct: 50, milestonePct: 0, finalPct: 50 },
    "100-upfront": { label: "100 upfront", depositPct: 100, milestonePct: 0, finalPct: 0 }
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
    customDeposit: document.getElementById("custom-deposit"),
    customMilestone: document.getElementById("custom-milestone"),
    customFinal: document.getElementById("custom-final")
  };

  const outputs = {
    inputAmount: document.getElementById("input-amount"),
    vatAmount: document.getElementById("vat-amount"),
    grossAmount: document.getElementById("gross-amount"),
    modelLabel: document.getElementById("model-label"),
    depositAmount: document.getElementById("deposit-amount"),
    milestonePool: document.getElementById("milestone-pool"),
    finalAmount: document.getElementById("final-amount")
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

    const deposit = Number(fields.customDeposit.value);
    const milestone = Number(fields.customMilestone.value);
    const final = Number(fields.customFinal.value);
    const sum = deposit + milestone + final;

    if ([deposit, milestone, final].some((n) => !Number.isFinite(n) || n < 0 || n > 100)) {
      return { valid: false, reason: "Custom percentages must be between 0 and 100." };
    }
    if (sum !== 100) {
      return {
        valid: false,
        reason: `Custom split must total exactly 100%. Current total: ${sum}%.`
      };
    }

    return {
      label: `Custom (${deposit} / ${milestone} / ${final})`,
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
      renderError("Enter a valid project total amount (0 PLN or more).");
      clearSchedule();
      return;
    }

    if (!Number.isInteger(dueDays) || dueDays < 0 || dueDays > 60) {
      renderError("Payment due days must be an integer between 0 and 60.");
      clearSchedule();
      return;
    }

    const model = resolveModel();
    if (!model.valid) {
      customSplitMessage.textContent = model.reason;
      customSplitMessage.className = "message error";
      renderError("Custom split is invalid. Fix the percentages to generate accurate results.");
      clearSchedule();
      return;
    }
    customSplitMessage.textContent = paymentModel.value === "custom" ? "Custom split is valid." : "";
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

    rows.push(createRow(`${prefix}-001`, "Deposit", model.depositPct, depositGrosze, 0, startDate, durationDays, dueDays));

    if (milestonePoolGrosze > 0 && milestonesCount > 0) {
      const baseMilestone = Math.floor(milestonePoolGrosze / milestonesCount);
      let distributed = 0;
      for (let i = 0; i < milestonesCount; i += 1) {
        const amount = i === milestonesCount - 1 ? milestonePoolGrosze - distributed : baseMilestone;
        distributed += amount;
        const pct = Number((model.milestonePct / milestonesCount).toFixed(2));
        rows.push(createRow(
          `${prefix}-${String(rows.length + 1).padStart(3, "0")}`,
          `Milestone ${i + 1}`,
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
      milestoneNote.textContent = "Milestone pool moved to final payment because 0 milestones were selected.";
    }

    const finalRowPct = rows.length === 1 && model.finalPct === 0 ? 0 : model.finalPct + (model.milestonePct > 0 && milestonesCount === 0 ? model.milestonePct : 0);
    rows.push(createRow(`${prefix}-${String(rows.length + 1).padStart(3, "0")}`, "Final", finalRowPct, finalGrosze, milestonesCount + 1, startDate, durationDays, dueDays, milestonesCount));

    const plannedSum = rows.reduce((acc, row) => acc + row.amountGrosze, 0);
    const diff = grossGrosze - plannedSum;
    if (diff !== 0) {
      rows[rows.length - 1].amountGrosze += diff;
      roundingNote.hidden = false;
      const direction = diff > 0 ? "added to" : "subtracted from";
      roundingNote.textContent = `Rounding adjustment: ${groszeToPln(Math.abs(diff))} ${direction} final payment so totals match exactly.`;
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
    let issueDate = "not scheduled yet";
    let dueDate = "not scheduled yet";

    if (startDate) {
      let issue = startDate;
      if (type.startsWith("Milestone")) {
        const spacing = Math.round(durationDays / (milestonesCount + 1));
        issue = addDays(startDate, spacing * index);
      }
      if (type === "Final") {
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
    outputs.vatAmount.textContent = context.vatGrosze ? groszeToPln(context.vatGrosze) : "No VAT added";
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
      block.textContent = "Select a start date to generate schedule dates.";
      alerts.append(block);
    }

    latestPlanText = [
      "Project Payment Planner — KP_Code Digital Vault",
      `Project amount input: ${groszeToPln(context.inputGrosze)}`,
      `VAT amount: ${context.vatGrosze ? groszeToPln(context.vatGrosze) : "No VAT"}`,
      `Project total used for schedule: ${groszeToPln(context.grossGrosze)}`,
      `Payment model: ${context.model.label}`,
      "",
      "Payment rows:",
      ...rows.map((row) => `${row.invoiceLabel} | ${row.type} | ${row.pct}% | Issue: ${row.issueDate} | Due: ${row.dueDate} | Amount: ${groszeToPln(row.amountGrosze)}`),
      "",
      "Disclaimer: Planning support only. Not accounting, tax, legal, or contract advice."
    ].join("\n");
  }

  async function copyPlan() {
    if (!latestPlanText) {
      copyMessage.textContent = "No valid payment plan to copy yet.";
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
      copyMessage.textContent = "Payment plan copied.";
      copyMessage.className = "message success";
    } catch {
      copyMessage.textContent = "Copy failed in this browser. Select and copy manually from the schedule.";
      copyMessage.className = "message error";
    }
  }

  function updateCustomVisibility() {
    customSplitFields.hidden = paymentModel.value !== "custom";
  }

  form.addEventListener("input", calculate);
  form.addEventListener("change", calculate);
  paymentModel.addEventListener("change", () => {
    updateCustomVisibility();
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
      fields.customDeposit.value = "40";
      fields.customMilestone.value = "40";
      fields.customFinal.value = "20";
      updateCustomVisibility();
      calculate();
    }, 0);
  });

  updateCustomVisibility();
  calculate();
})();
