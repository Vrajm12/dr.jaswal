"use client"

import { useState, useEffect } from "react"
import { useInView } from "@/components/home/use-in-view"
import { Award, Brain, Heart, Sparkles, BookOpen, Target, Users, Lightbulb } from "lucide-react"

// Letter-by-letter animation component
const AnimatedText = ({ text, className = "", inView }: { text: string; className?: string; inView: boolean }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ 
            transitionDelay: inView ? `${index * 30}ms` : '0ms',
            whiteSpace: char === ' ' ? 'pre' : 'normal'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

const ProfessionalJourney = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [titleAnimated, setTitleAnimated] = useState(false)

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setTitleAnimated(true), 300)
      return () => clearTimeout(timer)
    }
  }, [inView])

  const expertise = [
    "IMRT", "VMAT", "IGRT", "SRS/SBRT", "TomoTherapy Radixact", "Brachytherapy"
  ]

  const aiFeatures = [
    "Transparent, affordable cancer-care plans",
    "Integrated with genomic insights",
    "Powered by global scientific evidence",
    "Real-time treatment cost data",
    "Mapped to each patient's unique journey"
  ]

  const leadershipAreas = [
    { icon: Target, text: "Multi-centre oncology leadership" },
    { icon: Users, text: "Inter-departmental coordination" },
    { icon: Lightbulb, text: "Principal Investigator in clinical research" },
    { icon: BookOpen, text: "Decision-support systems & digital oncology" }
  ]

  return (
    <section ref={ref} className="bg-linear-to-b from-brand-blue-50 via-brand-purple-50/50 to-white relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Mobile Full Screen Hero */}
      <div className="min-h-screen sm:min-h-0 sm:pt-32 md:pt-36 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className={`text-center mb-2 sm:mb-16 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Doctor Photo - Larger */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-3 sm:-inset-4 bg-linear-to-r from-[#2F72B8] via-[#5E3491] to-[#3B96D7] rounded-full opacity-15 group-hover:opacity-25 blur-lg sm:blur-xl transition-all duration-500"></div>
              <div className="relative w-62 h-62 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img 
                  src="/images/about.png" 
                  alt="Dr. Gaurav Jaswal"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-[#2F72B8] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <Award className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Dr. Gaurav Jaswal
          </h1>
          <p className="text-base text-[#2F72B8] font-medium mb-4 sm:mb-6">
            <AnimatedText 
              text="Director of Radiation Oncology" 
              inView={titleAnimated} 
            />
            <br className="sm:hidden" />
            <span className={`hidden sm:inline transition-all duration-500 ${titleAnimated ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '900ms' }}> • </span>
            <AnimatedText 
              text="Onco-Life Cancer Centre, Pune" 
              inView={titleAnimated} 
              className=""
            />
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto text-base leading-relaxed px-2">
            A lifelong commitment to advancing cancer care, clinical innovation, and patient outcomes.
          </p>
          
          {/* Scroll Indicator - Mobile Only */}
          <div className="mt-8 sm:hidden animate-bounce">
            <div className="w-6 h-10 border-2 border-[#3B96D7] rounded-full mx-auto flex justify-center">
              <div className="w-1.5 h-3 bg-[#3B96D7] rounded-full mt-2 animate-pulse"></div>
            </div>
            <p className="text-xs text-[#3B96D7] mt-2">Scroll to explore</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 sm:pb-20 -mt-16 sm:mt-0">
        <div className="space-y-6 sm:space-y-8">

          {/* About Card */}
          <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Journey
            </h2>
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              Dr. Gaurav Jaswal is a distinguished <span className="text-[#2F72B8] font-semibold">Radiation Oncologist</span> who has built a reputation for excellence in advanced radiotherapy, oncology leadership, and the integration of AI-driven innovations in clinical practice.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              Over the years, he has worked across busy oncology centers, gaining expertise in cutting-edge technologies and developing scalable oncology models that blend healthcare, analytics, and strategic leadership.
            </p>
          </div>

          {/* Two Column: Expertise & Leadership */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Clinical Expertise */}
            <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-brand-purple-100 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#5E3491]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Clinical Expertise</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {expertise.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 bg-brand-purple-50 text-[#5E3491] rounded-full text-sm font-medium hover:bg-brand-purple-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm">
                Specializing in next-generation technologies including TomoTherapy Radixact for precision cancer treatment.
              </p>
            </div>

            {/* Leadership */}
            <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-brand-blue-100 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#2F72B8]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Leadership & Research</h3>
              </div>
              <div className="space-y-3">
                {leadershipAreas.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-700">
                    <item.icon className="w-4 h-4 text-[#3B96D7] shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Statement */}
          <div className={`bg-linear-to-r from-brand-blue-50 to-brand-purple-50 rounded-2xl p-6 sm:p-8 border border-brand-blue-100 transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
              Beyond clinical practice, Dr. Jaswal is deeply involved in improving access to high-quality cancer care across Maharashtra. His research interests span <span className="text-[#2F72B8] font-medium">decision-support systems</span>, <span className="text-[#2F72B8] font-medium">real-world evidence generation</span>, and <span className="text-[#2F72B8] font-medium">digital oncology</span>.
            </p>
          </div>

          {/* AI Innovation Section */}
          <div className={`bg-linear-to-br from-[#2F72B8] to-[#5E3491] rounded-2xl p-6 sm:p-8 md:p-10 text-white transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Advanced AI Training & Innovation</h3>
            </div>
            
            <p className="text-white/90 leading-relaxed mb-6">
              Dr. Jaswal completed the <span className="font-semibold text-white">Agentic.AI program at IIT Mandi iHub & HCi Foundation</span>, in collaboration with Nagent AI—an intensive hybrid course combining online learning with 3-day on-campus immersion. This program empowered him to design and build practical AI agents for real-world healthcare challenges.
            </p>
            
            <div className="bg-white/10 rounded-xl p-5 sm:p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold mb-4 text-white">During this program, he developed a next-generation AI engine that creates:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {aiFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-white/95">
                    <div className="w-2 h-2 bg-white rounded-full shrink-0 mt-1.5"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-white/80 text-sm mt-5 text-center">
              This innovation represents a step forward in equitable, precision-driven oncology.
            </p>
          </div>

          {/* Philosophy Quote */}
          <div className={`bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 text-center transition-all duration-700 delay-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="w-14 h-14 rounded-full bg-brand-purple-100 flex items-center justify-center mx-auto mb-5">
              <Heart className="w-7 h-7 text-[#5E3491]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">A Patient-Centred Philosophy</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
              What truly sets Dr. Jaswal apart is his belief that oncology is not only a science but a <span className="text-gray-800 font-medium">human experience</span>. He combines advanced technology with compassion, ensuring each patient receives evidence-based care delivered with empathy, dignity, and clarity.
            </p>
            <div className="inline-block bg-linear-to-r from-brand-blue-50 to-brand-purple-50 px-6 py-4 rounded-xl">
              <blockquote className="text-xl sm:text-2xl font-semibold text-[#2F72B8] italic">
                "Treat the person, not just the cancer."
              </blockquote>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProfessionalJourney
