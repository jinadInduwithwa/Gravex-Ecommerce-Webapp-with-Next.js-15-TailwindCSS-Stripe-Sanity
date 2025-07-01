import Container from "@/components/Container";
import Header from "@/components/Header";
import HomeBanner from "@/components/ui/HomeBanner";

export default function Home() {
  return (
    <main >
      <Container className="py-10">
        <HomeBanner/>
      </Container>
    </main>
    
  );
}
