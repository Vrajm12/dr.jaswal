"use client"

import { useInView } from "@/components/home/use-in-view"
import { Eye, Target } from "lucide-react"

const MissionVision = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 bg-linear-to-r from-brand-blue-50 to-brand-purple-50 relative overflow-hidden">
      {/* Animated Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-1/4 left-1/4 w-72 h-72 bg-[#2F72B8] rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1000 ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#5E3491] rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1000 delay-300 ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Mission & <span className="bg-linear-to-r from-[#2F72B8] via-[#3B96D7] to-[#5E3491] bg-clip-text text-transparent">Vision</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mission Card - Slide from Left */}
          <div
            className={`p-8 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-xl transition-all duration-700 transform ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 bg-primary/10 rounded-lg transition-all duration-500 ${inView ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`} style={{ transitionDelay: '400ms' }}>
                <Target size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Mission</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              To provide evidence-based, compassionate cancer care integrated with cutting-edge AI technology and
              innovative research, making advanced oncology accessible to all patients regardless of their economic
              background.
            </p>
          </div>

          {/* Vision Card - Slide from Right */}
          <div
            className={`p-8 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-xl transition-all duration-700 transform ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 bg-primary/10 rounded-lg transition-all duration-500 ${inView ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'}`} style={{ transitionDelay: '600ms' }}>
                <Eye size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Vision</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              To transform global cancer care through AI-powered precision medicine, real-world clinical evidence, and
              equitable healthcare models that empower patients to make informed decisions about their treatment
              journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionVision
