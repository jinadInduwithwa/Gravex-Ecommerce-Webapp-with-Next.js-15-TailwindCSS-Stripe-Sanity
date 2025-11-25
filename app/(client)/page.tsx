import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <Container>
        <ProductGrid />
      </Container>
    </div>
  );
}
