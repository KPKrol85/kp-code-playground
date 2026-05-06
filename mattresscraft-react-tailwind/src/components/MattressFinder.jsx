import { useMemo, useState } from "react";
import Button from "./Button.jsx";
import SectionHeader from "./SectionHeader.jsx";

const positions = ["Side", "Back", "Stomach", "Mixed"];
const firmnessOptions = ["Soft", "Medium", "Firm"];
const weights = ["Under 70 kg", "70-95 kg", "Over 95 kg"];

function getRecommendation(position, firmness, weight) {
  if (firmness === "Firm" || weight === "Over 95 kg") {
    return "SleepForge Hybrid Pro";
  }

  if (position === "Side" || firmness === "Soft") {
    return "SleepForge Hotel Elite";
  }

  if (position === "Back" && firmness === "Medium") {
    return "SleepForge AirFlex";
  }

  return "SleepForge Balance";
}

function OptionGroup({ label, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="text-sm font-black text-charcoal-900 dark:text-white">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={`rounded-lg border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forge-500/30 ${
                selected
                  ? "border-forge-700 bg-forge-700 text-white"
                  : "border-cream-200 bg-white text-charcoal-700 hover:border-forge-500 dark:border-white/10 dark:bg-white/[0.06] dark:text-cream-200/80 dark:hover:border-forge-500"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function MattressFinder() {
  const [position, setPosition] = useState("Side");
  const [firmness, setFirmness] = useState("Medium");
  const [weight, setWeight] = useState("70-95 kg");

  const recommendation = useMemo(
    () => getRecommendation(position, firmness, weight),
    [position, firmness, weight]
  );

  return (
    <section className="section-shell py-16" id="finder">
      <SectionHeader
        eyebrow="Mattress finder"
        title="A simple React-powered recommendation panel."
        description="Use state to select sleep preferences and show a lightweight recommendation based on customer inputs."
      />
      <div className="mt-10 grid gap-5 rounded-3xl border border-cream-200 bg-white p-5 shadow-premium dark:border-white/10 dark:bg-white/[0.06] lg:grid-cols-[1fr_0.8fr]">
        <div className="grid gap-7 rounded-2xl bg-cream-50 p-5 dark:bg-charcoal-800">
          <OptionGroup label="Sleeping position" options={positions} value={position} onChange={setPosition} />
          <OptionGroup label="Preferred firmness" options={firmnessOptions} value={firmness} onChange={setFirmness} />
          <OptionGroup label="Body weight range" options={weights} value={weight} onChange={setWeight} />
        </div>
        <aside className="rounded-2xl bg-charcoal-900 p-6 text-white dark:bg-forge-900" aria-live="polite">
          <p className="eyebrow text-cream-200">Recommended model</p>
          <h3 className="mt-3 font-display text-4xl leading-tight">{recommendation}</h3>
          <p className="mt-4 text-white/72">
            Based on {position.toLowerCase()} sleeping, {firmness.toLowerCase()} preference, and {weight.toLowerCase()} body weight range.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="#products" variant="light">Compare products</Button>
            <Button href="#faq" variant="outlineLight">Read FAQ</Button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default MattressFinder;
