"use client"

import { useState } from "react"
import { useInView } from "@/components/home/use-in-view"
import { Zap, Eye, TrendingUp, Shield, ChevronLeft, ChevronRight } from "lucide-react"

const TechnologyStack = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [activeIndex, setActiveIndex] = useState(0)

  const technologies = [
    {
      icon: Zap,
      title: "Deep Learning",
      description: "Advanced neural networks for pattern recognition in medical imaging and data analysis",
      gradient: "from-[#2F72B8] to-[#3B96D7]",
      bgGlow: "bg-[#2F72B8]/10",
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Sophisticated image analysis for accurate cancer detection and tumor characterization",
      gradient: "from-[#3B96D7] to-[#5E3491]",
      bgGlow: "bg-[#3B96D7]/10",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Machine learning models for treatment outcome prediction and patient prognosis",
      gradient: "from-[#5E3491] to-[#2F72B8]",
      bgGlow: "bg-[#5E3491]/10",
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "HIPAA-compliant security protocols for patient data protection and privacy",
      gradient: "from-[#2F72B8] to-[#5E3491]",
      bgGlow: "bg-[#2F72B8]/10",
    },
  ]

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? technologies.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === technologies.length - 1 ? 0 : prev + 1))
  }

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Technology Behind Our{" "}
            <span className="bg-linear-to-r from-[#2F72B8] via-[#3B96D7] to-[#5E3491] bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-center text-foreground/70 text-base mb-12">
            Built on cutting-edge AI and machine learning technologies
          </p>

          {/* Desktop: Grid View */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon
              return (
                <div
                  key={index}
                  className={`group relative p-6 rounded-2xl bg-background border border-border hover:border-transparent hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 ${tech.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br ${tech.gradient} rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`p-3.5 bg-linear-to-br ${tech.gradient} rounded-xl w-fit mb-4 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-[#2F72B8] transition-colors duration-300">
                      {tech.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">{tech.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile: Carousel View */}
          <div className="md:hidden">
            {/* Card Slider */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {technologies.map((tech, index) => {
                  const Icon = tech.icon
                  return (
                    <div key={index} className="w-full shrink-0 px-1">
                      <div className={`relative p-6 sm:p-8 rounded-2xl bg-background border border-border shadow-xl overflow-hidden`}>
                        {/* Background glow */}
                        <div className={`absolute -top-16 -right-16 w-32 h-32 bg-linear-to-br ${tech.gradient} rounded-full opacity-20 blur-2xl`}></div>
                        <div className={`absolute -bottom-16 -left-16 w-32 h-32 bg-linear-to-br ${tech.gradient} rounded-full opacity-10 blur-2xl`}></div>
                        
                        <div className="relative z-10">
                          <div className={`p-4 bg-linear-to-br ${tech.gradient} rounded-xl w-fit mb-5 shadow-lg`}>
                            <Icon size={32} className="text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                            {tech.title}
                          </h3>
                          <p className="text-foreground/70 text-base sm:text-lg leading-relaxed">{tech.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Navigation - Arrows and Dots Below Card */}
            <div className="flex items-center justify-center gap-4 mt-6">
              {/* Left Arrow */}
              <button 
                onClick={goToPrevious}
                className={`shrink-0 w-10 h-10 rounded-full bg-linear-to-br ${technologies[activeIndex].gradient} shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300`}
              >
                <ChevronLeft size={20} className="text-white" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {technologies.map((tech, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all duration-300 ${
                      activeIndex === index 
                        ? `w-8 h-2.5 rounded-full bg-linear-to-r ${tech.gradient}` 
                        : "w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button 
                onClick={goToNext}
                className={`shrink-0 w-10 h-10 rounded-full bg-linear-to-br ${technologies[activeIndex].gradient} shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300`}
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechnologyStack
