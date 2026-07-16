function appendText(parent, tag, text, className) { const el = document.createElement(tag); if (className) el.className = className; el.textContent = text; parent.append(el); return el; }
function appendMeta(parent, term, value) { const wrap = document.createElement('div'); appendText(wrap, 'dt', term); appendText(wrap, 'dd', value); parent.append(wrap); }
function scoreLabel(percent) { return percent === null || percent === undefined ? 'Not enough checked rules' : `${percent}%`; }

export function renderManualAuditReportView(container, report) {
  if (!container) return;
  container.textContent = '';
  container.hidden = false;
  const article = document.createElement('article'); article.className = 'print-report'; article.setAttribute('aria-labelledby', 'print-report-title'); article.dataset.templateId = report.template?.id || '';
  const header = document.createElement('header'); header.className = 'print-report__header';
  appendText(header, 'p', report.template?.labels?.eyebrow || 'Exportable manual audit report', 'eyebrow');
  appendText(header, 'h2', report.title, '').id = 'print-report-title';
  appendText(header, 'p', report.template?.labels?.intro || 'Generated from deterministic manual audit report content.');
  const context = document.createElement('dl'); context.className = 'report-meta';
  appendMeta(context, 'Report template', `${report.template.name} (${report.template.id})`);
  appendMeta(context, 'Preset', `${report.preset.name} (${report.preset.id})`);
  appendMeta(context, 'Rule pack', `${report.rulePack.name} (${report.rulePack.id})`);
  appendMeta(context, 'Severity profile', `${report.severityProfile.name} (${report.severityProfile.id})`);
  header.append(context); article.append(header);
  (report.template?.sectionOrder || ['summary', 'categories', 'findings', 'notes', 'recommendations']).forEach((sectionId) => appendReportSection(article, report, sectionId));
  container.append(article);
}

function appendReportSection(article, report, sectionId) {
  if (sectionId === 'summary') appendSummarySection(article, report);
  if (sectionId === 'categories') appendCategorySection(article, report);
  if (sectionId === 'findings') appendFindingsSection(article, report);
  if (sectionId === 'notes') appendNotesSection(article, report);
  if (sectionId === 'recommendations') appendRecommendationsSection(article, report);
}
function sectionTitle(report, sectionId, fallback) { return report.template?.labels?.[sectionId] || fallback; }
function appendSummarySection(article, report) {
  const summary = document.createElement('section'); summary.setAttribute('aria-labelledby', 'report-summary-title'); summary.className = 'print-report__section';
  appendText(summary, 'h3', sectionTitle(report, 'summary', 'Overall score summary')).id = 'report-summary-title';
  const stats = document.createElement('dl'); stats.className = 'report-stat-grid';
  appendMeta(stats, 'Weighted score', scoreLabel(report.score.scorePercent));
  appendMeta(stats, 'Points', `${report.score.earnedPoints} earned / ${report.score.possiblePoints} possible`);
  appendMeta(stats, 'Reviewed/applicable', `${report.score.passedRules + report.score.needsWorkRules} / ${report.score.totalRules - report.score.notApplicableRules}`);
  appendMeta(stats, 'Needs work', String(report.score.needsWorkRules));
  summary.append(stats); article.append(summary);
}
function appendCategorySection(article, report) {
  const categories = document.createElement('section'); categories.setAttribute('aria-labelledby', 'report-categories-title'); categories.className = 'print-report__section';
  appendText(categories, 'h3', sectionTitle(report, 'categories', 'Category score breakdown')).id = 'report-categories-title';
  const categoryList = document.createElement('ul'); categoryList.className = 'report-card-list';
  if (report.categoryScores.length) report.categoryScores.forEach((category) => { const li = document.createElement('li'); appendText(li, 'strong', `${category.categoryName}: ${scoreLabel(category.scorePercent)}`); appendText(li, 'span', `${category.reviewedRules} / ${category.applicableRules} reviewed · ${category.needsWorkRules} needs work · ${category.notCheckedRules} not checked`); categoryList.append(li); });
  else appendText(categories, 'p', 'No applicable categories for this audit state.', 'empty-state');
  categories.append(categoryList); article.append(categories);
}
function appendFindingsSection(article, report) {
  const findings = document.createElement('section'); findings.setAttribute('aria-labelledby', 'report-findings-title'); findings.className = 'print-report__section';
  appendText(findings, 'h3', sectionTitle(report, 'findings', 'Manual findings')).id = 'report-findings-title';
  if (report.findings.length) report.findings.forEach((finding) => { const item = document.createElement('article'); item.className = 'report-finding'; appendText(item, 'h4', `${finding.issueId} — ${finding.title}`); const meta = document.createElement('dl'); meta.className = 'report-meta'; appendMeta(meta, 'Rule ID', finding.ruleId); appendMeta(meta, 'Category', finding.categoryName); appendMeta(meta, 'Severity', finding.severity); item.append(meta); appendText(item, 'p', finding.description); appendText(item, 'p', finding.note || 'No reviewer note provided.', finding.note ? 'report-note' : 'empty-state'); findings.append(item); });
  else appendText(findings, 'p', 'No manual findings. No applicable rules are currently marked Needs work.', 'empty-state');
  article.append(findings);
}
function appendNotesSection(article, report) {
  const notes = document.createElement('section'); notes.setAttribute('aria-labelledby', 'report-notes-title'); notes.className = 'print-report__section';
  appendText(notes, 'h3', sectionTitle(report, 'notes', 'Reviewer notes')).id = 'report-notes-title';
  if (report.notes.length) report.notes.forEach((note) => { const item = document.createElement('article'); item.className = 'report-note-block'; appendText(item, 'h4', `${note.ruleTitle} (${note.ruleId})`); appendText(item, 'p', note.note, 'report-note'); notes.append(item); });
  else appendText(notes, 'p', 'No reviewer notes have been added.', 'empty-state');
  article.append(notes);
}
function appendRecommendationsSection(article, report) {
  const recs = document.createElement('section'); recs.setAttribute('aria-labelledby', 'report-recommendations-title'); recs.className = 'print-report__section';
  appendText(recs, 'h3', sectionTitle(report, 'recommendations', 'Recommendations')).id = 'report-recommendations-title';
  if (report.recommendations.length) report.recommendations.forEach((recommendation) => { const item = document.createElement('article'); item.className = 'report-recommendation'; appendText(item, 'h4', recommendation.title); appendText(item, 'p', `${recommendation.issueId} · ${recommendation.categoryName} · ${recommendation.priority} priority`); appendText(item, 'p', recommendation.description); recs.append(item); });
  else appendText(recs, 'p', 'No recommendations. Mark rules as Needs work to generate deterministic recommendations.', 'empty-state');
  article.append(recs);
}
