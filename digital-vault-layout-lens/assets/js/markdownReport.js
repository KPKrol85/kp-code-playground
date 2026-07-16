function line(value = '') { return String(value).replace(/\r\n?/g, '\n'); }
function inline(value = '') { return line(value).replace(/\s+/g, ' ').trim() || '—'; }
function block(value = '') { return line(value).split('\n').map((entry) => `  ${entry || ' '}`).join('\n'); }
function scoreLabel(percent) { return percent === null || percent === undefined ? 'Not enough checked rules' : `${percent}%`; }

export function serializeManualAuditReportMarkdown(report) {
  const output = [];
  output.push(`# ${inline(report.title)}`, '');
  output.push('## Audit context', '');
  output.push(`- Selected preset: ${inline(report.preset?.name)} (${inline(report.preset?.id)})`);
  output.push(`- Selected rule pack: ${inline(report.rulePack?.name)} (${inline(report.rulePack?.id)})`);
  output.push(`- Selected severity profile: ${inline(report.severityProfile?.name)} (${inline(report.severityProfile?.id)})`, '');
  output.push('## Overall score', '');
  output.push(`- Weighted score: ${scoreLabel(report.score?.scorePercent)}`);
  output.push(`- Points: ${report.score?.earnedPoints ?? 0} earned / ${report.score?.possiblePoints ?? 0} possible`);
  output.push(`- Reviewed/applicable rules: ${(report.score?.passedRules || 0) + (report.score?.needsWorkRules || 0)} / ${(report.score?.totalRules || 0) - (report.score?.notApplicableRules || 0)}`);
  output.push(`- Checked rules including not applicable: ${report.score?.checkedRules ?? 0}`);
  output.push(`- Needs work: ${report.score?.needsWorkRules ?? 0}`);
  output.push(`- Not applicable: ${report.score?.notApplicableRules ?? 0}`, '');
  output.push('## Category scores and progress', '');
  if (report.categoryScores?.length) {
    report.categoryScores.forEach((category) => {
      output.push(`- ${inline(category.categoryName)}: ${scoreLabel(category.scorePercent)}; ${category.reviewedRules} / ${category.applicableRules} reviewed; ${category.needsWorkRules} needs work; ${category.notCheckedRules} not checked.`);
    });
  } else {
    output.push('No applicable categories for this audit state.');
  }
  output.push('', '## Manual findings', '');
  if (report.findings?.length) {
    report.findings.forEach((finding) => {
      output.push(`### ${inline(finding.issueId)} — ${inline(finding.title)}`, '');
      output.push(`- Rule ID: ${inline(finding.ruleId)}`);
      output.push(`- Category: ${inline(finding.categoryName)}`);
      output.push(`- Severity: ${inline(finding.severity)}`);
      output.push(`- Description: ${inline(finding.description)}`);
      output.push(`- Reviewer note: ${finding.note ? '' : 'No reviewer note provided.'}`);
      if (finding.note) output.push(block(finding.note));
      output.push('');
    });
  } else {
    output.push('No manual findings. No applicable rules are currently marked Needs work.', '');
  }
  output.push('## Reviewer notes', '');
  if (report.notes?.length) {
    report.notes.forEach((note) => { output.push(`### ${inline(note.ruleTitle)} (${inline(note.ruleId)})`, '', block(note.note), ''); });
  } else {
    output.push('No reviewer notes have been added.', '');
  }
  output.push('## Recommendations', '');
  if (report.recommendations?.length) {
    report.recommendations.forEach((recommendation) => {
      output.push(`### ${inline(recommendation.title)}`, '');
      output.push(`- Issue ID: ${inline(recommendation.issueId)}`);
      output.push(`- Category: ${inline(recommendation.categoryName)}`);
      output.push(`- Priority: ${inline(recommendation.priority)}`);
      output.push(`- Recommendation: ${inline(recommendation.description)}`, '');
    });
  } else {
    output.push('No recommendations. Mark rules as Needs work to generate deterministic recommendations.');
  }
  return `${output.join('\n').replace(/\n{3,}/g, '\n\n')}\n`;
}
