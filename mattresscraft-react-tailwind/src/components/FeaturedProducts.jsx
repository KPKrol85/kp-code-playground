import { products } from "../data/siteData.js";
import ProductCard from "./ProductCard.jsx";
import SectionHeader from "./SectionHeader.jsx";

function FeaturedProducts() {
  return (
    <section className="section-shell py-16">
      <SectionHeader
        eyebrow="Featured products"
        title="Warehouse-ready models with clear comfort profiles."
        description="A focused product range helps customers compare construction, firmness, and fit before speaking with a consultant."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
