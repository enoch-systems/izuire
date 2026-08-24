"use client"

import { useEffect, useRef, useState } from "react"
import { ShieldCheck, BadgeCheck } from "lucide-react"

const featureVideo = "https://res.cloudinary.com/wglgwuwj/video/upload/v1787583323/WhatsApp_Video_2026-08-24_at_5.10.40_AM.mp4"

export function FeatureSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const bentoRef = useRef<HTMLDivElement>(null)
  const videoSectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
  
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (bentoRef.current) {
      observer.observe(bentoRef.current)
    }

    if (videoSectionRef.current) {
      videoObserver.observe(videoSectionRef.current)
    }

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    return () => {
      if (bentoRef.current) {
        observer.unobserve(bentoRef.current)
      }
      if (videoSectionRef.current) {
        videoObserver.unobserve(videoSectionRef.current)
      }
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <section className="bg-foreground text-background border-b border-border">
      <div className="max-w-[1140px] mx-auto px-6 py-16">
        <div
          ref={videoSectionRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Why Choose video */}
          <div
            className={`relative aspect-[4/5] overflow-hidden rounded-lg border border-background/15 transition-all duration-700 ease-out ${
              isVideoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={featureVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="IZUIRE sourcing and quality inspection"
            />
          </div>

          {/* Content */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ease-out ${
              isVideoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className={`font-mono text-[0.78rem] uppercase tracking-[0.18em] text-accent mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
              Why Choose IZUIRE
            </span>
            <h2 className={`font-serif text-[clamp(1.8rem,5vw,2.6rem)] leading-tight text-background mb-6 text-balance ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
              Source smarter, grow bigger.
            </h2>
            <p className={`text-[0.95rem] text-background/65 leading-relaxed mb-10 max-w-md ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
              We connect businesses with trusted manufacturers, manage every stage of the sourcing process, and deliver solutions that create lasting value.
            </p>

            {/* Grade cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-background/5 backdrop-blur-sm border border-background/10 p-5 sm:p-6 transition-all duration-300 ease-out hover:bg-background/10 hover:border-background/20">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent/80 mb-2 block">
                  Verified Suppliers
                </span>
                <h3 className="font-sans font-semibold text-[1.15rem] leading-snug mb-2">Trusted manufacturers</h3>
                <p className="text-[0.85rem] text-background/60 leading-relaxed">
                  We connect you with verified suppliers in Guangzhou, ensuring reliable sourcing every time.
                </p>
              </div>
              <div className="rounded-2xl bg-background/5 backdrop-blur-sm border border-background/10 p-5 sm:p-6 transition-all duration-300 ease-out hover:bg-background/10 hover:border-background/20">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-primary/80 mb-2 block">
                  Quality Inspection
                </span>
                <h3 className="font-sans font-semibold text-[1.15rem] leading-snug mb-2">Checked before shipping</h3>
                <p className="text-[0.85rem] text-background/60 leading-relaxed">
                  Every item is inspected and graded before listing. Class A and B quality grades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}