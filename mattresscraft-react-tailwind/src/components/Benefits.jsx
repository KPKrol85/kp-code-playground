import { benefits } from "../data/siteData.js";
import SectionHeader from "./SectionHeader.jsx";

function Benefits() {
  return (
    <section className="section-shell py-16">
      <SectionHeader
        eyebrow="Customer benefits"
        title="Business-grade manufacturing with customer-friendly delivery."
        description="The strongest value proposition is simple: controlled production, practical support, and direct-to-customer economics."
        align="center"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div key={benefit} className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.06]">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-forge-50 text-forge-700 dark:bg-forge-500/18 dark:text-forge-100" aria-hidden="true">✓</span>
            <h3 className="mt-5 text-lg font-black text-charcoal-900 dark:text-white">{benefit}</h3>
            <p className="mt-2 text-sm leading-6 text-charcoal-700 dark:text-cream-200/72">Clear customer value that supports confident mattress selection and purchase decisions.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Benefits;
