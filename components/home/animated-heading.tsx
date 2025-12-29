"use client"

import { useEffect, useState } from "react"

const AnimatedHeading = () => {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Healing Through Innovation & Compassion"
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined

    if (isTyping && displayText.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1))
      }, 50)
    } else if (displayText.length === fullText.length) {
      setIsTyping(false)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [displayText, isTyping])

  return (
    <div className="mb-6">
      <div className="h-20 md:h-24 lg:h-28 flex items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          <span className="inline-block">
            {displayText}
            {isTyping && displayText.length < fullText.length && (
              <span className="inline-block w-1 h-10 md:h-12 lg:h-14 bg-primary ml-2 animate-pulse"></span>
            )}
          </span>
        </h1>
      </div>

      {/* CHANGE: Added gradient underline animation */}
      <div className="h-1 w-32 md:w-40 bg-linear-to-r from-[#2F72B8] via-[#3B96D7] to-[#5E3491] rounded-full mt-4 animate-pulse-glow"></div>
    </div>
  )
}

export default AnimatedHeading
