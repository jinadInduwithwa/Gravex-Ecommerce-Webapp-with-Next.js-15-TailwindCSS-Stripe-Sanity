import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";
import PromotionalMessages from "@/components/PromotionalMessages";
import { QualityCommitment } from "@/components/QualityCommitment";


export default function Home() {
  return (
    <div>
      <HomeBanner />
      <PromotionalMessages/>
      <Container>
        <ProductGrid />
        <CategoryGrid />
        <QualityCommitment />
        
      </Container>
    </div>
  );
}
