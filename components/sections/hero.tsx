"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const heroImages = [
  "https://res.cloudinary.com/deafv5ovi/image/upload/v1785729916/WhatsApp_Image_2026-08-02_at_9.18.28_PM_xa9aol.jpg",
  "https://res.cloudinary.com/deafv5ovi/image/upload/v1785729915/WhatsApp_Image_2026-08-02_at_9.18.29_PM_nehk7c.jpg",
]

export function Hero() {
  const [desktopOrder, setDesktopOrder] = useState([0, 1])

  useEffect(() => {
    const timer = setInterval(() => {
      setDesktopOrder((current) => [current[1], current[0]])
    }, 2600)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="border-b border-border relative overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <div className="eyebrow font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-4 flex items-center gap-2.5">
              <span className="w-7 h-[2px] bg-primary inline-block" />
              Sourced in China · Graded Before Shipping
            </div>
            <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.04] tracking-[-0.01em] mb-5">
              Quality thrift bales,<br />
              without the <em className="not-italic text-primary">guesswork.</em>
            </h1>
            <p className="text-[1.05rem] text-foreground/70 max-w-[480px] mb-7">
              IZUIRE connects you directly to graded secondhand stock from China, sold in bales only. Minimum order is 2 bales, with small orders at 80kg and large orders baled between 40kg and 80kg.
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <Link href="/shop" className="ed-btn ed-btn-primary ed-btn-lg">
                Browse Stock
              </Link>
              <Link
                href="https://wa.me/2349031560905?text=Hello!%20I'm%20interested%20in%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="ed-btn ed-btn-ghost ed-btn-lg"
              >
                Order on WhatsApp
              </Link>
            </div>
          </div>

          {/* Right: Manifest Ticket */}
          <div className="bg-foreground text-background rounded-lg p-5 sm:p-7 relative font-mono shadow-[10px_10px_0_var(--mustard)]">
            <div className="flex justify-between items-start gap-2 border-b border-dashed border-background/25 pb-3.5 mb-3.5">
              <div className="font-serif text-sm sm:text-base tracking-[0.08em]">SERVICE CHARGE</div>
              <div className="border-2 border-primary text-primary text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded-[3px] rotate-3 whitespace-nowrap">
                Verified
              </div>
            </div>
              <div className="flex justify-between gap-3 text-[0.72rem] sm:text-[0.82rem] py-[7px] border-b border-background/10">
                <span className="text-background/55 shrink-0">Service</span>
                <span className="font-bold text-right">Sourcing · Inspection · Purchase</span>
              </div>
              <div className="flex justify-between gap-3 text-[0.72rem] sm:text-[0.82rem] py-[7px] border-b border-background/10">
                <span className="text-background/55 shrink-0">Full Day</span>
                <span className="font-bold text-right">¥500 (incl. transport)</span>
              </div>
              <div className="flex justify-between gap-3 text-[0.72rem] sm:text-[0.82rem] py-[7px] border-b border-background/10">
                <span className="text-background/55 shrink-0">Half Day</span>
                <span className="font-bold text-right">¥250 (incl. transport)</span>
              </div>
              <div className="flex justify-between gap-3 text-[0.72rem] sm:text-[0.82rem] py-[7px] border-b border-background/10">
                <span className="text-background/55 shrink-0">Location</span>
                <span className="font-bold text-right">Guangzhou, China</span>
              </div>
              <div className="flex justify-between gap-3 text-[0.72rem] sm:text-[0.82rem] py-[7px] border-b border-background/10">
                <span className="text-background/55 shrink-0">Outside GZ</span>
                <span className="font-bold text-right">Transport fare + service</span>
              </div>
              <div className="flex justify-between gap-3 text-[0.72rem] sm:text-[0.82rem] py-[7px] border-b border-background/10">
                <span className="text-background/55 shrink-0">Support</span>
                <span className="font-bold text-right">WhatsApp · Telegram</span>
              </div>
              <div className="mt-4 text-[0.65rem] sm:text-[0.7rem] text-background/45 leading-relaxed">
              We source, inspect and purchase with ease. Ask about availability via WhatsApp or Telegram.
            </div>
          </div>
        </div>
      </div>

      {/* Image strip below hero */}
      <div className="max-w-[1140px] mx-auto px-6 pb-14">
        <div className="hidden lg:flex h-full w-full gap-4">
          {desktopOrder.map((index) => (
            <div key={`${heroImages[index]}-${index}`} className="h-64 flex-1 overflow-hidden rounded-lg transition-all duration-700 ease-in-out">
              <img
                src={heroImages[index]}
                alt="IZUIRE premium thrift collection"
                className="h-full w-full object-cover"
                style={{
                  objectPosition: "center center",
                  filter: "saturate(0.9) contrast(1.02)",
                }}
              />
            </div>
          ))}
        </div>
        <div className="lg:hidden">
          <img
            src={heroImages[0]}
            alt="IZUIRE premium thrift collection"
            className="h-64 w-full object-cover rounded-lg"
            style={{
              objectPosition: "center center",
              filter: "saturate(0.9) contrast(1.02)",
            }}
          />
        </div>
      </div>
    </section>
  )
}