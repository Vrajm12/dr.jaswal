import { useEffect, useRef, useState } from "react"

export const useInView = (
  options: IntersectionObserverInit & { triggerOnce?: boolean } = {},
  callback?: (inView: boolean) => void,
) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const { triggerOnce, ...observerOptions } = {
      threshold: 0.1,
      ...options,
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (triggerOnce) {
          setTriggered(true)
          observer.unobserve(entry.target)
        }
        callback?.(true)
      } else if (!triggerOnce) {
        setInView(false)
        callback?.(false)
      }
    }, observerOptions)

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [callback, options])

  return { ref, inView: triggered || inView }
}
