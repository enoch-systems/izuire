"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

type ModalType = "privacy" | "terms" | "shipping"

interface PolicyModalProps {
  type: ModalType | null
  onClose: () => void
}

const content: Record<ModalType, { title: string; body: string }> = {
  privacy: {
    title: "Privacy Policy",
    body: `Your privacy is important to us. At IZUIRE, we are committed to protecting the personal information you share with us.

Information We Collect
We collect information you provide directly to us, such as your name, email address, phone number, and shipping address when you place an order or contact us. We also automatically collect certain data when you visit our site, including your IP address, browser type, and browsing behavior.

How We Use Your Information
We use your information to process orders, improve your sourcing experience, send updates about your order, and provide customer support. With your consent, we may also send information about new thrift stock arrivals or sourcing offers.

Data Security
Your data is secured using industry-standard encryption and security protocols. We do not sell, trade, or share your personal information with third parties except as necessary to fulfill your orders (e.g., shipping carriers) or as required by law.

Transparency
We believe in full transparency. You have the right to access, update, or delete your personal data at any time. Contact us if you have any questions about how your data is handled.

Cookies
Our site uses cookies to enhance your browsing experience and analyze site traffic. You can control cookie preferences through your browser settings.

Third-Party Services
We may use trusted third-party services (payment processors, analytics, shipping) that adhere to strict data protection standards. These services are contractually obligated to keep your data secure.

Policy Updates
We may update this policy from time to time. Changes will be posted on this page. By continuing to use our site, you accept any updates to this policy.

Contact
If you have questions about this Privacy Policy, please contact us at +2349031560905 {WhatsApp}.`
  },
  terms: {
    title: "Terms of Service",
    body: `Welcome to IZUIRE. By using our website and purchasing our thrift bales, you agree to the following terms and conditions.

General
All products displayed on our website are subject to availability. We reserve the right to modify or discontinue any product without prior notice. Prices are subject to change without notice.

Orders
When you place an order, you agree to provide accurate and complete information. Minimum order is 2 bales. We reserve the right to cancel or refuse any order at our discretion. Order confirmation does not constitute acceptance of the order until payment has been processed.

Payments
We accept bank transfers, Western Union, and other payment methods as displayed at checkout. A 50% deposit is required to begin sourcing, with the remaining 50% due before shipping. All transactions are processed securely.

Quality & Inspection
Every bale is inspected and graded before shipping. We provide photos and videos of your items before dispatch. If items are received damaged or incorrectly graded, contact us within 48 hours of delivery with photos for replacement or refund.

Intellectual Property
All content on this website — including text, images, logos, and designs — is the property of IZUIRE and is protected by copyright laws. You may not reproduce, distribute, or use any content without our written permission.

User Conduct
You agree not to use our website for any unlawful purpose or in any way that could damage, disable, or impair the site. You may not attempt to gain unauthorized access to any part of our systems.

Limitation of Liability
IZUIRE shall not be held liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products or website, to the fullest extent permitted by law.

Modifications
We reserve the right to update these terms at any time. Changes will be effective immediately upon posting. Continued use of the site after changes constitutes acceptance of the new terms.

Governing Law
These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved in the applicable courts.`
  },
  shipping: {
    title: "Shipping Policy",
    body: `At IZUIRE, we deliver thrift bales to customers across Africa and beyond.

Processing Time
Orders are processed within 1–3 business days after payment confirmation. Sourcing typically takes 5-7 business days. Orders placed on weekends or public holidays will be processed on the next business day.

Shipping Methods & Delivery
We offer sea freight and air freight options based on your location. Sea freight typically takes 15-30 days, while air freight takes 5-7 days. Estimated delivery times vary based on your region.

Shipping Rates
Shipping costs are calculated based on your delivery address, bale weight, and chosen shipping method. Contact us for specific quotes to your destination.

Order Tracking
Once your order is shipped, you will receive a confirmation with tracking information. You can track your package directly through the carrier's website.

Customs & Duties
International orders may be subject to customs duties, taxes, and import fees. These are the responsibility of the customer. We assist with documentation to ensure smooth clearance.

Delivery Issues
If your package is lost or damaged during transit, please contact us within 48 hours of expected delivery. We will work with the carrier to resolve the issue promptly.

Address Accuracy
Please ensure your shipping address is correct at the time of order. IZUIRE is not responsible for packages delivered to an incorrect address provided by the customer.

Contact
For any shipping-related inquiries, reach out to us at +2349031560905 {WhatsApp}.`
  }
}

export function PolicyModal({ type, onClose }: PolicyModalProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (type) {
      // Trigger entrance animation on next frame
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
    }
  }, [type])

  useEffect(() => {
    if (!type) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    document.addEventListener("keydown", handleEscape)
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [type])

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300) // Wait for exit animation
  }

  if (!type) return null

  const { title, body } = content[type]

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] backdrop-blur-sm bg-black/30 transition-all duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-[101] flex items-center justify-center p-4 transition-all duration-300 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <div
          className="bg-card rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto boty-shadow hide-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-card z-10 flex items-center justify-between p-6 pb-4 border-b border-border/50">
            <h2 className="font-serif text-2xl text-foreground">{title}</h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 pt-4">
            {body.split("\n\n").map((paragraph, i) => {
              const lines = paragraph.split("\n")
              const isHeading = lines.length === 1 && lines[0].length < 40 && !lines[0].endsWith(".")
              
              if (isHeading) {
                return (
                  <h3 key={i} className="font-medium text-foreground mt-5 mb-2 first:mt-0">
                    {lines[0]}
                  </h3>
                )
              }

              return (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-4 last:mb-0">
                  {paragraph.includes("+2349031560905") ? (
                    <>
                      {paragraph.replace(/\+2349031560905 \{WhatsApp\}/, "")}
                      <a
                        href="https://wa.me/2349031560905?text=Hello!%20I%20have%20a%20question%20about%20your%20policies."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline underline-offset-2 boty-transition"
                      >
                        +2349031560905 {`{WhatsApp}`}
                      </a>
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}