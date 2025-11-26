import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <Container>
        <ProductGrid />
        <CategoryGrid />
      </Container>
    </div>
  );
}
