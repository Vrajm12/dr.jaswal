"use client"

import { useInView } from "@/components/home/use-in-view"
import { Link } from "react-router-dom"
import { CheckCircle } from "lucide-react"

const AICTA = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section
      ref={ref}
      className="py-20 bg-linear-to-r from-[#2F72B8] via-[#3B96D7] to-[#5E3491] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center transition-all duration-1000 transform ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Experience AI-Powered Oncology?
          </h2>

          <p className="text-base text-primary-foreground/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Schedule a consultation to learn how our AI products can enhance your cancer care journey and improve
            patient outcomes through precision medicine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/consultation"
              className="bg-primary-foreground text-primary px-10 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Book Consultation
            </Link>
            <Link
              to="/contact"
              className="border-2 border-primary-foreground text-primary-foreground px-10 py-4 rounded-lg font-bold text-lg hover:bg-primary-foreground/10 transition-all duration-300"
            >
              Request Demo
            </Link>
          </div>

          <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/30 rounded-xl p-8 text-primary-foreground">
            <p className="text-sm">
              Our AI solutions are FDA-approved, HIPAA-compliant, and validated through extensive clinical trials.
              Experience the future of oncology care today.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AICTA
