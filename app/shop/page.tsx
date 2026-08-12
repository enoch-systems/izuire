"use client"

import { useState, useEffect, useMemo, useRef, Suspense, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ShoppingBag, ChevronLeft, ChevronRight, ChevronDown, SlidersHorizontal, X, ArrowUpRight, Package, Truck, ShieldCheck, Search, Eye } from "lucide-react"
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
const badgeStyles: Record<string, string> = {
  "Featured": "bg-primary/90 text-white backdrop-blur-sm",
  "New": "bg-olive/90 text-white backdrop-blur-sm",
  "Hot": "bg-accent/90 text-accent-foreground backdrop-blur-sm",
  "Premium": "bg-foreground/90 text-background backdrop-blur-sm",
  "Rare": "bg-foreground/90 text-background backdrop-blur-sm",
  "Luxury": "bg-foreground/90 text-background backdrop-blur-sm",
  "Sale": "bg-accent/90 text-accent-foreground backdrop-blur-sm",
}

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
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="relative bg-card rounded-2xl overflow-hidden border border-border/60 flex flex-col h-full min-w-0 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:border-border group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25),0_8px_24px_-8px_rgba(0,0,0,0.15)]">
        {/* Subtle top accent line on hover */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

        <Link href={`/product/${product.id}`} className="block flex flex-col flex-1">
          {/* Image */}
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
              className={`object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.08] ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Soft gradient overlay always subtle, stronger on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badge — refined pill */}
            {product.badge && (
              <span
                className={`absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6rem] sm:text-[0.65rem] font-mono font-semibold uppercase tracking-[0.14em] shadow-lg ${
                  badgeStyles[product.badge] || "bg-primary/90 text-white backdrop-blur-sm"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                {product.badge}
              </span>
            )}

            {/* Quick view on hover (desktop) */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out hidden sm:block">
              <span className="flex items-center justify-center gap-2 w-full bg-background/95 backdrop-blur-md text-foreground text-[0.7rem] sm:text-[0.75rem] font-mono font-semibold uppercase tracking-[0.14em] rounded-full py-2.5 shadow-lg">
                <Eye className="w-3.5 h-3.5" />
                Quick View
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-3 sm:p-5 flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[0.5rem] sm:text-[0.65rem] font-mono uppercase tracking-[0.14em] sm:tracking-[0.16em] text-primary font-semibold">
                {product.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              <span className="text-[0.5rem] sm:text-[0.65rem] font-mono uppercase tracking-[0.14em] sm:tracking-[0.16em] text-muted-foreground">
                Grade A
              </span>
            </div>
            <h3 className="font-sans font-medium text-[0.68rem] sm:text-[1rem] md:text-[1.1rem] leading-snug line-clamp-1 sm:line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-[0.6rem] sm:text-[0.72rem] md:text-[0.78rem] text-muted-foreground leading-relaxed line-clamp-1 sm:line-clamp-2">
              {product.description}
            </p>
            <div className="mt-auto pt-2 sm:pt-3 flex items-baseline justify-between gap-2">
              <div className="text-[0.9rem] sm:text-[1.1rem] md:text-[1.25rem] font-semibold tracking-tight text-foreground">
                {formatUsdPrice(product.price)}
              </div>
              <span className="text-[0.55rem] sm:text-[0.6rem] font-mono uppercase tracking-wider text-muted-foreground">
                / bale
              </span>
            </div>
          </div>
        </Link>

        {/* Buttons — premium */}
        <div className="px-3 pb-3 sm:px-5 sm:pb-5">
          <button
            type="button"
            onClick={handleAdd}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background text-[0.65rem] sm:text-[0.78rem] font-mono font-semibold uppercase tracking-[0.12em] px-3 py-2 sm:py-3 transition-all duration-300 ease-out hover:bg-primary hover:text-white hover:shadow-[0_8px_24px_-6px_rgba(196,90,59,0.5)] active:scale-[0.97]"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Add to Cart
          </button>
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

      {/* Hero Section */}
      <section className="relative border-b border-border overflow-hidden">
        {/* Ambient background accents */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

        <div className="relative max-w-[1140px] mx-auto px-6 pt-10 pb-12 md:pt-16 md:pb-16">
          {/* Back button */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-foreground/60 hover:text-foreground boty-transition cursor-pointer mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

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
            <div className="mt-7 max-w-xl">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bales by name, category..."
                  className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3.5 text-[0.95rem] text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2 text-[0.72rem] font-mono uppercase tracking-wider text-foreground/60">
              <Truck className="w-4 h-4 text-primary" />
              Fast Delivery
            </div>
            <div className="flex items-center gap-2 text-[0.72rem] font-mono uppercase tracking-wider text-foreground/60">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Quality Graded
            </div>
            <div className="flex items-center gap-2 text-[0.72rem] font-mono uppercase tracking-wider text-foreground/60">
              <Package className="w-4 h-4 text-primary" />
              Sourced in Guangzhou
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-b border-border">
        <div className="max-w-[1140px] mx-auto px-6 py-14 md:py-16">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <div className="eyebrow font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-3 flex items-center gap-2.5">
                <span className="w-7 h-[2px] bg-primary inline-block" />
                Handpicked
              </div>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground">Featured Bales</h2>
            </div>
            <Link href="#products" className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/70 hover:text-primary boty-transition">
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
      <section id="products" className="pt-14 pb-20">
        <div className="max-w-[1140px] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-10">
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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
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