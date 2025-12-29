import Header from "../../components/header"
import Footer from "../../components/footer"
import ConsultationOptions from "../../components/consultation/consultation-options"

const ConsultationPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <ConsultationOptions />
      </main>
      <Footer />
    </div>
  )
}

export default ConsultationPage
