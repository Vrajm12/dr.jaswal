import Header from "../../components/header"
import Footer from "../../components/footer"
import AIHeroSection from "../../components/ai-products/ai-hero-section"
import AIProductSuite from "../../components/ai-products/ai-product-suite"
import TechnologyStack from "../../components/ai-products/technology-stack"
import AICTA from "../../components/ai-products/ai-cta"

const AiProductsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <AIHeroSection />
        <AIProductSuite />
        <TechnologyStack />
        <AICTA />
      </main>
      <Footer />
    </div>
  )
}

export default AiProductsPage
