"use client"

import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const ConsultationCTA = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 bg-linear-to-r from-[#2F72B8] to-[#5E3491] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center transition-all duration-1000 transform ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Healing Journey?
          </h2>

          <p className="text-base text-primary-foreground/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            Book a consultation today and take the first step towards comprehensive cancer care. Dr. Jaswal is ready to
            help you understand your treatment options with clarity and compassion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/consultation"
              className="bg-primary-foreground text-primary px-10 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
            >
              Book Consultation Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-primary-foreground text-primary-foreground px-10 py-4 rounded-lg font-bold text-lg hover:bg-primary-foreground/10 transition-all duration-300"
            >
              Get More Information
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConsultationCTA
