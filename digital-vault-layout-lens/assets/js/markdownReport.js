function line(value = '') { return String(value).replace(/\r\n?/g, '\n'); }
function inline(value = '') { return line(value).replace(/\s+/g, ' ').replace(/([\[\]`*_#|\\])/g, '\\$1').trim() || '—'; }
function block(value = '') { return line(value).split('\n').map((entry) => `  ${entry || ' '}`).join('\n'); }
function scoreLabel(percent) { return percent === null || percent === undefined ? 'Not enough checked rules' : `${percent}%`; }

export function serializeManualAuditReportMarkdown(report) {
  const output = [];
  output.push(`# ${inline(report.title)}`, '');
  output.push(`Template: ${inline(report.template?.name)}`, '');
  if (report.template?.labels?.intro) output.push(inline(report.template.labels.intro), '');
  output.push('## Audit context', '');
  output.push(`- Report template: ${inline(report.template?.name)} (${inline(report.template?.id)})`);
  output.push(`- Selected preset: ${inline(report.preset?.name)} (${inline(report.preset?.id)})`);
  output.push(`- Selected rule pack: ${inline(report.rulePack?.name)} (${inline(report.rulePack?.id)})`);
  output.push(`- Selected severity profile: ${inline(report.severityProfile?.name)} (${inline(report.severityProfile?.id)})`, '');
  appendScreenReaderSummary(output, report);
  (report.template?.sectionOrder || ['cover-metadata', 'executive-summary', 'summary', 'categories', 'findings', 'notes', 'recommendations']).forEach((sectionId) => appendSection(output, report, sectionId));
  return `${output.join('\n').replace(/\n{3,}/g, '\n\n')}\n`;
}

function appendScreenReaderSummary(output, report) {
  const summary = report.screenReaderSummary;
  if (!summary?.items?.length) return;
  output.push(`## ${inline(summary.title || 'Report summary for screen readers')}`, '');
  summary.items.forEach((item) => output.push(`- ${inline(item)}`));
  output.push('');
}

function appendSection(output, report, sectionId) {
  const labels = report.template?.labels || {};
  if (sectionId === 'cover-metadata') appendCoverMetadata(output, report, labels['cover-metadata'] || 'Report cover');
  if (sectionId === 'executive-summary') appendExecutiveSummary(output, report, labels['executive-summary'] || 'Executive summary');
  if (sectionId === 'summary') appendSummary(output, report, labels.summary || 'Overall score');
  if (sectionId === 'categories') appendCategories(output, report, labels.categories || 'Category scores and progress');
  if (sectionId === 'findings') appendFindings(output, report, labels.findings || 'Manual findings');
  if (sectionId === 'notes') appendNotes(output, report, labels.notes || 'Reviewer notes');
  if (sectionId === 'recommendations') appendRecommendations(output, report, labels.recommendations || 'Recommendations');
}


function appendCoverMetadata(output, report, title) {
  if (!report.metadataEntries?.length) return;
  output.push(`## ${inline(title)}`, '');
  report.metadataEntries.forEach((entry) => output.push(`- ${inline(report.template?.metadataLabels?.[entry.id] || entry.label)}: ${inline(entry.value)}`));
  output.push('');
}
function appendExecutiveSummary(output, report, title) {
  const sections = report.executiveSummary?.sections || [];
  if (!sections.length) return;
  output.push(`## ${inline(title)}`, '');
  sections.forEach((section) => {
    output.push(`### ${inline(section.title)}`, '');
    section.items.forEach((item) => output.push(`- ${inline(item)}`));
    output.push('');
  });
}
function appendSummary(output, report, title) {
  output.push(`## ${inline(title)}`, '');
  output.push(`- Weighted score: ${scoreLabel(report.score?.scorePercent)}`);
  output.push(`- Points: ${report.score?.earnedPoints ?? 0} earned / ${report.score?.possiblePoints ?? 0} possible`);
  output.push(`- Reviewed/applicable rules: ${(report.score?.passedRules || 0) + (report.score?.needsWorkRules || 0)} / ${(report.score?.totalRules || 0) - (report.score?.notApplicableRules || 0)}`);
  output.push(`- Checked rules including not applicable: ${report.score?.checkedRules ?? 0}`);
  output.push(`- Needs work: ${report.score?.needsWorkRules ?? 0}`);
  output.push(`- Not applicable: ${report.score?.notApplicableRules ?? 0}`, '');
}
function appendCategories(output, report, title) {
  output.push(`## ${inline(title)}`, '');
  if (report.categoryScores?.length) report.categoryScores.forEach((category) => output.push(`- ${inline(category.categoryName)}: ${scoreLabel(category.scorePercent)}; ${category.reviewedRules} / ${category.applicableRules} reviewed; ${category.needsWorkRules} needs work; ${category.notCheckedRules} not checked.`));
  else output.push('No applicable categories for this audit state.');
  output.push('');
}
function appendFindings(output, report, title) {
  output.push(`## ${inline(title)}`, '');
  if (report.findings?.length) report.findings.forEach((finding) => {
    output.push(`### ${inline(finding.issueId)} — ${inline(finding.title)}`, '', `- Rule ID: ${inline(finding.ruleId)}`, `- Category: ${inline(finding.categoryName)}`, `- Severity: ${inline(finding.severity)}`, `- Description: ${inline(finding.description)}`, `- Reviewer note: ${finding.note ? '' : 'No reviewer note provided.'}`);
    if (finding.note) output.push(block(finding.note));
    output.push('');
  });
  else output.push('No manual findings. No applicable rules are currently marked Needs work.', '');
}
function appendNotes(output, report, title) {
  output.push(`## ${inline(title)}`, '');
  if (report.notes?.length) report.notes.forEach((note) => { output.push(`### ${inline(note.ruleTitle)} (${inline(note.ruleId)})`, '', block(note.note), ''); });
  else output.push('No reviewer notes have been added.', '');
}
function appendRecommendations(output, report, title) {
  output.push(`## ${inline(title)}`, '');
  if (report.recommendations?.length) report.recommendations.forEach((recommendation) => output.push(`### ${inline(recommendation.title)}`, '', `- Issue ID: ${inline(recommendation.issueId)}`, `- Category: ${inline(recommendation.categoryName)}`, `- Priority: ${inline(recommendation.priority)}`, `- Recommendation: ${inline(recommendation.description)}`, ''));
  else output.push('No recommendations. Mark rules as Needs work to generate deterministic recommendations.');
}
