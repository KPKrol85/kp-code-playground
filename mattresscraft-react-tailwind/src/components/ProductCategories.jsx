import { categories } from "../data/siteData.js";
import SectionHeader from "./SectionHeader.jsx";

function ProductCategories() {
  return (
    <section className="section-shell py-16" id="products">
      <SectionHeader
        eyebrow="Product categories"
        title="A mattress range built around real sleep needs."
        description="Each collection is produced with controlled materials, repeatable construction, and clear comfort positioning."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <article key={category.title} className="group rounded-2xl border border-cream-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-premium dark:border-white/10 dark:bg-white/[0.06]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forge-50 text-sm font-black text-forge-700 dark:bg-forge-500/18 dark:text-forge-100">
              {category.accent}
            </div>
            <h3 className="mt-6 text-xl font-black text-charcoal-900 dark:text-white">{category.title}</h3>
            <p className="mt-3 text-sm leading-6 text-charcoal-700 dark:text-cream-200/72">{category.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductCategories;
