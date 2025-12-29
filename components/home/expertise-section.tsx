"use client"

import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
import { Cpu, Brain, Sparkles, ArrowRight, Stethoscope, Activity } from "lucide-react"

const ExpertiseSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const aiProducts = [
    {
      icon: Activity,
      name: "Eternawell AI",
      description: "Clinical decision support for oncology.",
      color: "from-[#5E3491] to-[#2F72B8]",
      bgColor: "bg-brand-purple-50",
      iconColor: "text-[#5E3491]",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-linear-to-b from-white to-brand-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-blue-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-purple-100 rounded-full blur-3xl opacity-60"></div>
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#3B96D7] rounded-full animate-float opacity-40"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#2F72B8] rounded-full animate-float opacity-30" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#5E3491] rounded-full animate-float opacity-40" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-blue-100 border border-brand-blue-200 rounded-full px-4 py-2 mb-6">
              <Cpu size={16} className="text-[#2F72B8]" />
              <span className="text-[#2F72B8] text-sm font-semibold">AI Healthtech Innovator</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Developing{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2F72B8] to-[#5E3491]">
                Affordable
              </span>{" "}
              Oncology AI
            </h2>

            {/* Description */}
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              As an AI Healthtech developer, Dr. Jaswal is committed to creating affordable, cutting-edge AI software for clinical decision support and advanced diagnostics to improve patient care globally.
            </p>

            {/* CTA Button */}
            <Link
              to="/ai-products"
              className="group inline-flex items-center gap-3 bg-linear-to-r from-[#2F72B8] to-[#5E3491] hover:from-brand-blue-700 hover:to-brand-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Sparkles size={20} />
              Explore AI Products
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Content - AI Product Cards */}
          <div
            className={`transition-all duration-1000 delay-300 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-6">
              {aiProducts.map((product, index) => {
                const Icon = product.icon
                return (
                  <div
                    key={index}
                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-brand-blue-200 overflow-hidden"
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Gradient accent on hover */}
                    <div className={`absolute inset-0 bg-linear-to-r ${product.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className="relative flex items-start gap-5">
                      {/* Icon */}
                      <div className={`${product.bgColor} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={32} className={product.iconColor} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2F72B8] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600">
                          {product.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight size={20} className="text-[#2F72B8]" />
                      </div>
                    </div>

                    {/* Bottom gradient line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${product.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                  </div>
                )
              })}
            </div>

            {/* Decorative element */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#3B96D7] to-[#2F72B8] flex items-center justify-center text-white text-xs font-bold border-2 border-white">AI</div>
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#5E3491] to-[#2F72B8] flex items-center justify-center text-white text-xs font-bold border-2 border-white">ML</div>
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#2F72B8] to-[#5E3491] flex items-center justify-center text-white text-xs font-bold border-2 border-white">DL</div>
              </div>
              <p className="text-sm text-gray-500">
                Powered by <span className="font-semibold text-[#2F72B8]">Advanced AI</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpertiseSection
