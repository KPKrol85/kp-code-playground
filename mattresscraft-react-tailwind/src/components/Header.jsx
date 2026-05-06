import { useState } from "react";
import { navLinks } from "../data/siteData.js";
import Button from "./Button.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function Header({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200/80 bg-cream-50/88 backdrop-blur-xl dark:border-white/10 dark:bg-charcoal-900/88">
      <nav className="section-shell flex min-h-20 items-center justify-between gap-4" aria-label="Primary navigation">
        <a href="#" className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forge-500/30">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-charcoal-900 text-sm font-black text-white dark:bg-forge-500">SF</span>
          <span>
            <span className="block text-base font-black tracking-tight dark:text-white">SleepForge</span>
            <span className="block text-xs font-bold uppercase tracking-[0.16em] text-charcoal-700 dark:text-cream-200/70">Mattress Manufacturing</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} className="text-sm font-bold text-charcoal-700 transition hover:text-forge-700 dark:text-cream-200/76 dark:hover:text-white" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Button href="#finder">Get consultation</Button>
        </div>

        <div className="ml-auto lg:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-cream-200 bg-white text-charcoal-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forge-500/30 dark:border-white/10 dark:bg-charcoal-800 dark:text-white lg:hidden"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span aria-hidden="true" className="text-xl leading-none">{isOpen ? "×" : "☰"}</span>
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-navigation" className="border-t border-cream-200 bg-cream-50 dark:border-white/10 dark:bg-charcoal-900 lg:hidden">
          <div className="section-shell grid gap-2 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-lg px-3 py-3 text-sm font-bold text-charcoal-700 hover:bg-white dark:text-cream-200/80 dark:hover:bg-white/5 dark:hover:text-white"
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button href="#finder" className="mt-2" onClick={() => setIsOpen(false)}>Get consultation</Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
