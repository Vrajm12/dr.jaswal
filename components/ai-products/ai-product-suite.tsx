"use client"

import { useState } from "react"
import { useInView } from "@/components/home/use-in-view"
import { Brain, BarChart3, Activity, ArrowRight, Check, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

const AIProductSuite = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeIndex, setActiveIndex] = useState(0)

  const products = [
    {
      icon: Brain,
      title: "AI Diagnostic Assistant",
      subtitle: "Advanced ML algorithms for early cancer detection",
      image: "/images/aiProductSuit_1.jpg",
      features: [
        "99.2% accuracy in imaging analysis",
        "Early-stage cancer detection",
        "Multi-modal imaging support",
        "Real-time diagnostic insights",
      ],
      benefits: [
        "Reduced diagnostic time by 60%",
        "Enhanced detection accuracy",
        "Earlier intervention opportunities",
        "Improved patient outcomes",
      ],
      gradient: "from-[#2F72B8] to-[#3B96D7]",
      color: "#2F72B8",
    },
    {
      icon: BarChart3,
      title: "Precision Treatment Planner",
      subtitle: "AI-powered treatment optimization",
      image: "/images/precision-treatment.jpg",
      features: [
        "Personalized treatment protocols",
        "Drug interaction analysis",
        "Genomic data integration",
        "Treatment outcome prediction",
      ],
      benefits: [
        "Improved treatment efficacy",
        "Reduced side effects",
        "Personalized care plans",
        "Better quality of life",
      ],
      gradient: "from-[#3B96D7] to-[#5E3491]",
      color: "#3B96D7",
    },
    {
      icon: Activity,
      title: "Smart Monitoring System",
      subtitle: "Continuous monitoring with predictive analytics",
      image: "/images/smart-monitoring.jpg",
      features: [
        "24/7 patient monitoring",
        "Predictive health analytics",
        "Real-time alert system",
        "Treatment response tracking",
      ],
      benefits: [
        "Proactive care management",
        "Early complication detection",
        "Optimized treatment timing",
        "Enhanced patient safety",
      ],
      gradient: "from-[#5E3491] to-[#2F72B8]",
      color: "#5E3491",
    },
  ]

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))
  }

  return (
    <section ref={ref} className="py-12 sm:py-16 bg-linear-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-purple-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-brand-blue-50 to-brand-purple-50 border border-brand-purple-100 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#5E3491] text-xs font-medium">Powered by Advanced AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our AI Product{" "}
            <span className="bg-linear-to-r from-[#2F72B8] via-[#3B96D7] to-[#5E3491] bg-clip-text text-transparent">
              Suite
            </span>
          </h2>
          <p className="text-foreground/60 text-base max-w-xl mx-auto">
            Comprehensive AI tools designed to enhance every aspect of oncology care
          </p>
        </div>

        {/* Mobile: Full Info Cards */}
        <div className="lg:hidden space-y-6">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <div
                key={index}
                className={`group bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image - Clean white background */}
                <div className="relative aspect-16/10 overflow-hidden bg-gray-50">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-contain p-4"
                  />
                  <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl bg-linear-to-br ${product.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
                
                {/* Content - Full Info */}
                <div className="p-5">
                  {/* Title & Subtitle - Outside image */}
                  <h3 className="text-xl font-bold text-foreground mb-1">{product.title}</h3>
                  <p className="text-foreground/60 text-sm mb-4">{product.subtitle}</p>
                  
                  {/* Key Features - All */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <Sparkles size={14} className="text-[#2F72B8]" />
                      Key Features
                    </p>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                          <div className={`w-5 h-5 rounded-full bg-linear-to-br ${product.gradient} flex items-center justify-center shrink-0 mt-0.5`}>
                            <Check size={10} className="text-white" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Benefits - All */}
                  <div className="mb-5">
                    <p className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <Check size={14} className="text-green-600" />
                      Clinical Benefits
                    </p>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} className="text-green-600" />
                          </div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className={`w-full bg-linear-to-r ${product.gradient} text-white text-sm px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2`}>
                    Learn More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop: Carousel with Outside Arrows */}
        <div className={`hidden lg:block relative transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-6">
            {/* Left Arrow - Outside */}
            <button 
              onClick={goToPrevious}
              className={`shrink-0 w-14 h-14 rounded-full bg-linear-to-br ${products[activeIndex].gradient} shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300`}
            >
              <ChevronLeft size={28} className="text-white" />
            </button>

            {/* Cards Slider */}
            <div className="flex-1 overflow-hidden rounded-2xl shadow-xl border border-gray-100">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {products.map((product, index) => {
                  const Icon = product.icon
                  
                  return (
                    <div key={index} className="w-full shrink-0">
                      <div className="grid grid-cols-2">
                        {/* Image Side - Clean white/gray background */}
                        <div className="relative h-[420px] overflow-hidden bg-gray-50">
                          <img 
                            src={product.image} 
                            alt={product.title}
                            className="absolute inset-0 w-full h-full object-contain p-8"
                          />
                          {/* Icon Badge */}
                          <div className={`absolute top-5 left-5 w-12 h-12 rounded-xl bg-linear-to-br ${product.gradient} shadow-lg flex items-center justify-center`}>
                            <Icon size={24} className="text-white" />
                          </div>
                        </div>

                        {/* Content Side */}
                        <div className="bg-white p-8 flex flex-col justify-center">
                          {/* Title & Subtitle - Here, not on image */}
                          <h3 className="text-xl font-bold text-foreground mb-2">{product.title}</h3>
                          <p className="text-foreground/60 text-base mb-6">{product.subtitle}</p>
                          
                          {/* Features & Benefits in 2 columns */}
                          <div className="grid grid-cols-2 gap-6 mb-6">
                            {/* Key Features */}
                            <div>
                              <p className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-3 flex items-center gap-2">
                                <Sparkles size={14} className="text-[#2F72B8]" />
                                Key Features
                              </p>
                              <ul className="space-y-2">
                                {product.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                                    <div className={`w-4 h-4 rounded-full bg-linear-to-br ${product.gradient} flex items-center justify-center shrink-0 mt-0.5`}>
                                      <Check size={10} className="text-white" />
                                    </div>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Clinical Benefits */}
                            <div>
                              <p className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-3 flex items-center gap-2">
                                <Check size={14} className="text-green-600" />
                                Benefits
                              </p>
                              <ul className="space-y-2">
                                {product.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                      <Check size={10} className="text-green-600" />
                                    </div>
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* CTA */}
                          <button className={`bg-linear-to-r ${product.gradient} text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group`}>
                            Learn More
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Arrow - Outside */}
            <button 
              onClick={goToNext}
              className={`shrink-0 w-14 h-14 rounded-full bg-linear-to-br ${products[activeIndex].gradient} shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300`}
            >
              <ChevronRight size={28} className="text-white" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {products.map((product, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 ${
                  activeIndex === index 
                    ? `w-10 h-3 rounded-full bg-linear-to-r ${product.gradient}` 
                    : "w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-8 transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <button className="inline-flex items-center gap-2 bg-foreground text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors">
            Schedule a Demo
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default AIProductSuite
