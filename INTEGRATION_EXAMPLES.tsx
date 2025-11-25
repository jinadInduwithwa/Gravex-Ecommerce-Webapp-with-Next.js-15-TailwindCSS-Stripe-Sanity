// Example: How to integrate HomeBannerSection into your pages

import Container from "@/components/Container";
import HomeBannerSection from "@/components/HomeBannerSection";
import ProductGrid from "@/components/ProductGrid";

/**
 * Integration Example 1: Using the server component
 * This is the recommended approach as it handles data fetching server-side
 */
function HomePageExample1() {
  return (
    <div>
      {/* Full-width banner slider */}
      <HomeBannerSection />

      {/* Rest of your content */}
      <Container className="py-10">
        <ProductGrid />
      </Container>
    </div>
  );
}

/**
 * Integration Example 2: For custom layouts
 * You can place the banner anywhere in your page structure
 */
function HomePageExample2() {
  return (
    <div>
      <Container className="py-10">
        {/* Optional: Some content before banner */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Welcome to Our Store</h2>
          <p>Check out our featured collections below:</p>
        </div>

        {/* Banner slider in the middle */}
        <HomeBannerSection />

        {/* Content after banner */}
        <div className="mt-10">
          <ProductGrid />
        </div>
      </Container>
    </div>
  );
}

export { HomePageExample1, HomePageExample2 };
