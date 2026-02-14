export function createToastManager() {
  const stack = document.createElement("div");
  stack.className = "toast-stack";
  document.body.append(stack);

  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type === "error" ? "toast--error" : ""}`.trim();
    toast.textContent = message;
    stack.append(toast);

    window.setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  return { showToast };
}
