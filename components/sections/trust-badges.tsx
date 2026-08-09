"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Scissors, Sparkles, Heart } from "lucide-react"

const badges = [
  {
    icon: Award,
    label: "Sourcing",
    value: "Direct from China warehouses"
  },
  {
    icon: Scissors,
    label: "Inspection",
    value: "Every item checked & graded"
  },
  {
    icon: Sparkles,
    label: "Orders",
    value: "Bales only, 2 bale minimum"
  },
  {
    icon: Heart,
    label: "Support",
    value: "WhatsApp + Telegram"
  }
]

export function TrustBadges() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="border-b border-border bg-secondary">
      <div className="max-w-[1140px] mx-auto px-6">
        <div
          ref={sectionRef}
          className="grid grid-cols-2 lg:grid-cols-4"
        >
          {badges.map((badge, index) => (
            <div
              key={badge.label}
              className={`p-5 md:p-6 border-r border-border last:border-r-0 ${
                index >= 2 ? "border-t lg:border-t-0" : ""
              } ${index % 2 === 1 ? "border-r-0 lg:border-r" : ""} ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <badge.icon className="text-primary mb-2 size-5 md:size-6" strokeWidth={1.5} />
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-primary mb-1.5">
                {badge.label}
              </div>
              <div
                className={
                  badge.value === "Direct from China warehouses"
                    ? "font-bold text-[0.95rem] md:text-[1.05rem] leading-snug"
                    : badge.value === "Every item checked & graded" ||
                        badge.value === "Bales only, 2 bale minimum" ||
                        badge.value === "WhatsApp + Telegram"
                      ? "font-bold text-[0.95rem] md:text-[1.05rem] leading-snug"
                      : "font-serif text-[0.95rem] md:text-[1.05rem] leading-snug"
                }
              >
                {badge.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}