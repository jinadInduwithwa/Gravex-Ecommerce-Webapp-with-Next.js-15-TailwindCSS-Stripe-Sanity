import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import CategoryGrid from "@/components/CategoryGrid";
import PromotionalMessages from "@/components/PromotionalMessages";
import { QualityCommitment } from "@/components/QualityCommitment";
import ProductCarousel from "@/components/ProductCarousel";
import PromoBanner from "@/components/PromoBanner";



export default function Home() {
  return (
    <div>
      <HomeBanner />
      <PromotionalMessages />
      <Container>
        <ProductCarousel title="New Arrivals" status="new" viewAllLink="/category/men" />
      </Container>
      <PromoBanner />
      <Container>
        <ProductCarousel title="Hot Products" status="hot" viewAllLink="/category/women" />
        <CategoryGrid />
        <QualityCommitment />
      </Container>
    </div>
  );
}
