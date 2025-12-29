"use client"

import { useInView } from "@/components/home/use-in-view"
import { CounterAnimation } from "@/components/counter-animation"
import { Award, Users, TrendingUp, Clock, Heart } from "lucide-react"

const StatsCards = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const stats = [
    { value: 15, label: "Years Experience", suffix: "+", icon: Award },
    { value: 5000, label: "Patients Treated", suffix: "+", icon: Users },
    { value: 98, label: "Success Rate", suffix: "%", icon: TrendingUp },
    { value: 24, label: "Support Available", suffix: "/7", icon: Clock },
    { value: 98, label: "Patient Recovery", suffix: "%", icon: Heart },
  ]

  return (
    <section
      ref={ref}
      className="py-6 sm:py-8 bg-linear-to-r from-[#3B96D7] via-[#2F72B8] to-[#5E3491]"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Mobile: Scrollable horizontal cards */}
        <div className="flex sm:hidden overflow-x-auto gap-3 pb-2 snap-x snap-mandatory scrollbar-hide -mx-3 px-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`shrink-0 snap-center bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[140px] border border-white/20 transition-all duration-700 transform ${
                  inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
                } active:scale-95`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/20 rounded-full p-2 mb-2">
                    <Icon size={18} className="text-white" />
                  </div>
                  <CounterAnimation
                    endValue={stat.value}
                    duration={2000}
                    suffix={stat.suffix}
                    className="text-2xl font-bold text-white"
                  />
                  <p className="text-white/90 text-xs font-medium mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop: Flex row */}
        <div className="hidden sm:flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`text-center transition-all duration-700 transform hover:scale-110 cursor-default ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-white/20 rounded-full p-3 mb-2">
                    <Icon size={24} className="text-white" />
                  </div>
                  <CounterAnimation
                    endValue={stat.value}
                    duration={2000}
                    suffix={stat.suffix}
                    className="text-3xl md:text-4xl font-bold text-white"
                  />
                  <p className="text-white/90 text-sm font-medium mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsCards
