import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import StatsBar from "./components/StatsBar.jsx";
import ProductCategories from "./components/ProductCategories.jsx";
import FeaturedProducts from "./components/FeaturedProducts.jsx";
import ManufacturingSection from "./components/ManufacturingSection.jsx";
import MattressFinder from "./components/MattressFinder.jsx";
import Benefits from "./components/Benefits.jsx";
import Testimonials from "./components/Testimonials.jsx";
import FAQ from "./components/FAQ.jsx";
import Footer from "./components/Footer.jsx";
import Button from "./components/Button.jsx";
import { useTheme } from "./hooks/useTheme.js";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-900 transition-colors duration-300 dark:bg-charcoal-900 dark:text-cream-50">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <StatsBar />
        <ProductCategories />
        <FeaturedProducts />
        <ManufacturingSection />
        <MattressFinder />
        <Benefits />
        <Testimonials />
        <FAQ />
        <section className="section-shell py-20">
          <div className="rounded-2xl bg-charcoal-900 px-6 py-12 text-center text-white shadow-premium dark:bg-forge-900 md:px-12">
            <p className="eyebrow text-cream-200">Direct from our production floor</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Choose a mattress with manufacturer-level guidance.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/72">
              Speak with a SleepForge consultant, compare models, and reserve warehouse stock before your preferred size sells out.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="#finder" variant="light">Find my mattress</Button>
              <Button href="#products" variant="outlineLight">View product range</Button>
            </div>
            <p className="mt-5 text-sm text-white/58">No pressure consultation. Direct delivery from our own warehouse.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
