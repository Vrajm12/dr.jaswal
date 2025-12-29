"use client"

import { useInView } from "@/components/home/use-in-view"
import { Link } from "react-router-dom"
import { TrendingUp } from "lucide-react"
import { CounterAnimation } from "@/components/counter-animation"

const AIHeroSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const metrics = [
    { value: 99.2, label: "Diagnostic Accuracy", suffix: "%" },
    { value: 60, label: "Faster Diagnosis", suffix: "%" },
    { value: 45, label: "Better Outcomes", suffix: "%" },
    { value: 30, label: "Reduced Costs", suffix: "%" },
  ]

  return (
    <section
      ref={ref}
      className="pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 bg-linear-to-b from-brand-blue-50 via-brand-purple-50/50 to-white relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div
          className={`transition-all duration-1000 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Main Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-blue-100 text-[#2F72B8] px-4 py-2 rounded-full mb-6">
              <TrendingUp size={18} />
              <span className="font-semibold">AI-Powered Innovation</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Revolutionary <span className="text-[#2F72B8]">AI Oncology</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2F72B8] to-[#5E3491]">Products</span>
            </h1>

            <p className="text-base text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Cutting-edge artificial intelligence solutions designed to transform cancer diagnosis, treatment planning,
              and patient care with unprecedented precision and efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 px-4">
              <Link
                to="/consultation"
                className="bg-[#2F72B8] hover:bg-brand-blue-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Request Demo
              </Link>
              <Link
                to="/contact"
                className="border-2 border-[#2F72B8] text-[#2F72B8] px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-brand-blue-50 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-2">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`p-4 sm:p-6 md:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-brand-blue-100 hover:border-brand-blue-300 hover:shadow-xl transition-all duration-500 text-center transform hover:scale-105 hover:-translate-y-1 ${
                  inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CounterAnimation
                  endValue={metric.value}
                  duration={2500}
                  suffix={metric.suffix}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#2F72B8] to-[#5E3491] mb-2"
                />
                <p className="text-gray-600 font-semibold text-xs sm:text-sm md:text-base">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIHeroSection
