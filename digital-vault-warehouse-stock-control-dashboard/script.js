const STORAGE_KEY = "kpcode_warehouse_stock_dashboard_v1";
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "PLN" });

const DEMO = [
  ["Eco Shipping Box M", "PKG-BOX-M-120", "Ecommerce packaging", 34, 40, 120, 2.2, "PackRight Sp. z o.o.", 5, "2026-04-20", "A1-R2", "Fast moving"],
  ["Bubble Wrap Roll 50m", "PKG-BUB-50", "Shipping materials", 12, 20, 60, 14.9, "PackRight Sp. z o.o.", 7, "2026-03-05", "A1-R5", "Low stock"],
  ["Servo Motor 12V", "WSH-SRV-12", "Workshop parts", 6, 15, 40, 48.5, "MotionCore Ltd", 16, "2026-01-18", "B3-R1", "Critical spare"],
  ["USB-C Cable 1m", "ELE-USBC-1", "Electronics accessories", 220, 80, 180, 7.4, "WireLane", 12, "2026-04-28", "C2-R4", "Overstock trend"],
  ["Thermal Label 100x150", "SHP-LBL-100", "Shipping materials", 4, 30, 90, 0.85, "LabelHub", 10, "2026-02-01", "A2-R2", "Very low"],
  ["Printer Toner Black", "OFF-TON-BLK", "Office supplies", 9, 8, 20, 159, "Office Market", 3, "2026-04-25", "D1-R1", "OK"],
  ["HVAC Filter X200", "SRV-HVAC-200", "Service components", 31, 20, 45, 26, "", 0, "2025-10-11", "E3-R2", "Supplier pending"],
  ["Nitrile Gloves M", "CON-GLV-M", "Consumables", 140, 120, 220, 0.68, "SafeHands", 6, "2026-04-22", "F1-R3", "Stable"],
  ["Cable Ties 200mm", "WSH-TIE-200", "Workshop parts", 500, 150, 320, 0.12, "FixFast", 9, "2025-12-10", "B1-R6", "Slow movement"],
  ["Corrugated Mailer L", "PKG-MLR-L", "Ecommerce packaging", 0, 25, 85, 3.1, "PackRight Sp. z o.o.", 5, "2026-02-20", "A3-R1", "Out of stock"],
  ["POS Receipt Roll", "OFF-REC-80", "Office supplies", 18, 25, 70, 4.2, "Office Market", 4, "2026-04-02", "D1-R4", "Below min"],
  ["Router Backup PSU", "ELE-PSU-RTR", "Electronics accessories", 3, 6, 16, 210, "NetTools", 21, "2025-11-05", "C4-R2", "Long lead time"],
].map((item, i) => ({ id: `p-${i + 1}`, name: item[0], sku: item[1], category: item[2], currentStock: item[3], minimumStock: item[4], optimalStock: item[5], unitCost: item[6], supplier: item[7], leadTime: item[8], lastMovement: item[9], location: item[10], notes: item[11] }));

const state = { products: loadData(), search: "", category: "All", status: "All", supplier: "All", sort: "risk-desc", editingId: null };
const el = (id) => document.getElementById(id);

function loadData() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || structuredClone(DEMO); } catch { return structuredClone(DEMO); } }
function saveData() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.products)); } catch {} }
const daysSince = (d) => Math.floor((Date.now() - new Date(d).getTime()) / 86400000);

function evaluateProduct(p) {
  const inventoryValue = p.currentStock * p.unitCost;
  const staleDays = daysSince(p.lastMovement);
  let status = "OK", score = 5;
  if (!p.supplier) { status = "No supplier"; score += 25; }
  if (p.currentStock === 0 || p.currentStock <= p.minimumStock * 0.35) { status = "Critical"; score += 40; }
  else if (p.currentStock < p.minimumStock) { status = "Low stock"; score += 25; }
  if (p.currentStock > p.optimalStock * 1.35) { status = "Overstock"; score += 20; }
  if (staleDays > 90) { status = "Stale stock"; score += 18; }
  if ((staleDays > 90 && p.currentStock > p.optimalStock) || (!p.supplier && p.currentStock < p.minimumStock)) { status = "Review needed"; score += 12; }
  if (p.leadTime >= 14) score += 12;
  if (inventoryValue > 3000) score += 7;
  if ((p.notes || "").trim().length < 3) score += 4;
  score = Math.max(0, Math.min(100, Math.round(score)));
  const riskLabel = score <= 25 ? "Low risk" : score <= 50 ? "Medium risk" : score <= 75 ? "High risk" : "Critical risk";
  let recommendation = "No immediate action needed.";
  if (status === "Critical") recommendation = `Order ${Math.max(0, p.optimalStock - p.currentStock)} units to reach optimal stock. Critical: current stock is below threshold.`;
  else if (status === "Low stock") recommendation = `Order ${Math.max(0, p.optimalStock - p.currentStock)} units to reach optimal stock.`;
  else if (status === "Overstock") recommendation = "Consider reducing future orders — stock is above optimal level.";
  else if (status === "Stale stock") recommendation = "Review item movement — product may be stale.";
  else if (status === "No supplier") recommendation = "Add supplier details before relying on this item operationally.";
  else if (status === "Review needed") recommendation = "Review supplier lead time and movement trend before next order.";
  return { ...p, inventoryValue, staleDays, status, score, riskLabel, recommendation };
}

function filteredProducts(evaluated) {
  return evaluated.filter((p) =>
    [p.name, p.sku].join(" ").toLowerCase().includes(state.search.toLowerCase()) &&
    (state.category === "All" || p.category === state.category) &&
    (state.status === "All" || p.status === state.status) &&
    (state.supplier === "All" || (p.supplier || "Unassigned") === state.supplier)
  ).sort((a,b)=> {
    const [f,d] = state.sort.split("-");
    const dir = d === "asc" ? 1 : -1;
    const map = { risk: a.score - b.score, value: a.inventoryValue - b.inventoryValue, stock: a.currentStock - b.currentStock, movement: new Date(a.lastMovement) - new Date(b.lastMovement) };
    return map[f] * dir;
  });
}

function render() {
  const evaluated = state.products.map(evaluateProduct);
  const view = filteredProducts(evaluated);
  renderKPIs(evaluated); renderFilters(evaluated); renderInventory(view); renderPurchase(evaluated); renderInsights(evaluated); saveData();
}

function renderKPIs(data) {
  const over = data.filter(p=>p.status==="Overstock").length, low = data.filter(p=>p.status==="Low stock").length, critical = data.filter(p=>p.status==="Critical").length, stale = data.filter(p=>p.status==="Stale stock").length;
  const restock = data.reduce((s,p)=> s + (p.currentStock < p.minimumStock ? (p.optimalStock - p.currentStock) * p.unitCost : 0), 0);
  const cards = [
    ["Total products", data.length], ["Total inventory value", currency.format(data.reduce((s,p)=>s+p.inventoryValue,0))], ["Low-stock items", low], ["Critical-stock items", critical], ["Overstock items", over], ["Stale-stock items", stale], ["Estimated restock cost", currency.format(restock)], ["Average stock risk score", (data.reduce((s,p)=>s+p.score,0)/Math.max(1,data.length)).toFixed(1)]
  ];
  el("kpiGrid").innerHTML = cards.map(c=>`<article class="kpi__card"><p class="kpi__label">${c[0]}</p><p class="kpi__value">${c[1]}</p></article>`).join("");
}

function renderFilters(data) {
  const toOptions = (id, items) => { const e = el(id); const prev = e.value; e.innerHTML = ["All", ...new Set(items)].map(v=>`<option>${v || "Unassigned"}</option>`).join(""); e.value = prev || "All"; };
  toOptions("categoryFilter", data.map(p=>p.category)); toOptions("statusFilter", data.map(p=>p.status)); toOptions("supplierFilter", data.map(p=>p.supplier || "Unassigned"));
}

function priorityFor(p){ if (p.status==="Critical") return "Order now"; if (["Low stock","No supplier","Review needed"].includes(p.status)) return "Review this week"; if (["Overstock","Stale stock"].includes(p.status)) return "Monitor"; return "No action needed"; }
function renderPurchase(data){
  const items = data.filter(p=>p.currentStock < p.minimumStock).map(p=>({ ...p, qty: Math.max(0,p.optimalStock-p.currentStock), priority: priorityFor(p), cost: Math.max(0,p.optimalStock-p.currentStock)*p.unitCost }));
  el("purchaseEmpty").hidden = items.length !== 0;
  el("purchaseList").innerHTML = items.map(i=>`<div class="card"><strong>${i.name}</strong> (${i.sku}) · ${i.supplier || "Unassigned"}<br>Qty: ${i.qty} · Priority: ${i.priority} · Est. Cost: ${currency.format(i.cost)}</div>`).join("");
  el("copyPurchaseList").onclick = async () => {
    const text = items.map(i=>`${i.priority} | ${i.name} (${i.sku}) | Supplier: ${i.supplier || "Unassigned"} | Qty: ${i.qty} | Cost: ${currency.format(i.cost)}`).join("\n") || "No items currently require purchasing.";
    try { await navigator.clipboard.writeText(text); el("copyFeedback").textContent = "Purchase list copied successfully."; } catch { el("copyFeedback").textContent = "Copy unavailable. Please copy manually."; }
  };
}

function renderInventory(data){
  el("inventoryEmpty").hidden = data.length !== 0;
  const row = (p)=>`<tr><td>${p.name}<br><small>${p.location}</small></td><td>${p.sku}</td><td>${p.category}</td><td>${p.currentStock}</td><td>${p.minimumStock}</td><td>${p.optimalStock}</td><td>${currency.format(p.unitCost)}</td><td>${currency.format(p.inventoryValue)}</td><td>${p.supplier || "Unassigned"}</td><td>${p.leadTime}d</td><td>${p.lastMovement}</td><td><span class="tag tag--${p.status.toLowerCase().replace(/\s+/g,'-')}">${p.status}</span></td><td>${p.score} (${p.riskLabel})</td><td>${p.recommendation}</td><td><button data-edit="${p.id}" class="button button--ghost">Edit</button> <button data-delete="${p.id}" class="button button--ghost">Delete</button></td></tr>`;
  el("inventoryBody").innerHTML = data.map(row).join("");
  el("inventoryCards").innerHTML = data.map(p=>`<article class="card"><h3>${p.name}</h3><p><strong>SKU:</strong> ${p.sku} | <strong>Status:</strong> ${p.status}</p><p><strong>Stock:</strong> ${p.currentStock}/${p.optimalStock} (min ${p.minimumStock})</p><p><strong>Risk:</strong> ${p.score} (${p.riskLabel})</p><p><strong>Value:</strong> ${currency.format(p.inventoryValue)} | <strong>Supplier:</strong> ${p.supplier || "Unassigned"}</p><p>${p.recommendation}</p><p><button data-edit="${p.id}" class="button button--ghost">Edit</button> <button data-delete="${p.id}" class="button button--ghost">Delete</button></p></article>`).join("");
  document.querySelectorAll("[data-delete]").forEach(b=>b.onclick=()=>{ state.products = state.products.filter(p=>p.id!==b.dataset.delete); render(); });
  document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>startEdit(b.dataset.edit));
}

function renderInsights(data){
  const msg = [
    `${data.filter(p=>p.status==="Critical").length} products need immediate restock.",`,
    `${data.filter(p=>p.status==="Overstock").length} products may be tying up cash due to overstock.",`,
    `${data.filter(p=>!p.supplier).length} items have no supplier assigned.",`,
    `Estimated restock cost is ${currency.format(data.reduce((s,p)=> s + (p.currentStock < p.minimumStock ? (p.optimalStock - p.currentStock) * p.unitCost : 0), 0))}.`
  ];
  el("insightsList").innerHTML = msg.map(m=>`<li>${m.replace('",','')}</li>`).join("");
  el("insightsLive").textContent = msg.join(" ");
}

function startEdit(id){
  const p = state.products.find(x=>x.id===id); if(!p) return;
  const f = el("productForm"); Object.entries({name:p.name,sku:p.sku,category:p.category,currentStock:p.currentStock,minimumStock:p.minimumStock,optimalStock:p.optimalStock,unitCost:p.unitCost,supplier:p.supplier,leadTime:p.leadTime,lastMovement:p.lastMovement,location:p.location,notes:p.notes}).forEach(([k,v])=>f.elements[k].value=v);
  state.editingId = id; el("formSuccess").textContent = `Editing ${p.name}. Save to update.`;
}

function bind() {
  [["searchInput","search"],["categoryFilter","category"],["statusFilter","status"],["supplierFilter","supplier"],["sortBy","sort"]].forEach(([id,key])=>el(id).addEventListener("input",e=>{state[key]=e.target.value; render();}));
  el("resetButton").onclick = () => { state.products = structuredClone(DEMO); state.editingId = null; localStorage.removeItem(STORAGE_KEY); render(); };
  el("productForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    const f = e.currentTarget, data = Object.fromEntries(new FormData(f).entries());
    const err = [];
    ["currentStock","minimumStock","optimalStock","unitCost","leadTime"].forEach(k=>{ if(data[k]!=="" && Number(data[k])<0) err.push(`${k} cannot be negative.`); });
    if (Number(data.optimalStock) < Number(data.minimumStock)) err.push("Optimal stock cannot be lower than minimum stock.");
    if (Number.isNaN(Number(data.unitCost))) err.push("Unit cost must be a valid number.");
    if (err.length) { el("formError").textContent = err.join(" "); el("formSuccess").textContent = ""; return; }
    const payload = { id: state.editingId || `p-${Date.now()}`, name:data.name.trim(), sku:data.sku.trim(), category:data.category.trim(), currentStock:Number(data.currentStock), minimumStock:Number(data.minimumStock), optimalStock:Number(data.optimalStock), unitCost:Number(data.unitCost), supplier:data.supplier.trim(), leadTime:Number(data.leadTime || 0), lastMovement:data.lastMovement, location:data.location.trim(), notes:data.notes.trim() };
    if (state.editingId) state.products = state.products.map(p=>p.id===state.editingId?payload:p);
    else state.products.push(payload);
    state.editingId = null; f.reset(); el("formError").textContent = ""; el("formSuccess").textContent = "Product saved successfully."; render();
  });
}

bind(); render();
