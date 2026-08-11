"use client"

import { useState, useEffect, useMemo, useRef, Suspense, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ShoppingBag, ChevronLeft, ChevronRight, ChevronDown, SlidersHorizontal, X, ArrowUpRight, Sparkles, Package, Truck, ShieldCheck } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCart } from "@/components/providers/cart-context"
import { useFlyToCart } from "@/hooks/use-fly-to-cart"
import { hardcodedProducts, featuredProducts, categories, type HardcodedProduct } from "@/lib/hardcoded-products"

const formatUsdPrice = (value: number | string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
]

function ProductCard({ 
  product, 
  index, 
  isVisible 
}: { 
  product: HardcodedProduct
  index: number
  isVisible: boolean
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addItem } = useCart()
  const flyToCart = useFlyToCart()
  const imageRef = useRef<HTMLDivElement>(null)

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      flyToCart(imageRef.current, product.image)
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    },
    [addItem, flyToCart, product.id, product.name, product.price, product.image]
  )

  return (
    <div
      className={`group block w-full transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative bg-card rounded-2xl overflow-hidden border border-border/60 flex flex-col h-full min-w-0 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-border group-hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.12)]">
        <Link href={`/product/${product.id}`} className="block">
          {/* Image — balanced medium height */}
          <div
            ref={imageRef}
            className="relative aspect-[4/3.6] sm:aspect-[4/4] bg-muted overflow-hidden"
          >
            {/* Skeleton */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted animate-pulse transition-opacity duration-500 ${
                imageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
            
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.06] ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Stamp Badge */}
            {product.badge && (
              <span
                className={`ed-stamp ${
                  product.badge === "Sale"
                    ? "ed-stamp-mustard"
                    : product.badge === "New"
                    ? "ed-stamp-olive"
                    : ""
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Info — compact mobile-style */}
          <div className="p-2.5 sm:p-4 flex flex-col gap-1 sm:gap-1.5 flex-1 min-w-0">
            <h3 className="font-serif text-[0.72rem] sm:text-[0.95rem] md:text-[1.05rem] leading-snug line-clamp-1 sm:line-clamp-2 text-foreground">{product.name}</h3>
            <p className="text-[0.58rem] sm:text-[0.72rem] md:text-[0.78rem] text-muted-foreground leading-relaxed line-clamp-1 sm:line-clamp-2">Graded thrift stock · Class A & B · Sourced from Guangzhou</p>
            <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.1rem] font-semibold tracking-tight text-foreground">
              {formatUsdPrice(product.price)}
            </div>
          </div>
        </Link>

        {/* Buttons — stacked on mobile (Add above View), side-by-side on sm+ */}
        <div className="px-2.5 pb-2.5 sm:px-4 sm:pb-4">
          <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary text-primary-foreground text-[0.65rem] sm:text-[0.72rem] md:text-[0.78rem] font-semibold tracking-wide px-2 sm:px-3 py-2 sm:py-2.5 transition-all duration-300 ease-out hover:bg-primary/90 active:scale-[0.97]"
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Add to Cart
            </button>
            <Link
              href={`/product/${product.id}`}
              className="flex-1 inline-flex items-center justify-center rounded-full border border-border bg-card text-foreground text-[0.65rem] sm:text-[0.72rem] md:text-[0.78rem] font-semibold tracking-wide px-2 sm:px-3 py-2 sm:py-2.5 transition-all duration-300 ease-out hover:border-foreground active:scale-[0.97]"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ShopPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [])

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [sortBy, setSortBy] = useState("featured")
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const gridRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = selectedCategory === "all"
      ? hardcodedProducts
      : hardcodedProducts.filter(p => p.category === selectedCategory)

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
    }

    switch (sortBy) {
      case "price-asc":
        products = [...products].sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        products = [...products].sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        products = [...products].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Featured first
        products = [...products].sort((a, b) => {
          const aFeatured = a.badge ? 1 : 0
          const bFeatured = b.badge ? 1 : 0
          return bFeatured - aFeatured
        })
    }
    return products
  }, [selectedCategory, sortBy, searchQuery])

  // Track window width for responsive products per page
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate products per page based on screen size
  const productsPerPage = useMemo(() => {
    if (windowWidth < 768) return 8
    if (windowWidth < 1024) return 12
    return 16
  }, [windowWidth])

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage, productsPerPage])

  const getVisiblePages = () => {
    const delta = 1
    let start = Math.max(1, currentPage - delta)
    let end = Math.min(totalPages, currentPage + delta)
    
    if (currentPage === 1) {
      end = Math.min(totalPages, 3)
    } else if (currentPage === totalPages) {
      start = Math.max(1, totalPages - 2)
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const visiblePages = getVisiblePages()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory !== "all") {
      params.set("category", selectedCategory)
    }
    if (currentPage > 1) {
      params.set("page", currentPage.toString())
    }
    const newUrl = params.toString() ? `?${params.toString()}` : "/shop"
    router.push(newUrl, { scroll: false })
  }, [selectedCategory, currentPage, router])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, sortBy])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [selectedCategory, sortBy])

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />

      {/* Back button */}
      <div className="pt-6">
        <div className="max-w-[1140px] mx-auto px-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 font-mono text-[0.78rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-[1140px] mx-auto px-6 pt-6 pb-6">
        <div className="max-w-2xl">
          <div className="eyebrow font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-4 flex items-center gap-2.5">
            <span className="w-7 h-[2px] bg-primary inline-block" />
            Shop
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.04] tracking-[-0.01em] mb-5">
            Premium <em className="not-italic text-primary">Thrift Bales</em>
          </h1>
          <p className="text-[1.05rem] text-foreground/70 max-w-[520px]">
            Browse our curated collection of high-quality thrift bales, sorted and graded for resale success.
          </p>
          
          {/* Search Bar */}
          <div className="mt-6 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bales by name, category..."
                className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3.5 text-[0.95rem] text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <section className="border-b border-border">
        <div className="max-w-[1140px] mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="eyebrow font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-3 flex items-center gap-2.5">
                <span className="w-7 h-[2px] bg-primary inline-block" />
                Handpicked
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">Featured Bales</h2>
            </div>
            <Link href="#products" className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/70 hover:text-primary boty-transition">
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="pt-16 pb-20">
        <div className="max-w-[1140px] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="eyebrow font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-3 flex items-center justify-center gap-2.5">
              <span className="w-7 h-[2px] bg-primary inline-block" />
              The Collection
              <span className="w-7 h-[2px] bg-primary inline-block" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">All Stock</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our full collection of premium thrift bales, sorted and graded for resale.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            {/* Category Dropdown (Mobile) */}
            <div className="relative w-full md:hidden">
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full inline-flex items-center justify-between gap-2 bg-card px-4 py-3 rounded-xl boty-shadow text-sm font-medium text-foreground"
              >
                <span className="inline-flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  {selectedCategory === "all" ? "All Categories" : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </span>
                <ChevronDown className={`w-4 h-4 boty-transition ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              {isFilterOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl boty-shadow border border-border/50 overflow-hidden z-50">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsFilterOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm boty-transition ${
                        selectedCategory === category
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground/70 hover:bg-muted"
                      }`}
                    >
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Pills (Desktop) */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider boty-transition ${
                    selectedCategory === category
                      ? "bg-foreground text-background"
                      : "bg-card text-muted-foreground hover:text-foreground boty-shadow"
                  }`}
                >
                  {category === "all" ? "All" : category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div ref={sortRef} className="relative w-full md:w-auto">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full md:w-auto inline-flex items-center justify-between gap-2 bg-card px-4 py-3 rounded-xl boty-shadow text-sm font-medium text-foreground"
              >
                <span className="inline-flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  {sortOptions.find(o => o.value === sortBy)?.label}
                </span>
                <ChevronDown className={`w-4 h-4 boty-transition ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 bg-card rounded-xl boty-shadow border border-border/50 overflow-hidden z-50 min-w-[200px]">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSortBy(option.value)
                        setIsSortOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm boty-transition ${
                        sortBy === option.value
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground/70 hover:bg-muted"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-bold text-foreground">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'bale' : 'bales'}
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </p>
            {selectedCategory !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <X className="w-3 h-3" />
                Clear filter
              </button>
            )}
          </div>

          {/* Product Grid */}
          <div 
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {currentProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No products found in this category</p>
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className="text-primary hover:underline"
              >
                View all products
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 md:mt-16">
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed boty-transition"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {visiblePages.map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
                        currentPage === page
                          ? "bg-foreground text-background"
                          : "hover:bg-muted"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed boty-transition"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-center md:hidden">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full border border-border text-sm disabled:opacity-50 disabled:cursor-not-allowed boty-transition"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-full border border-border text-sm disabled:opacity-50 disabled:cursor-not-allowed boty-transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section — premium */}
      <section className="relative border-t border-border bg-foreground text-background overflow-hidden">
        {/* Ambient glow accents */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-accent/15 blur-[100px] pointer-events-none" />

        <div className="relative max-w-[1140px] mx-auto px-6 py-20 md:py-28 text-center">
          {/* Eyebrow */}
          <div className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-accent mb-5 flex items-center justify-center gap-2.5">
            <span className="w-6 h-[2px] bg-accent/60 inline-block" />
            Custom Sourcing
            <span className="w-6 h-[2px] bg-accent/60 inline-block" />
          </div>

          <h2 className="font-serif text-[clamp(2rem,5vw,3.4rem)] leading-tight mb-5 text-balance">
            Can't find what you need?
          </h2>
          <p className="text-background/60 max-w-xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
            We offer custom sourcing services. Tell us what you're looking for and we'll find it in Guangzhou.
          </p>

          {/* Premium button */}
          <a
            href="https://wa.me/2349031560905?text=Hi%20good%20day%2C%20Mr%20Owen.%20I%20clicked%20Request%20Custom%20Sourcing%20on%20your%20website%20and%20I%20am%20interested%20in%20a%20custom%20thrift%20bale.%20Please%20send%20pricing%20and%20availability."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground pl-7 pr-2 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ease-out hover:bg-primary/90 hover:shadow-[0_8px_32px_rgba(196,90,59,0.35)] active:scale-[0.97]"
          >
            Request Custom Sourcing
            <span className="w-9 h-9 rounded-full bg-background/15 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen overflow-x-hidden">
        <Header />
        <div className="pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="text-lg text-muted-foreground">Loading...</div>
            </div>
          </div>
        </div>
      </main>
    }>
      <ShopPageContent />
    </Suspense>
  )
}
