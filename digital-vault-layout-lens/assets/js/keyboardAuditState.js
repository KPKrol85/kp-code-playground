export function createKeyboardAuditState() {
  return { active: false, index: -1, count: 0, returnFocusId: null, current: null, message: 'Keyboard audit has not started.' };
}

export function startKeyboardAudit(targets = [], returnFocusId = null) {
  if (!Array.isArray(targets) || targets.length === 0) {
    return { ...createKeyboardAuditState(), count: 0, returnFocusId, message: 'No sequential keyboard focus targets were detected.' };
  }
  return currentState(targets, 0, returnFocusId, 'Keyboard audit started.');
}

export function nextKeyboardAuditTarget(state, targets = []) {
  if (!state?.active) return startKeyboardAudit(targets, state?.returnFocusId || null);
  if (!Array.isArray(targets) || targets.length === 0) return startKeyboardAudit([], state.returnFocusId || null);
  return currentState(targets, Math.min((state.index ?? 0) + 1, targets.length - 1), state.returnFocusId || null, 'Moved to next keyboard focus target.');
}

export function previousKeyboardAuditTarget(state, targets = []) {
  if (!state?.active) return startKeyboardAudit(targets, state?.returnFocusId || null);
  if (!Array.isArray(targets) || targets.length === 0) return startKeyboardAudit([], state.returnFocusId || null);
  return currentState(targets, Math.max((state.index ?? 0) - 1, 0), state.returnFocusId || null, 'Moved to previous keyboard focus target.');
}

export function restartKeyboardAudit(state, targets = []) {
  return startKeyboardAudit(targets, state?.returnFocusId || null);
}

export function endKeyboardAudit(state, message = 'Keyboard audit ended.') {
  return { ...createKeyboardAuditState(), returnFocusId: state?.returnFocusId || null, message };
}

export function resetKeyboardAuditForPreviewRefresh(state) {
  return state?.active ? { ...createKeyboardAuditState(), returnFocusId: state.returnFocusId || null, message: 'Preview changed. Keyboard audit was reset safely.' } : createKeyboardAuditState();
}

function currentState(targets, index, returnFocusId, message) {
  const safeIndex = Math.max(0, Math.min(index, targets.length - 1));
  return { active: true, index: safeIndex, count: targets.length, returnFocusId, current: targets[safeIndex] || null, message };
}
