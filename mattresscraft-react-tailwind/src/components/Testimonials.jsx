import { testimonials } from "../data/siteData.js";
import SectionHeader from "./SectionHeader.jsx";

function Testimonials() {
  return (
    <section className="section-shell py-16" id="reviews">
      <SectionHeader
        eyebrow="Customer stories"
        title="Realistic proof points for direct mattress buying."
        description="Testimonials show product confidence, dispatch reliability, and the value of expert consultation."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="rounded-2xl border border-cream-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.06]">
            <blockquote className="text-lg leading-8 text-charcoal-800 dark:text-cream-50">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-6 border-t border-cream-200 pt-4 dark:border-white/10">
              <p className="font-black text-charcoal-900 dark:text-white">{testimonial.name}</p>
              <p className="text-sm text-charcoal-700 dark:text-cream-200/72">{testimonial.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
