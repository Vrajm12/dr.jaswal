"use client"

import { useState } from "react"
import { useInView } from "@/components/home/use-in-view"
import { Heart, Brain, Zap, BookOpen, Microscope, ChevronLeft, ChevronRight } from "lucide-react"

const ExpertiseGrid = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [clinicalIndex, setClinicalIndex] = useState(0)
  const [innovationIndex, setInnovationIndex] = useState(0)

  const clinicalCare = [
    {
      icon: Heart,
      title: "Solid Tumor Radiation Oncology",
      description:
        "Precise radiotherapy/radiation oncology for breast, lung, head & neck, prostate, gynecologic, and gastrointestinal cancers using IMRT, VMAT, IGRT, SRS/SBRT, TomoTherapy Radixact, Radiosurgery, Cyberknife. Also expert in Brachytherapy procedures.",
    },
    {
      icon: Brain,
      title: "Hematologic & Complex Cancers",
      description: 
        "Radiation support for leukemia, lymphoma, myeloma and rare cancers, including involved-site RT, transplant-related indications and challenging re-irradiation scenarios.",
    },
    {
      icon: Zap,
      title: "Palliative & Supportive Oncology",
      description: 
        "Holistic symptom relief, pain management and quality-of-life focused care for patients with advanced or metastatic disease, with clear communication for patients and families.",
    },
  ]

  const innovationLeadership = [
    {
      icon: BookOpen,
      title: "Precision & AI-Guided Radiation",
      description: 
        "Personalised radiation plans informed by imaging, biomarkers and AI-assisted decision tools, aiming to maximise tumour control while protecting normal tissues.",
    },
    {
      icon: Microscope,
      title: "Clinical Research & Trials",
      description: 
        "Principal Investigator for oncology studies, with a focus on real-world evidence, new treatment combinations and better patient-reported outcomes.",
    },
  ]

  // Manual navigation for clinical care carousel
  const nextClinical = () => setClinicalIndex((prev) => (prev + 1) % clinicalCare.length)
  const prevClinical = () => setClinicalIndex((prev) => (prev - 1 + clinicalCare.length) % clinicalCare.length)

  // Manual navigation for innovation carousel
  const nextInnovation = () => setInnovationIndex((prev) => (prev + 1) % innovationLeadership.length)
  const prevInnovation = () => setInnovationIndex((prev) => (prev - 1 + innovationLeadership.length) % innovationLeadership.length)



  const renderCard = (item: typeof clinicalCare[0], variant: 'blue' | 'purple') => {
    const Icon = item.icon
    const colors = variant === 'blue' 
      ? { gradient: 'from-[#2F72B8] to-[#3B96D7]', hover: 'hover:border-[#2F72B8]', text: 'group-hover:text-[#2F72B8]' }
      : { gradient: 'from-[#5E3491] to-[#2F72B8]', hover: 'hover:border-[#5E3491]', text: 'group-hover:text-[#5E3491]' }
    
    return (
      <div className={`group p-6 rounded-2xl bg-white border border-gray-100 ${colors.hover} hover:shadow-xl transition-all duration-300 h-full`}>
        <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${colors.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon size={24} className="text-white" />
        </div>
        <h3 className={`text-xl font-bold text-gray-900 mb-3 ${colors.text} transition-colors`}>
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
      </div>
    )
  }

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className={`absolute top-0 right-0 w-96 h-96 bg-[#2F72B8] rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1000 ${inView ? 'opacity-10 scale-100' : 'opacity-0 scale-50'}`}></div>
        <div className={`absolute bottom-0 left-0 w-96 h-96 bg-[#5E3491] rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1000 delay-300 ${inView ? 'opacity-10 scale-100' : 'opacity-0 scale-50'}`}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Areas of <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2F72B8] to-[#5E3491]">Expertise</span>
            </h2>
            <p className={`text-gray-600 text-base max-w-2xl mx-auto transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Integrated radiation oncology, research, AI and healthcare strategy
            </p>
          </div>

          {/* Row 1 - Clinical Care */}
          <div className={`mb-8 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`} style={{ transitionDelay: '300ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`h-px flex-1 bg-linear-to-r from-transparent via-brand-blue-200 to-transparent transition-all duration-1000 ${inView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transitionDelay: '400ms' }}></div>
              <span className={`text-sm font-semibold text-[#2F72B8] uppercase tracking-wider px-4 py-1.5 bg-brand-blue-50 rounded-full border border-brand-blue-200 transition-all duration-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '500ms' }}>
                Clinical Care
              </span>
              <div className={`h-px flex-1 bg-linear-to-r from-transparent via-brand-blue-200 to-transparent transition-all duration-1000 ${inView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transitionDelay: '400ms' }}></div>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-3 gap-5">
              {clinicalCare.map((item, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"}`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  {renderCard(item, 'blue')}
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${clinicalIndex * 100}%)` }}
                >
                  {clinicalCare.map((item, index) => (
                    <div key={index} className="w-full shrink-0 px-1">
                      {renderCard(item, 'blue')}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Carousel Navigation */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={prevClinical}
                  className="p-2 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-[#2F72B8] hover:bg-[#2F72B8] hover:text-white transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  {clinicalCare.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setClinicalIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === clinicalIndex ? 'w-6 bg-[#2F72B8]' : 'w-2 bg-brand-blue-200'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextClinical}
                  className="p-2 rounded-full bg-brand-blue-50 border border-brand-blue-200 text-[#2F72B8] hover:bg-[#2F72B8] hover:text-white transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2 - Innovation, AI & Leadership */}
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '900ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`h-px flex-1 bg-linear-to-r from-transparent via-brand-purple-200 to-transparent transition-all duration-1000 ${inView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transitionDelay: '1000ms' }}></div>
              <span className={`text-sm font-semibold text-[#5E3491] uppercase tracking-wider px-4 py-1.5 bg-brand-purple-50 rounded-full border border-brand-purple-200 transition-all duration-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '1100ms' }}>
                Innovation, AI & Leadership
              </span>
              <div className={`h-px flex-1 bg-linear-to-r from-transparent via-brand-purple-200 to-transparent transition-all duration-1000 ${inView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transitionDelay: '1000ms' }}></div>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 gap-5 max-w-4xl mx-auto">
              {innovationLeadership.map((item, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"}`}
                  style={{ transitionDelay: `${1200 + index * 150}ms` }}
                >
                  {renderCard(item, 'purple')}
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${innovationIndex * 100}%)` }}
                >
                  {innovationLeadership.map((item, index) => (
                    <div key={index} className="w-full shrink-0 px-1">
                      {renderCard(item, 'purple')}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Carousel Navigation */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={prevInnovation}
                  className="p-2 rounded-full bg-brand-purple-50 border border-brand-purple-200 text-[#5E3491] hover:bg-[#5E3491] hover:text-white transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  {innovationLeadership.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setInnovationIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === innovationIndex ? 'w-6 bg-[#5E3491]' : 'w-2 bg-brand-purple-200'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextInnovation}
                  className="p-2 rounded-full bg-brand-purple-50 border border-brand-purple-200 text-[#5E3491] hover:bg-[#5E3491] hover:text-white transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

export default ExpertiseGrid
