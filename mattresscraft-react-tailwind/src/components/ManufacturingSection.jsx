import { manufacturingSteps } from "../data/siteData.js";
import SectionHeader from "./SectionHeader.jsx";

function ManufacturingSection() {
  return (
    <section className="section-shell grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" id="factory">
      <div>
        <SectionHeader
          eyebrow="Manufacturing advantage"
          title="Produced, checked, packed, and dispatched under one roof."
          description="SleepForge keeps production close to fulfillment, which means better consistency, clearer lead times, and fewer handoffs before delivery."
        />
      </div>
      <div className="rounded-3xl border border-cream-200 bg-white p-5 shadow-premium dark:border-white/10 dark:bg-white/[0.06]">
        <div className="grid gap-4">
          {manufacturingSteps.map((step, index) => (
            <div key={step} className="grid grid-cols-[3rem_1fr] gap-4 rounded-2xl bg-cream-50 p-4 dark:bg-charcoal-800">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-forge-700 font-black text-white dark:bg-forge-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-black text-charcoal-900 dark:text-white">{step}</h3>
                <p className="mt-1 text-sm text-charcoal-700 dark:text-cream-200/72">Documented production step with quality ownership and warehouse visibility.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ManufacturingSection;
