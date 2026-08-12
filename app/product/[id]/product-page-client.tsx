"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Minus, Plus, ChevronDown, ShoppingBag, Star, Check, ShieldCheck, Package, Truck } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCart } from "@/components/providers/cart-context"
import { hardcodedProducts, type HardcodedProduct } from "@/lib/hardcoded-products"

const NEW_IMAGE_URL = "https://res.cloudinary.com/djdbcoyot/image/upload/v1786553251/gtnizvboye5kfupmx74k.jpg"

const categoryFallbackImages: Record<string, string[]> = {
  bales: [NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL],
  fabrics: [NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL],
  shoes: [NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL],
  accessories: [NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL],
  household: [NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL],
  electronics: [NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL],
  sportswear: [NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL, NEW_IMAGE_URL],
}

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

  const fallbackImages = categoryFallbackImages[product.category] ?? []
  const productImages = product.images && product.images.length > 0
    ? product.images.slice(0, 5)
    : [product.image, ...fallbackImages.filter((src) => src !== product.image).slice(0, 4)]
  const thumbnails = Array.from({ length: 5 }, (_, index) => productImages[index] ?? productImages[0])
  const currentImageUrl = thumbnails[selectedImageIndex]

  // Preload product image
  useEffect(() => {
    if (!product || preloaded) return
    const img = new window.Image()
    img.src = currentImageUrl
    img.onload = () => setPreloaded(true)
    img.onerror = () => setPreloaded(true)
  }, [product, preloaded, currentImageUrl])

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
      <div className="pt-1 pb-20">
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
      <div className="pt-6 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground boty-transition mb-8">
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            {/* Product Image */}
            <div className="flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden bg-card boty-shadow aspect-[4/5]">
                <Image
                  src={currentImageUrl}
                  alt={`${product.name} image`}
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

              <div className="grid grid-cols-5 gap-3">
                {thumbnails.map((src, index) => (
                  <button
                    key={`thumb-${index}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`Show thumbnail ${index + 1}`}
                    className={`relative aspect-square overflow-hidden rounded-xl transition-all duration-200 ${selectedImageIndex === index ? "ring-2 ring-amber-400" : "border border-border/50"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 20vw, 10vw"
                      className="object-cover"
                    />
                  </button>
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
        <section className="py-24 bg-background border-t border-border relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            {/* Section header */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-primary/40" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-primary font-mono">Curated for you</span>
                <span className="h-px w-8 bg-primary/40" />
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">You May Also Like</h2>
              <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
                Hand-picked premium bales to complete your collection.
              </p>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="group relative">
                  <Link href={`/product/${suggestion.id}`} className="block">
                    <div className="relative bg-card rounded-2xl overflow-hidden boty-shadow boty-transition group-hover:-translate-y-1.5 group-hover:shadow-xl">
                      {/* Image */}
                      <div className="relative aspect-square bg-muted overflow-hidden">
                        <Image src={suggestion.image} alt={suggestion.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover boty-transition group-hover:scale-110" />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 boty-transition" />
                        {/* Editorial stamp badge */}
                        {suggestion.badge && (
                          <span className="ed-stamp">{suggestion.badge}</span>
                        )}
                        {/* Quick add on hover */}
                        <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 boty-transition">
                          <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation() }} className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest boty-transition hover:bg-primary hover:text-primary-foreground boty-shadow">
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Quick Add
                          </button>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-4 md:p-5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{suggestion.category}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                            ))}
                          </div>
                        </div>
                        <h3 className="font-serif text-sm md:text-base text-foreground mb-2 leading-snug line-clamp-2">{suggestion.name}</h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base md:text-lg font-medium text-foreground">{formatUsdPrice(suggestion.price)}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">/ bale</span>
                        </div>
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