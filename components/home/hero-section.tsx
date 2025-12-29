"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [textAnimated, setTextAnimated] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Trigger text animation after initial fade in
    const timer = setTimeout(() => setTextAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center bg-linear-to-br from-white via-brand-blue-50 to-brand-purple-50 overflow-hidden pt-16 sm:pt-20">
      {/* Soft decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large soft purple circle on the right */}
        <div className="absolute -right-32 top-1/4 w-[600px] h-[600px] bg-linear-to-br from-brand-blue-200/50 to-brand-purple-200/50 rounded-full blur-3xl"></div>
        {/* Smaller accent circles */}
        <div className="absolute left-10 top-32 w-64 h-64 bg-brand-purple-100/60 rounded-full blur-2xl"></div>
        <div className="absolute left-1/4 bottom-20 w-48 h-48 bg-brand-blue-100/50 rounded-full blur-2xl"></div>
        {/* Decorative arc lines */}
        <div className="absolute right-1/4 top-1/3 w-[400px] h-[400px] border-2 border-brand-blue-100 rounded-full opacity-50"></div>
        <div className="absolute right-1/4 top-1/3 w-[500px] h-[500px] border border-brand-purple-100 rounded-full opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-12 lg:pt-20 pb-8 sm:pb-12 lg:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* What's new badge */}
            <div className={`inline-flex items-center gap-2 bg-brand-blue-50 border border-brand-blue-100 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${textAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F72B8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F72B8]"></span>
              </span>
              <span className="text-[#2F72B8] text-sm font-medium">What's new</span>
              <span className="text-gray-600 text-sm">AI-Powered Diagnostics →</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] text-gray-900 overflow-hidden">
              <span className={`inline-block transition-all duration-700 delay-100 ${textAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                Your Health{" "}
              </span>
              <span className={`inline-block relative transition-all duration-700 delay-200 ${textAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                <span className="bg-linear-to-r from-[#2F72B8] via-[#3B96D7] to-[#5E3491] bg-clip-text text-transparent font-extrabold">
                  Comes First,
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-linear-to-r from-[#2F72B8] via-[#3B96D7] to-[#5E3491] opacity-30 blur-sm"></span>
              </span>
              <br />
              <span className={`inline-block transition-all duration-700 delay-300 ${textAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                Every Time.
              </span>
            </h1>

            <p className={`text-base text-gray-600 mb-8 leading-relaxed transition-all duration-700 delay-400 ${textAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              With over 15 years of experience, Dr. Gaurav Jaswal provides world-class oncology treatments combined with personalized care for every patient's journey.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-700 delay-500 ${textAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link
                to="/consultation"
                className="bg-[#2F72B8] hover:bg-brand-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
              >
                Book Consultation Now
                <span className="bg-white/20 rounded-full p-1">
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/ai-products"
                className="border-2 border-brand-blue-300 text-[#2F72B8] px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-blue-50 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Content - Video Player */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div
              className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-blue-200 transform transition-transform duration-300 hover:scale-[1.02]"
              style={{ filter: "drop-shadow(0 20px 40px rgba(47, 114, 184, 0.25))" }}
            >
              {/* Video iframe - plays automatically on page load */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/h-Xilj_XVeM?autoplay=1&rel=0&modestbranding=1"
                title="Dr. Gaurav Jaswal - Cancer Care Innovation"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <p className="text-center mt-4 text-gray-500 text-sm">
              Watch Dr. Jaswal's journey in cancer care innovation
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-[#3B96D7] rounded-full flex justify-center">
            <div className="w-1 h-2 bg-[#3B96D7] rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
