import Button from "./Button.jsx";

function ProductCard({ product }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-cream-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-premium dark:border-white/10 dark:bg-white/[0.06]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="rounded-full bg-cream-100 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-forge-700 dark:bg-forge-500/18 dark:text-forge-100">
            {product.badge}
          </p>
          <h3 className="mt-4 text-2xl font-black text-charcoal-900 dark:text-white">{product.name}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-charcoal-700 dark:text-cream-200/72">{product.description}</p>
      <dl className="mt-5 grid gap-3 border-y border-cream-200 py-5 text-sm dark:border-white/10">
        <div className="flex justify-between gap-4"><dt className="font-bold text-charcoal-700 dark:text-cream-200/72">Firmness</dt><dd>{product.firmness}</dd></div>
        <div className="flex justify-between gap-4"><dt className="font-bold text-charcoal-700 dark:text-cream-200/72">Height</dt><dd>{product.height}</dd></div>
        <div className="flex justify-between gap-4"><dt className="font-bold text-charcoal-700 dark:text-cream-200/72">Build</dt><dd className="text-right">{product.layers}</dd></div>
      </dl>
      <div className="mt-auto pt-5">
        <p className="text-sm font-bold text-charcoal-700 dark:text-cream-200/72">From</p>
        <p className="font-display text-4xl font-bold text-forge-900 dark:text-forge-100">{product.price}</p>
        <Button href="#finder" className="mt-4 w-full">Check fit</Button>
      </div>
    </article>
  );
}

export default ProductCard;
