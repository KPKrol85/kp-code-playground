function SectionHeader({ eyebrow, title, description, align = "left" }) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-tight text-charcoal-900 dark:text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-charcoal-700 dark:text-cream-200/72">{description}</p>
    </div>
  );
}

export default SectionHeader;
