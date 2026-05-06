import { useState } from "react";
import { faqs } from "../data/siteData.js";
import SectionHeader from "./SectionHeader.jsx";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-shell py-16" id="faq">
      <SectionHeader
        eyebrow="FAQ"
        title="Answers for common buying questions."
        description="A compact accordion with accessible buttons, visible state, and clear content structure."
        align="center"
      />
      <div className="mx-auto mt-10 grid max-w-3xl gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;
          return (
            <div key={faq.question} className="rounded-2xl border border-cream-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/[0.06]">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left font-black text-charcoal-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forge-500/30 dark:text-white"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{faq.question}</span>
                <span aria-hidden="true" className="text-2xl text-forge-700 dark:text-forge-100">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div id={answerId} className="border-t border-cream-200 px-5 py-5 text-charcoal-700 dark:border-white/10 dark:text-cream-200/72">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;
