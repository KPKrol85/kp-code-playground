import Button from "./Button.jsx";

function Hero() {
  return (
    <section className="section-shell grid gap-10 pb-16 pt-12 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <p className="eyebrow">Own factory. Own warehouse. Direct delivery.</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.98] text-charcoal-900 dark:text-white md:text-7xl">
          Premium mattresses made where quality can be controlled.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-charcoal-700 dark:text-cream-200/72">
          SleepForge manufactures mattresses in-house, holds warehouse-ready stock, and helps customers choose the right model without showroom markup.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#products">Shop mattresses</Button>
          <Button href="#factory" variant="secondary">See our production</Button>
        </div>
        <div className="mt-8 grid gap-3 text-sm font-bold text-charcoal-700 dark:text-cream-200/80 sm:grid-cols-3">
          <span className="rounded-xl border border-cream-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.06]">In-house production</span>
          <span className="rounded-xl border border-cream-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.06]">Warehouse stock</span>
          <span className="rounded-xl border border-cream-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.06]">Direct delivery</span>
        </div>
      </div>

      <div className="relative">
        <div className="rounded-[2rem] border border-cream-200 bg-white p-5 shadow-premium dark:border-white/10 dark:bg-white/[0.06]">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-cream-100 to-forge-50 p-5 dark:from-white/10 dark:to-forge-900/40">
            <div className="rounded-3xl border border-white/80 bg-white/72 p-5 shadow-soft dark:border-white/10 dark:bg-charcoal-900/66">
              <div className="aspect-[4/2.55] rounded-2xl bg-charcoal-900 p-4 text-white">
                <div className="h-full rounded-xl border border-white/10 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,.18),transparent_32%),linear-gradient(135deg,#31423f,#101817)] p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-cream-200">Hybrid Pro</p>
                  <p className="mt-12 max-w-xs font-display text-3xl leading-tight">Zoned support with breathable comfort layers.</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["30 cm height", "7-zone core", "10-year warranty"].map((item) => (
                  <div key={item} className="rounded-xl bg-cream-50 px-4 py-3 text-sm font-bold text-charcoal-700 dark:bg-white/[0.06] dark:text-cream-200/80">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
