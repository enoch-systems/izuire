"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Minus, Plus, ChevronDown, ShoppingBag, Heart, Recycle, Award, Star, Check, ShieldCheck, Package, Truck } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCart } from "@/components/providers/cart-context"
import { hardcodedProducts, type HardcodedProduct } from "@/lib/hardcoded-products"

const benefits = [
  { icon: ShieldCheck, label: "100% Inspected" },
  { icon: Heart, label: "Premium Quality" },
  { icon: Recycle, label: "Properly Graded" },
  { icon: Award, label: "Ready for Resale" }
]

const formatUsdPrice = (value: number | string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)

type AccordionSection = "details" | "delivery"

interface ProductPageClientProps {
  productId: string
  initialProduct: HardcodedProduct
  initialSuggestions: HardcodedProduct[]
}

export function ProductPageClient({ productId, initialProduct, initialSuggestions }: ProductPageClientProps) {
  const router = useRouter()
  const { addItem, setIsOpen } = useCart()
  
  const [product, setProduct] = useState<HardcodedProduct>(initialProduct)
  const [suggestions, setSuggestions] = useState<HardcodedProduct[]>(initialSuggestions)
  
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<AccordionSection | null>("details")
  const [isAdded, setIsAdded] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [preloaded, setPreloaded] = useState(false)

  // Preload product image
  useEffect(() => {
    if (!product || preloaded) return
    const img = new window.Image()
    img.src = product.image
    img.onload = () => setPreloaded(true)
    img.onerror = () => setPreloaded(true)
  }, [product, preloaded])

  useEffect(() => {
    window.scrollTo(0, 0)
    setSelectedImageIndex(0)
    setPreloaded(false)
    
    // Find the product in hardcoded data
    const found = hardcodedProducts.find(p => p.id === productId)
    if (found) {
      setProduct(found)
      // Update suggestions
      const catSuggestions = hardcodedProducts
        .filter(p => p.category === found.category && p.id !== found.id)
        .slice(0, 4)
      const fillSuggestions = [...catSuggestions]
      while (fillSuggestions.length < 4) {
        const fill = hardcodedProducts.find(p => 
          p.id !== found.id && 
          !fillSuggestions.some(s => s.id === p.id) &&
          (p.badge === "Featured" || p.badge === "Premium" || p.badge === "Hot")
        )
        if (!fill) break
        fillSuggestions.push(fill)
      }
      setSuggestions(fillSuggestions)
    }
  }, [productId])

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const handleAddToCart = () => {
    if (!product) return
    setIsAdded(true)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleBuyNow = () => {
    if (!product) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
    setIsOpen(true)
  }

  const deliveryText =
    "International shipping to Africa and beyond. Estimated delivery: 15-30 days by sea freight, 5-7 days by air. Every bale is quality inspected and photographed before shipping. Contact us for specific shipping quotes to your destination."

  const accordionItems: { key: AccordionSection; title: string; content: string }[] = [
    { key: "details", title: "Bale Details", content: product.description || `${product.name} — Premium thrift stock sourced in Guangzhou, China. Every item is inspected and graded before shipping.` },
    { key: "delivery", title: "Delivery & Shipping", content: deliveryText }
  ]

  if (!product) {
    return (
      <main className="min-h-screen overflow-x-hidden">
        <Header />
        <div className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="text-lg text-muted-foreground">Product not found</div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `${product.name} is a premium thrift bale from IZUIRE.`,
    "image": [product.image],
    "sku": product.id,
    "brand": { "@type": "Brand", "name": "IZUIRE" },
    "offers": {
      "@type": "Offer",
      "url": `https://izuire.com/product/${product.id}`,
      "priceCurrency": "USD",
      "price": product.price.toString(),
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground boty-transition mb-8">
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            {/* Product Image */}
            <div className="flex flex-col gap-4">
              <div className="relative rounded-3xl overflow-hidden bg-card boty-shadow aspect-[4/5]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover boty-transition"
                  priority
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm bg-white/80 text-foreground boty-shadow">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit.label} className="flex items-center gap-2.5 bg-card rounded-xl px-4 py-3 boty-shadow">
                    <benefit.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs font-medium text-foreground">{benefit.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm tracking-[0.3em] uppercase text-primary font-mono">IZUIRE</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono bg-card px-2 py-1 rounded-full boty-shadow">
                    {product.category}
                  </span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">Premium Graded Stock</span>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="font-serif text-3xl text-foreground">{formatUsdPrice(product.price)}</span>
                <span className="text-xs text-muted-foreground font-mono">per bale</span>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="text-sm font-medium text-foreground mb-3 block">Quantity (Minimum 2 bales)</label>
                <div className="inline-flex items-center gap-4 bg-card rounded-full px-2 py-2 boty-shadow">
                  <button type="button" onClick={() => setQuantity(Math.max(2, quantity - 1))} className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition" aria-label="Decrease quantity">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-foreground">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition" aria-label="Increase quantity">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm tracking-wide boty-transition boty-shadow cursor-pointer ${isAdded ? "bg-primary/80 text-primary-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                >
                  {isAdded ? (<><Check className="w-4 h-4" /> Added to Cart</>) : "Add to Cart"}
                </button>
                <button type="button" onClick={handleBuyNow} className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-primary text-primary px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary hover:text-primary-foreground cursor-pointer">
                  Buy Now
                </button>
              </div>

              {/* Accordion */}
              <div className="border-t border-border/50">
                {accordionItems.map((item) => (
                  <div key={item.key} className="border-b border-border/50">
                    <button type="button" onClick={() => toggleAccordion(item.key)} className="w-full flex items-center justify-between py-5 text-left">
                      <span className="font-medium text-foreground">{item.title}</span>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground boty-transition ${openAccordion === item.key ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden boty-transition ${openAccordion === item.key ? "max-h-96 pb-5" : "max-h-0"}`}>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="text-center">
                  <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-foreground">Quality Inspected</p>
                </div>
                <div className="text-center">
                  <Package className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-foreground">40-80kg Bales</p>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-foreground">Global Shipping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <section className="py-20 bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="group transition-all duration-500 ease-out opacity-100 scale-100">
                  <Link href={`/product/${suggestion.id}`}>
                    <div className="bg-card rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
                      <div className="relative aspect-square bg-muted overflow-hidden">
                        <Image src={suggestion.image} alt={suggestion.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover boty-transition group-hover:scale-105" />
                        {suggestion.badge && (
                          <span className="absolute top-2 left-2 px-2 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase backdrop-blur-sm bg-white/80 text-foreground boty-shadow">
                            {suggestion.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-3 md:p-5 pb-4">
                        <h3 className="font-serif text-sm md:text-lg text-foreground mb-0.5 md:mb-1">{suggestion.name}</h3>
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                          <span className="text-xs md:text-base font-medium text-foreground">{formatUsdPrice(suggestion.price)}</span>
                        </div>
                        <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation() }} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 md:px-4 md:py-2.5 rounded-full text-[10px] md:text-xs tracking-wide boty-transition hover:bg-primary/90 boty-shadow">
                          <ShoppingBag className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}