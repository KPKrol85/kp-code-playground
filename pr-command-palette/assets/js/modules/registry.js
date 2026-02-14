const requiredFields = ["id", "label", "keywords", "group", "run"];

function validateAction(action) {
  if (!action || typeof action !== "object") {
    throw new Error("Action must be an object.");
  }

  for (const field of requiredFields) {
    if (!(field in action)) {
      throw new Error(`Action is missing required field: ${field}`);
    }
  }

  if (typeof action.id !== "string" || !action.id.trim()) {
    throw new Error("Action id must be a non-empty string.");
  }

  if (typeof action.label !== "string" || !action.label.trim()) {
    throw new Error("Action label must be a non-empty string.");
  }

  if (!Array.isArray(action.keywords) || action.keywords.some((keyword) => typeof keyword !== "string")) {
    throw new Error("Action keywords must be an array of strings.");
  }

  if (typeof action.group !== "string" || !action.group.trim()) {
    throw new Error("Action group must be a non-empty string.");
  }

  if (action.shortcut && typeof action.shortcut !== "string") {
    throw new Error("Action shortcut must be a string.");
  }

  if (typeof action.run !== "function") {
    throw new Error("Action run must be a function.");
  }
}

export function createActionRegistry() {
  const actions = new Map();

  function registerAction(action) {
    validateAction(action);
    actions.set(action.id, action);
  }

  function registerActions(actionList) {
    if (!Array.isArray(actionList)) {
      throw new Error("registerActions expects an array.");
    }
    actionList.forEach(registerAction);
  }

  function unregisterAction(id) {
    actions.delete(id);
  }

  function getActions() {
    return Array.from(actions.values());
  }

  return {
    registerAction,
    registerActions,
    unregisterAction,
    getActions,
  };
}
