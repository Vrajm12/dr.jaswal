"use client"

import { useState, useEffect } from "react"
import { useInView } from "@/components/home/use-in-view"

interface CounterAnimationProps {
  endValue: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export const CounterAnimation = ({
  endValue,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
}: CounterAnimationProps) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrameId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = Math.floor(progress * endValue)
      setCount(current)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [inView, endValue, duration])

  return (
    <div ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </div>
  )
}
