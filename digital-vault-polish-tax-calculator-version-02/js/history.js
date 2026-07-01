const HISTORY_KEY = "tax-calculator-history-v2";
const MAX_HISTORY = 8;

function readHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
}

export function writeHistoryEntry(payload) {
  const next = [payload, ...readHistory()].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}

export function renderHistory(historyEl, { contractNames, formatCurrency }) {
  const items = readHistory();
  historyEl.innerHTML = items.length
    ? items.map((item) => `<li><button type="button" class="history-btn" data-id="${item.id}">${item.timestamp} • ${contractNames[item.contractType]} • ${formatCurrency(item.inputAmount)} → ${formatCurrency(item.net)}</button></li>`).join("")
    : '<li class="history-empty">Brak zapisanych kalkulacji.</li>';
}

export function findHistoryEntry(id) {
  return readHistory().find((item) => item.id === id);
}
