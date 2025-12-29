import Header from "../../components/header"
import Footer from "../../components/footer"
import ContactSection from "../../components/contact/contact-section"

const ContactPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage
