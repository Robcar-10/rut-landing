"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// GSAP animation utilities
export const useGSAPAnimation = () => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const element = elementRef.current
    if (!element) return

    // Fade in animation with ScrollTrigger
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [])

  return elementRef
}

export const useStaggerAnimation = (selector: string, delay = 0.1) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(selector)
    if (elements.length === 0) return

    // Stagger animation with ScrollTrigger
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [selector, delay])

  return containerRef
}

export const useHeroAnimation = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const hero = heroRef.current
    if (!hero) return

    const tl = gsap.timeline()

    // Animate hero elements in sequence
    tl.fromTo(hero.querySelector("h1"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
      .fromTo(
        hero.querySelector("h2"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      )
      .fromTo(
        hero.querySelectorAll(".trust-indicator"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.3",
      )
      .fromTo(
        hero.querySelector(".hero-description"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4",
      )
      .fromTo(
        hero.querySelectorAll(".hero-button"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.3",
      )

    // Cleanup function
    return () => {
      tl.kill()
    }
  }, [])

  return heroRef
}

// Utility function to refresh ScrollTrigger (useful for dynamic content)
export const refreshScrollTrigger = () => {
  if (typeof window !== "undefined" && ScrollTrigger) {
    ScrollTrigger.refresh()
  }
}

// Utility function to kill all ScrollTriggers (useful for cleanup)
export const killAllScrollTriggers = () => {
  if (typeof window !== "undefined" && ScrollTrigger) {
    ScrollTrigger.killAll()
  }
}
