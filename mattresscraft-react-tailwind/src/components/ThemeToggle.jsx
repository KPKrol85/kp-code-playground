function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={onToggle}
      className="group inline-flex h-11 items-center gap-2 rounded-full border border-cream-200 bg-white px-2 py-1 text-charcoal-900 shadow-soft transition hover:border-forge-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forge-500/30 dark:border-white/10 dark:bg-charcoal-800 dark:text-cream-50 dark:hover:border-forge-500"
    >
      <span className={`grid h-8 w-8 place-items-center rounded-full transition ${isDark ? "bg-transparent text-cream-200" : "bg-amber-100 text-amber-700"}`}>
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.95-6.95 1.41-1.41M3.64 20.36l1.41-1.41m0-13.9L3.64 3.64m16.72 16.72-1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </span>
      <span className={`grid h-8 w-8 place-items-center rounded-full transition ${isDark ? "bg-forge-500 text-white" : "bg-transparent text-charcoal-700"}`}>
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20.5 14.5A7.75 7.75 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </span>
    </button>
  );
}

export default ThemeToggle;
