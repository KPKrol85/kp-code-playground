import { navLinks } from "../data/siteData.js";

function Footer() {
  return (
    <footer className="border-t border-cream-200 bg-white dark:border-white/10 dark:bg-charcoal-900">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <p className="text-xl font-black text-charcoal-900 dark:text-white">SleepForge</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-charcoal-700 dark:text-cream-200/72">
            Fictional premium mattress manufacturer with in-house production, warehouse availability, and direct customer delivery.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-charcoal-900 dark:text-white">Navigate</h2>
          <div className="mt-4 grid gap-2">
            {navLinks.map((link) => <a key={link.href} className="text-sm text-charcoal-700 hover:text-forge-700 dark:text-cream-200/72 dark:hover:text-white" href={link.href}>{link.label}</a>)}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-charcoal-900 dark:text-white">Products</h2>
          <div className="mt-4 grid gap-2 text-sm text-charcoal-700 dark:text-cream-200/72">
            <a href="#products">Foam mattresses</a>
            <a href="#products">Hybrid mattresses</a>
            <a href="#products">Hotel mattresses</a>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-charcoal-900 dark:text-white">Contact</h2>
          <div className="mt-4 grid gap-2 text-sm text-charcoal-700 dark:text-cream-200/72">
            <span>hello@sleepforge.example</span>
            <span>Warehouse Road 12</span>
            <a href="#legal">Privacy</a>
            <a href="#legal">Terms</a>
          </div>
        </div>
      </div>
      <div className="section-shell border-t border-cream-200 py-5 text-sm text-charcoal-700 dark:border-white/10 dark:text-cream-200/60">
        © 2026 SleepForge. Fictional learning project.
      </div>
    </footer>
  );
}

export default Footer;
