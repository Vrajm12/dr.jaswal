import Header from "../../components/header"
import Footer from "../../components/footer"
import HeroSection from "../../components/home/hero-section"
import ExpertiseSection from "../../components/home/expertise-section"
import ConsultationCTA from "../../components/home/consultation-cta"
import StatsCards from "../../components/home/stats-cards"

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsCards />
        <ExpertiseSection />
        <ConsultationCTA />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
