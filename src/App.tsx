import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

import {
  AboutPage,
  AiProductsPage,
  BlogPage,
  ConsultationPage,
  ContactPage,
  HomePage,
} from "./pages"
import AdminPage from "./pages/AdminPage"

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/ai-products" element={<AiProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
