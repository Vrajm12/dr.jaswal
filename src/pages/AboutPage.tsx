import Header from "../../components/header"
import Footer from "../../components/footer"
import ProfessionalJourney from "../../components/about/professional-journey"
import EducationSection from "../../components/about/education-section"
import ExpertiseGrid from "../../components/about/expertise-grid"
import MissionVision from "../../components/about/mission-vision"

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <ProfessionalJourney />
        <EducationSection />
        <ExpertiseGrid />
        <MissionVision />
      </main>
      <Footer />
    </div>
  )
}

export default AboutPage
