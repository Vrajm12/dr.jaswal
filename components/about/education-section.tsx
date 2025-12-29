"use client"

import { useInView } from "@/components/home/use-in-view"
import { GraduationCap, Award, BadgeCheck, Stethoscope, Brain, Sparkles } from "lucide-react"

const EducationSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const education = [
    { 
      degree: "MBBS", 
      institution: "GGSMCH, Faridkot, Punjab", 
      icon: Stethoscope,
      highlight: "Medical Foundation"
    },
    { 
      degree: "MD - Radiation Oncology", 
      institution: "GGSMCH, Faridkot, Punjab", 
      icon: Award,
      highlight: "Specialization"
    },
    { 
      degree: "PGDM", 
      institution: "SPJIMR Mumbai", 
      icon: GraduationCap,
      highlight: "Healthcare Management"
    },
    { 
      degree: "ECFMG Certified", 
      institution: "USA (2014)", 
      icon: BadgeCheck,
      highlight: "International Recognition"
    },
    { 
      degree: "AROI, GI Oncology", 
      institution: "IC-AIM", 
      icon: Brain,
      highlight: "AI in Medicine"
    },
  ]

  return (
    <section ref={ref} className="py-16 bg-linear-to-br from-[#2F72B8] via-[#3B96D7] to-[#5E3491] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        {/* Decorative dots pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-4">
              
              <span className="text-white/90 text-sm font-medium">Academic Excellence</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Education & Qualifications
            </h2>
            <p className="text-white/80 text-base max-w-xl mx-auto">
              A distinguished academic journey spanning medicine, oncology, and healthcare innovation
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {education.map((edu, index) => {
              const Icon = edu.icon
              return (
                <div
                  key={index}
                  className={`group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/20 hover:border-white/40 hover:scale-105 hover:-translate-y-2 transition-all duration-500 ${
                    inView ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-12 rotate-3"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/5 transition-all duration-300"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon with ring */}
                    <div className="relative mb-4">
                      <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Icon size={28} className="text-white" />
                      </div>
                      {/* Corner accent */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    {/* Highlight tag */}
                    <span className="text-[10px] uppercase tracking-wider text-yellow-300 font-semibold mb-2">
                      {edu.highlight}
                    </span>
                    
                    {/* Degree */}
                    <h3 className="font-bold text-white text-base leading-tight mb-1">
                      {edu.degree}
                    </h3>
                    
                    {/* Institution */}
                    <p className="text-white/70 text-xs leading-tight">
                      {edu.institution}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom highlight bar with staggered animation */}
          <div className={`mt-10 flex items-center justify-center gap-6 flex-wrap transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
            <div className={`flex items-center gap-2 text-white/80 transition-all duration-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '900ms' }}>
              <div className={`w-2 h-2 rounded-full bg-yellow-400 transition-all duration-300 ${inView ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '1000ms' }}></div>
              <span className="text-sm font-medium">15+ Years Experience</span>
            </div>
            <div className={`flex items-center gap-2 text-white/80 transition-all duration-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '1000ms' }}>
              <div className={`w-2 h-2 rounded-full bg-yellow-400 transition-all duration-300 ${inView ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '1100ms' }}></div>
              <span className="text-sm font-medium">Global Certifications</span>
            </div>
            <div className={`flex items-center gap-2 text-white/80 transition-all duration-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '1100ms' }}>
              <div className={`w-2 h-2 rounded-full bg-yellow-400 transition-all duration-300 ${inView ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '1200ms' }}></div>
              <span className="text-sm font-medium">Continuous Learning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationSection
