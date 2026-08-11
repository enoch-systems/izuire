"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle, ChevronLeft } from "lucide-react"

export default function ContactPage() {
  const router = useRouter()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [])

  const whyChooseRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (whyChooseRef.current) {
      observer.observe(whyChooseRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const contactCards = [
    {
      icon: Phone,
      label: "Phone",
      sub: "Call us anytime",
      value: "+234 9031560905",
      href: "tel:+2349031560905",
    },
    {
      icon: Mail,
      label: "Email",
      sub: "Send us a message",
      value: "info@izuire.com",
      href: "mailto:info@izuire.com",
    },
    {
      icon: MapPin,
      label: "Location",
      sub: "Visit our facility",
      value: "Guangzhou, China",
      mapsUrl: "https://www.google.com/maps/place/Guangzhou,+Guangdong+Province,+China/@23.124227,112.5683925,9z/data=!3m1!4b1!4m6!3m5!1s0x3402f895a35c2bc7:0xe59e075adeae415!8m2!3d23.1290799!4d113.26436!16zL20vMDM5M2c?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: Clock,
      label: "Hours",
      sub: "Business hours",
      value: "Mon–Sat: 9am–6pm",
    },
  ]

  const socials = [
    {
      name: "Instagram",
      icon: "https://res.cloudinary.com/deafv5ovi/image/upload/v1784573107/instagram_u9lr7l.png",
      url: "https://www.instagram.com/ammie_nwigs?igsh=MWR4NXJyeXB4dTlvZw==",
    },
    {
      name: "TikTok",
      icon: "https://res.cloudinary.com/deafv5ovi/image/upload/v1784573107/tiktok_rsrzwc.png",
      url: "https://www.tiktok.com/@amysglamroom?_r=1&_t=ZS-988kqtnNJoq",
    },
    {
      name: "Facebook",
      icon: "https://res.cloudinary.com/deafv5ovi/image/upload/v1784573107/facebook_qgj6dg.png",
      url: "https://www.facebook.com/share/1PFS4iCgiH/?mibextid=wwXIfr",
    },
    {
      name: "YouTube",
      icon: "https://res.cloudinary.com/deafv5ovi/image/upload/v1784573106/youtube_qtbvcz.png",
      url: "https://www.youtube.com/@TheAmmieN",
    },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-6 pt-6 pb-16 md:pt-8 md:pb-20">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-10 inline-flex items-center gap-1.5 font-mono text-[0.78rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <div className="max-w-2xl">
            <div className="eyebrow font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-4 flex items-center gap-2.5">
              <span className="w-7 h-[2px] bg-primary inline-block" />
              Get In Touch
            </div>
            <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.04] tracking-[-0.01em] mb-5">
              Let's talk <em className="not-italic text-primary">sourcing.</em>
            </h1>
            <p className="text-[1.05rem] text-foreground/70 max-w-[520px]">
              Have a question about thrift bales, quality inspection, or shipping? Our team in Guangzhou is ready to help you get started.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Contact Info Cards ===== */}
      <section className="py-16 border-b border-border">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card) => {
              const inner = (
                <>
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-primary/80 mb-1.5">
                    {card.label}
                  </div>
                  <div className="text-[0.85rem] text-foreground/55 mb-2">{card.sub}</div>
                  {card.label === "Phone" ? (
                    <div>
                      <div className="font-mono font-semibold text-[1rem] tracking-tight text-foreground group-hover:text-primary transition-colors tabular-nums">
                        {card.value}
                      </div>
                      <span className="absolute bottom-4 right-4 lg:static lg:mt-2 inline-flex font-mono text-[0.6rem] uppercase tracking-[0.1em] text-primary border-[1.5px] border-primary rounded-[3px] px-1.5 py-0.5 rotate-3 whitespace-nowrap">
                        Tap to call
                      </span>
                    </div>
                  ) : card.label === "Email" ? (
                    <div>
                      <div className="font-mono font-semibold text-[0.85rem] tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {card.value}
                      </div>
                      <span className="absolute bottom-4 right-4 lg:static lg:mt-2 inline-flex font-mono text-[0.6rem] uppercase tracking-[0.1em] text-primary border-[1.5px] border-primary rounded-[3px] px-1.5 py-0.5 rotate-3 whitespace-nowrap">
                        Tap to email
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="font-sans font-semibold text-base text-foreground">{card.value}</div>
                    </div>
                  )}
                </>
              )

              return card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  className="group block bg-card border border-border rounded-lg p-6 relative transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[3px_3px_0_rgba(196,90,59,0.2)]"
                >
                  {inner}
                </a>
              ) : card.mapsUrl ? (
                <a
                  key={card.label}
                  href={card.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-card border border-border rounded-lg p-6 relative transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[3px_3px_0_rgba(196,90,59,0.2)]"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={card.label}
                  className="bg-card border border-border rounded-lg p-6 relative transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[3px_3px_0_rgba(196,90,59,0.2)]"
                >
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== Form + Info ===== */}
      <section className="py-16 border-b border-border">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-16 items-start">
            {/* Form */}
            <div>
              <span className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-3 block">
                Send A Message
              </span>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] leading-tight mb-3">
                Tell us what you need
              </h2>
              <p className="text-[0.95rem] text-foreground/60 max-w-[440px] mb-8">
                Fill out the form and we'll get back to you within 24 hours. Prefer instant replies? Use WhatsApp.
              </p>

              {submitted ? (
                <div className="bg-card border border-border rounded-lg p-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">Message sent</h3>
                  <p className="text-[0.9rem] text-foreground/60 mb-6">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormState({ name: "", email: "", subject: "", message: "" })
                    }}
                    className="ed-btn ed-btn-ghost"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/60 block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full bg-card border border-border rounded-lg px-4 py-3.5 text-[0.95rem] text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/60 block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full bg-card border border-border rounded-lg px-4 py-3.5 text-[0.95rem] text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/60 block mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="What is this about?"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3.5 text-[0.95rem] text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/60 block mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell us about your sourcing needs, bale preferences, or any questions…"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3.5 text-[0.95rem] text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="ed-btn ed-btn-primary ed-btn-lg">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Side info */}
            <div className="space-y-5">
              {/* WhatsApp card */}
              <div className="bg-foreground text-background rounded-lg p-7 relative font-mono shadow-[8px_8px_0_var(--mustard)]">
                <div className="flex justify-between items-start gap-2 border-b border-dashed border-background/25 pb-3.5 mb-4">
                  <div className="font-serif text-sm tracking-[0.08em]">FASTEST RESPONSE</div>
                  <div className="border-2 border-primary text-primary text-[0.6rem] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded-[3px] rotate-3 whitespace-nowrap">
                    Live
                  </div>
                </div>
                <div className="flex justify-between gap-3 text-[0.72rem] py-[7px] border-b border-background/10">
                  <span className="text-background/55 shrink-0">Channel</span>
                  <span className="font-bold text-right">WhatsApp · Telegram</span>
                </div>
                <div className="flex justify-between gap-3 text-[0.72rem] py-[7px] border-b border-background/10">
                  <span className="text-background/55 shrink-0">Response</span>
                  <span className="font-bold text-right">Within minutes</span>
                </div>
                <div className="flex justify-between gap-3 text-[0.72rem] py-[7px] border-b border-background/10">
                  <span className="text-background/55 shrink-0">Catalog</span>
                  <span className="font-bold text-right">Available in chat</span>
                </div>
                <div className="flex justify-between gap-3 text-[0.72rem] py-[7px] border-b border-background/10">
                  <span className="text-background/55 shrink-0">Orders</span>
                  <span className="font-bold text-right">Min. 2 bales</span>
                </div>
                <a
                  href="https://wa.me/2349031560905?text=Hello!%20I'm%20interested%20in%20your%20thrift%20sourcing%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-[0.72rem] font-bold uppercase tracking-[0.08em] px-5 py-3 rounded-[4px] transition-all duration-150 ease-out hover:bg-primary/90 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  Start Chat
                </a>
              </div>

              {/* Why choose card */}
              <div ref={whyChooseRef} className="bg-card border border-border rounded-lg p-7">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-primary/80 mb-4 block">
                  Why IZUIRE
                </span>
                <div className="space-y-5">
                  <div 
                    className="flex items-start gap-4 transition-all duration-700 ease-out"
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: '0.1s'
                    }}
                  >
                    <div className="font-serif text-2xl text-primary leading-none mt-0.5">100%</div>
                    <div className="text-[0.85rem] text-foreground/60 leading-relaxed">
                      Quality inspection on every bale before shipping
                    </div>
                  </div>
                  <div 
                    className="flex items-start gap-4 transition-all duration-700 ease-out"
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: '0.2s'
                    }}
                  >
                    <div className="font-serif text-2xl text-primary leading-none mt-0.5">500+</div>
                    <div className="text-[0.85rem] text-foreground/60 leading-relaxed">
                      Happy resellers across Africa and beyond
                    </div>
                  </div>
                  <div 
                    className="flex items-start gap-4 transition-all duration-700 ease-out"
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: '0.3s'
                    }}
                  >
                    <div className="font-serif text-2xl text-primary leading-none mt-0.5">15+</div>
                    <div className="text-[0.85rem] text-foreground/60 leading-relaxed">
                      Countries served with reliable shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Social Links ===== */}
      <section className="py-16 border-b border-border">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex justify-between items-end flex-wrap gap-4 mb-9">
            <div>
              <span className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-3 block">
                Follow Us
              </span>
              <h2 className="font-serif text-[clamp(1.6rem,4vw,2.4rem)] leading-tight">
                Stay in the loop
              </h2>
              <p className="text-[0.95rem] text-foreground/60 max-w-[420px] mt-2">
                New bale arrivals, sourcing tips, and success stories from resellers across Africa.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-7 rounded-lg bg-card border border-border transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[3px_3px_0_rgba(196,90,59,0.2)]"
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  className="w-12 h-12 object-contain transition-transform duration-200 group-hover:scale-110"
                />
                <span className="font-serif text-[0.95rem] text-foreground">{social.name}</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground/40 group-hover:text-primary transition-colors">
                  Follow →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="py-16">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="bg-foreground text-background rounded-lg p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            <div className="relative max-w-2xl mx-auto text-center">
              <span className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-accent mb-4 block">
                Ready To Start?
              </span>
              <h2 className="font-serif text-[clamp(1.8rem,5vw,2.6rem)] leading-tight mb-4">
                Source smarter, grow bigger.
              </h2>
              <p className="text-[0.95rem] text-background/65 leading-relaxed max-w-md mx-auto mb-8">
                The fastest way to get started is through WhatsApp. Chat with our team directly, ask questions, and place your order in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/2349031560905?text=Hello!%20I'm%20interested%20in%20your%20thrift%20sourcing%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-mono text-[0.78rem] font-bold uppercase tracking-[0.08em] px-8 py-4 rounded-[4px] transition-all duration-150 ease-out hover:bg-primary/90 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
                <a
                  href="mailto:info@izuire.com"
                  className="inline-flex items-center justify-center gap-2 border-[1.5px] border-background/40 text-background font-mono text-[0.78rem] font-bold uppercase tracking-[0.08em] px-8 py-4 rounded-[4px] transition-all duration-150 ease-out hover:bg-background hover:text-foreground hover:-translate-y-0.5"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}