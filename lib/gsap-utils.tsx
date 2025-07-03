"use client"

import { useEffect, useRef } from "react"

// GSAP animation utilities
export const useGSAPAnimation = () => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      return { gsap, ScrollTrigger }
    }

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (elementRef.current) {
        // Fade in animation
        gsap.fromTo(
          elementRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elementRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    })
  }, [])

  return elementRef
}

export const useStaggerAnimation = (selector: string, delay = 0.1) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      return { gsap, ScrollTrigger }
    }

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll(selector)

        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    })
  }, [selector, delay])

  return containerRef
}

export const useHeroAnimation = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      return { gsap }
    }

    loadGSAP().then(({ gsap }) => {
      if (heroRef.current) {
        const tl = gsap.timeline()

        // Animate hero elements in sequence
        tl.fromTo(
          heroRef.current.querySelector("h1"),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        )
          .fromTo(
            heroRef.current.querySelector("h2"),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.5",
          )
          .fromTo(
            heroRef.current.querySelectorAll(".trust-indicator"),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
            "-=0.3",
          )
          .fromTo(
            heroRef.current.querySelector(".hero-description"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.4",
          )
          .fromTo(
            heroRef.current.querySelectorAll(".hero-button"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            "-=0.3",
          )
      }
    })
  }, [])

  return heroRef
}
