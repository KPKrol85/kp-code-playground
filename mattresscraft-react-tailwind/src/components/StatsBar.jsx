import { stats } from "../data/siteData.js";

function StatsBar() {
  return (
    <section className="section-shell pb-16">
      <dl className="grid gap-3 rounded-2xl border border-cream-200 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-cream-50 px-5 py-4 dark:bg-charcoal-800">
            <dt className="text-sm font-bold text-charcoal-700 dark:text-cream-200/72">{stat.label}</dt>
            <dd className="mt-1 font-display text-4xl font-bold text-forge-900 dark:text-forge-100">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default StatsBar;
