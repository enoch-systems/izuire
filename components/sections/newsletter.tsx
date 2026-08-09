"use client"

import React from "react"
import Link from "next/link"

const YOUTUBE_URL = "https://www.youtube.com/"

const steps = [
  {
    num: "1",
    title: "Browse and inquire",
    description: "Check the catalog for available categories. Message us on WhatsApp or Telegram to confirm current stock and grades."
  },
  {
    num: "2",
    title: "Select your bales",
    description: "Minimum order is 2 bales. We confirm your selection and share service charge and payment details in chat."
  },
  {
    num: "3",
    title: "Pack and ship",
    description: "Your bales are packed, sealed and shipped from Guangzhou. Tracking details are shared once dispatched."
  }
]

export function Newsletter() {
  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-9">
          <div>
            <span className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-3 block">
              How To Order
            </span>
            <h2 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] leading-tight text-foreground">
              Source smarter together
            </h2>
            <p className="text-[0.95rem] text-foreground/60 max-w-[420px] mt-2">
              From sourcing to shipping, we handle every stage. Here's how it works.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div key={step.num} className="bg-card border border-border rounded-lg p-7 relative">
              <div className="font-mono text-[0.75rem] text-primary border-[1.5px] border-primary rounded-full w-[30px] h-[30px] flex items-center justify-center mb-4 font-bold">
                {step.num}
              </div>
              <h3 className="font-serif text-[1.05rem] mb-2">{step.title}</h3>
              <p className="text-[0.9rem] text-foreground/60">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Contact channels */}
        <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-serif text-[clamp(1.8rem,5vw,2.6rem)] mb-3.5">
              Let's source smarter together.
            </h2>
            <p className="text-foreground/65 mb-6 max-w-[440px]">
              Reach us directly — no forms, no waiting. Pick the channel that works for you and we'll take it from there.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/2349031560905?text=Hello!%20I'm%20interested%20in%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-4 transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--mustard)]"
            >
              <div>
                <div className="font-serif text-base">WhatsApp</div>
                <div className="font-mono text-[0.72rem] text-foreground/50 mt-1">Fastest response · catalog available</div>
              </div>
              <span>→</span>
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-4 transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--mustard)]"
            >
              <div>
                <div className="font-serif text-base">YouTube</div>
                <div className="font-mono text-[0.72rem] text-foreground/50 mt-1">Sourcing, unboxings and more</div>
              </div>
              <span>→</span>
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-4 transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--mustard)]"
            >
              <div>
                <div className="font-serif text-base">Contact Page</div>
                <div className="font-mono text-[0.72rem] text-foreground/50 mt-1">Questions, feedback & support</div>
              </div>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}