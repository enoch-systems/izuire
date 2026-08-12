"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ArrowUpRight, Sparkles, Eye } from "lucide-react"
import { useCart } from "@/components/providers/cart-context"
import { useFlyToCart } from "@/hooks/use-fly-to-cart"
import { hardcodedProducts, type HardcodedProduct } from "@/lib/hardcoded-products"

const formatUsdPrice = (value: number | string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)

const badgeStyles: Record<string, string> = {
  "Featured": "bg-primary text-primary-foreground",
  "New": "bg-olive text-white",
  "Hot": "bg-accent text-accent-foreground",
  "Premium": "bg-foreground text-background",
  "Rare": "bg-foreground text-background",
  "Luxury": "bg-foreground text-background",
  "Sale": "bg-accent text-accent-foreground",
}

export function ProductGrid() {
  const products = hardcodedProducts.slice(0, 6)

  const [isVisible, setIsVisible] = useState(true)
  const [headerVisible, setHeaderVisible] = useState(true)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()
  const flyToCart = useFlyToCart()
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({})
  const imageRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Preload all product images on mount
  useEffect(() => {
    products.forEach((product) => {
      const img = new window.Image()
      img.src = product.image
    })
  }, [products])

  useEffect(() => {
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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

    if (gridRef.current) {
      gridObserver.observe(gridRef.current)
    }

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    return () => {
      if (gridRef.current) {
        gridObserver.unobserve(gridRef.current)
      }
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
    }
  }, [])

  const handleAddToCart = useCallback(
    (e: React.MouseEvent, product: HardcodedProduct) => {
      e.preventDefault()
      e.stopPropagation()
      // Trigger fly-to-cart animation from the product image
      flyToCart(imageRefs.current[product.id] || null, product.image)
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    },
    [addItem, flyToCart]
  )

  return (
    <section className="py-16 md:py-20 border-b border-border">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="flex justify-between items-end flex-wrap gap-4 mb-9 md:mb-12">
          <div>
            <span className={`font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-3 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
              Catalog
            </span>
            <h2 className={`font-serif leading-tight text-foreground text-[clamp(1.6rem,4vw,2.4rem)] ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
              Available Categories
            </h2>
            <p className={`text-[0.95rem] text-foreground/60 max-w-[420px] mt-2 ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
              Browse our current thrift stock by category. All items inspected and graded in Guangzhou.
            </p>
          </div>
          <Link href="/shop" className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-foreground/70 hover:text-primary border border-border rounded-full px-5 py-2.5 boty-transition hover:border-primary/40 hover:bg-card">
            Full Catalog <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Grid — always 2 cols on mobile, scales up per breakpoint */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group block w-full transition-all duration-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="relative bg-card rounded-2xl overflow-hidden border border-border/60 flex flex-col h-full min-w-0 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-border/100 group-hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.12)]">
                <Link href={`/product/${product.id}`} className="block flex flex-col flex-1">
                  {/* Image */}
                  <div
                    ref={(el) => { imageRefs.current[product.id] = el }}
                    className="relative aspect-[4/3.6] sm:aspect-[4/4] bg-muted overflow-hidden"
                  >
                    {/* Skeleton */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted animate-pulse transition-opacity duration-500 ${
                        imageLoaded[product.id] ? 'opacity-0' : 'opacity-100'
                      }`}
                    />

                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      priority={index < 3}
                      className={`object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.06] ${
                        imageLoaded[product.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setImageLoaded(prev => ({ ...prev, [product.id]: true }))}
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge */}
                    {product.badge && (
                      <span
                        className={`absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.6rem] sm:text-[0.65rem] font-mono font-bold uppercase tracking-wider shadow-sm ${
                          badgeStyles[product.badge] || "bg-primary text-primary-foreground"
                        }`}
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        {product.badge}
                      </span>
                    )}

                    {/* Quick view on hover (desktop) */}
                    <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden sm:block">
                      <span className="flex items-center justify-center gap-1.5 w-full bg-background/90 backdrop-blur-sm text-foreground text-[0.7rem] font-mono font-semibold uppercase tracking-wider rounded-full py-2.5">
                        <Eye className="w-3.5 h-3.5" />
                        Quick View
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.55rem] sm:text-[0.6rem] font-mono uppercase tracking-[0.12em] text-primary/80">
                        {product.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[0.55rem] sm:text-[0.6rem] font-mono uppercase tracking-[0.12em] text-muted-foreground">
                        Grade A
                      </span>
                    </div>
                    <h3 className="font-serif text-[0.8rem] sm:text-[0.95rem] md:text-[1.05rem] leading-snug line-clamp-1 sm:line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-[0.6rem] sm:text-[0.7rem] md:text-[0.75rem] text-muted-foreground leading-relaxed line-clamp-1 sm:line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-auto pt-1.5 sm:pt-2 flex items-baseline justify-between gap-2">
                      <div className="text-[0.9rem] sm:text-[1.05rem] md:text-[1.15rem] font-bold tracking-tight text-foreground">
                        {formatUsdPrice(product.price)}
                      </div>
                      <span className="text-[0.55rem] sm:text-[0.6rem] font-mono uppercase tracking-wider text-muted-foreground">
                        / bale
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Add to Cart — clean single button */}
                <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background text-[0.7rem] sm:text-[0.75rem] font-mono font-semibold uppercase tracking-wider px-3 py-2.5 sm:py-3 transition-all duration-300 ease-out hover:bg-primary hover:text-primary-foreground active:scale-[0.97]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile "Full Catalog" link */}
        <div className="mt-8 sm:hidden flex justify-center">
          <Link href="/shop" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-foreground/70 hover:text-primary border border-border rounded-full px-5 py-3 boty-transition">
            Full Catalog <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}