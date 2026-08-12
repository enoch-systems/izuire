"use client"

import { useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChevronDown, ChevronLeft, ShieldCheck, Package, Truck, Sparkles } from "lucide-react"

const faqCategories = [
  {
    title: "Sourcing & Orders",
    questions: [
      {
        q: "What is the minimum order quantity?",
        a: "Minimum order is 2 bales. Small orders are 80kg and large orders are baled between 40kg and 80kg each. This ensures quality control and proper grading of every item."
      },
      {
        q: "How do I place an order?",
        a: "Simply browse our shop and select the bales you want. Add them to your cart and checkout. You can also order directly via WhatsApp for faster service and personalized assistance."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfers, Western Union, and other international payment methods. Payment details are provided after order confirmation. We require 50% deposit to begin sourcing."
      },
      {
        q: "How long does the sourcing process take?",
        a: "Standard sourcing takes 5-7 business days. Rush orders can be completed in 2-3 days for an additional fee. We keep you updated throughout the process."
      }
    ]
  },
  {
    title: "Shipping & Delivery",
    questions: [
      {
        q: "Where do you ship to?",
        a: "We ship worldwide. Shipping costs and delivery times vary by destination. Contact us for specific quotes to your country. We have strong logistics networks to Africa, Europe, and beyond."
      },
      {
        q: "How long does shipping take?",
        a: "Shipping typically takes 15-30 days depending on your location. Air freight is available for urgent orders at an additional cost. We provide tracking information for all shipments."
      },
      {
        q: "Do you handle customs clearance?",
        a: "Yes, we assist with customs documentation and clearance procedures. We provide all necessary paperwork to ensure smooth clearance at your port of entry."
      },
      {
        q: "What are the shipping costs?",
        a: "Shipping costs depend on weight, destination, and shipping method. We provide detailed quotes before you confirm your order. No hidden fees."
      }
    ]
  },
  {
    title: "Quality & Inspection",
    questions: [
      {
        q: "How do you ensure quality?",
        a: "Every bale undergoes rigorous inspection before shipping. We check for damage, verify grades, and ensure proper sorting. Photos and videos are provided before dispatch."
      },
      {
        q: "What if I receive damaged items?",
        a: "We take full responsibility for quality. If you receive damaged or incorrectly graded items, we provide replacements or refunds. Contact us within 48 hours of delivery with photos."
      },
      {
        q: "Can I request specific items?",
        a: "Yes! We offer custom sourcing services. Tell us what you need and we'll find it. Additional fees may apply for specialized sourcing requests."
      },
      {
        q: "What quality grades do you offer?",
        a: "We grade thrift stock as Premium (excellent condition), Grade A (very good), and Grade B (good). Each grade has clear criteria so you know exactly what to expect."
      }
    ]
  },
  {
    title: "Services & Pricing",
    questions: [
      {
        q: "What services do you offer?",
        a: "We provide sourcing, quality inspection, purchase, consolidation, and shipping. Our full-day service (¥500) includes sourcing and inspection. Half-day service (¥250) is also available."
      },
      {
        q: "What's included in the service charge?",
        a: "Our service charge covers sourcing from suppliers, quality inspection, photography, consolidation, and documentation. Transport within Guangzhou is included. Outside GZ transport is additional."
      },
      {
        q: "Do you offer bulk discounts?",
        a: "Yes! We offer competitive pricing for bulk orders. The more you order, the better the rate. Contact us for custom quotes on large volume orders."
      },
      {
        q: "What are your payment terms?",
        a: "50% deposit to begin sourcing, 50% before shipping. For established clients, we offer credit terms. Payment plans are available for large orders."
      }
    ]
  },
  {
    title: "Support & Communication",
    questions: [
      {
        q: "How can I contact you?",
        a: "We're available via WhatsApp and Telegram for fast communication. Response time is typically under 1 hour during business hours (Mon-Sat, 9am-6pm China time)."
      },
      {
        q: "Do you provide updates during the process?",
        a: "Absolutely! We send regular updates including photos and videos of your items. You'll receive notifications at each stage: sourcing, inspection, packing, and shipping."
      },
      {
        q: "Can I visit your facility in China?",
        a: "Yes! We welcome clients to visit our Guangzhou facility. Please contact us in advance to schedule a visit. We can also arrange accommodation and transport during your stay."
      }
    ]
  }
]

export default function FAQPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />

      <div className="pt-4 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Back button */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mb-10 inline-flex items-center gap-1.5 font-mono text-[0.78rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {/* Header */}
          <div className="max-w-2xl">
            <div className="eyebrow font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-4 flex items-center gap-2.5">
              <span className="w-7 h-[2px] bg-primary inline-block" />
              Got Questions?
            </div>
            <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.04] tracking-[-0.01em] mb-5">
              Frequently Asked <em className="not-italic text-primary">Questions</em>
            </h1>
            <p className="text-[1.05rem] text-foreground/70 max-w-[520px]">
              Everything you need to know about sourcing thrift bales, quality inspection, shipping, and our services.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-16">
            {faqCategories.map((category) => (
              <section key={category.title}>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8 pb-4 border-b border-border/50">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <details
                      key={index}
                      className="group bg-card rounded-2xl boty-shadow overflow-hidden boty-transition open:bg-card"
                    >
                      <summary className="flex items-center justify-between gap-4 p-5 md:p-6 cursor-pointer list-none text-foreground font-medium hover:text-primary boty-transition">
                        <span className="text-sm md:text-base">{item.q}</span>
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 boty-transition group-open:rotate-180" />
                      </summary>
                      <div className="px-5 md:px-6 pb-5 md:pb-6">
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-20 text-center bg-card rounded-3xl p-10 md:p-14 boty-shadow">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Can't find the answer you're looking for? Our team is ready to help you with any questions about sourcing, quality, or shipping.
            </p>
            <a
              href="https://wa.me/2349031560905?text=Hello!%20I%20have%20a%20question%20about%20your%20sourcing%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90 boty-shadow"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}