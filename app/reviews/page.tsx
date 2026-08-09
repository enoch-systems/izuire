"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ChevronDown, Quote, Images } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { hardcodedReviews, type HardcodedReview } from "@/lib/hardcoded-reviews"

const PER_PAGE = 6

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
]

function ReviewCard({ review, index }: { review: HardcodedReview; index: number }) {
  const [activeImage, setActiveImage] = useState(0)
  const gallery = review.gallery.length > 0 ? review.gallery : [review.productImage]

  const goPrev = () => setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length)
  const goNext = () => setActiveImage((prev) => (prev + 1) % gallery.length)

  return (
    <div
      className="relative bg-card rounded-2xl border border-border/40 border-b-0 flex flex-col overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border/60 hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.12)]"
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {/* Product image carousel — flush to card edges */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={gallery[activeImage] || "/placeholder.jpg"}
          alt={`${review.product} image ${activeImage + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-opacity duration-300"
        />
        {/* Cloudy / smoky gradient overlay — light orange tint */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/20 to-transparent blur-[2px]" />

        {/* Prev / Next chevrons */}
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-foreground shadow-md hover:bg-white transition-all duration-200 active:scale-90"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-foreground shadow-md hover:bg-white transition-all duration-200 active:scale-90"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Slide dots — glassmorphism with orange active */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md">
          {gallery.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveImage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeImage ? "w-5 bg-primary" : "w-1.5 bg-white/60 hover:bg-white"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content below image */}
      <div className="p-5 md:p-6 flex flex-col flex-1 min-w-0">
      {/* Gallery strip — clickable thumbnails */}
      <div className="flex items-center gap-1.5 mb-4">
        {gallery.slice(0, 3).map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveImage(i)}
            className={`relative w-9 h-9 rounded-lg overflow-hidden bg-muted transition-all duration-200 ${
              i === activeImage
                ? "ring-2 ring-primary ring-offset-1 ring-offset-card"
                : "opacity-60 hover:opacity-90"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={img}
              alt={`${review.product} image ${i + 1}`}
              fill
              sizes="36px"
              className="object-cover"
            />
          </button>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 text-[0.65rem] font-medium text-muted-foreground">
          <Images className="w-3.5 h-3.5" />
          {gallery.length} photos
        </span>
      </div>

      {/* Quote mark */}
      <Quote className="absolute top-5 right-5 w-6 h-6 text-primary/15" />

      {/* Review Text */}
      <p className="text-[0.9rem] text-foreground/80 leading-relaxed mb-5 flex-1">
        "{review.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={review.image || "/placeholder-user.jpg"}
            alt={review.name}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">{review.name}</p>
          <p className="text-xs text-muted-foreground truncate">{review.location}</p>
        </div>
        <p className="ml-auto text-[0.65rem] text-muted-foreground whitespace-nowrap">
          {new Date(review.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </p>
      </div>
      </div>
    </div>
  )
}

export default function ReviewsPage() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current)
      }
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Sort reviews
  const sortedReviews = useMemo(() => {
    const sorted = [...hardcodedReviews]
    if (sortBy === "newest") {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else {
      sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
    return sorted
  }, [sortBy])

  const totalPages = Math.ceil(sortedReviews.length / PER_PAGE)

  const currentReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * PER_PAGE
    return sortedReviews.slice(startIndex, startIndex + PER_PAGE)
  }, [sortedReviews, currentPage])

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
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    // Scroll to top of the reviews grid
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setCurrentPage(1)
    setIsSortOpen(false)
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />

      <div className="pt-24 pb-20">
        <div className="max-w-[1140px] mx-auto px-6">
          {/* Back button */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mb-4 inline-flex items-center gap-1.5 font-mono text-[0.78rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {/* Header */}
          <div ref={headerRef} className="text-center mb-10 md:mb-14">
            <span className={`font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
              Client Testimonials
            </span>
            <h1 className={`font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-tight text-foreground text-balance mb-4 ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
              What Our Clients Say
            </h1>
            <p className={`text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
              Trusted by resellers across Africa. See what our clients say about their IZUIRE experience sourcing premium thrift bales from China.
            </p>
          </div>

          {/* Toolbar — sort on top right */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-bold text-foreground">{sortedReviews.length}</span> reviews
            </p>
            <div ref={sortRef} className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="inline-flex items-center gap-2 bg-card px-4 py-2.5 rounded-full border border-border/60 text-sm font-medium text-foreground boty-transition hover:border-border"
              >
                {sortOptions.find(o => o.value === sortBy)?.label}
                <ChevronDown className={`w-4 h-4 boty-transition ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 bg-card rounded-xl border border-border/60 overflow-hidden z-50 min-w-[160px] boty-shadow">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSortChange(option.value)}
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

          {/* Reviews Grid */}
          <div
            ref={gridRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={isVisible ? { animationDelay: '0.8s', animationFillMode: 'forwards' } : {}}
          >
            {currentReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>

          {/* Pagination — centered below cards */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-foreground boty-transition hover:border-foreground disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {visiblePages.map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
                      currentPage === page
                        ? "bg-foreground text-background"
                        : "border border-border/60 text-foreground hover:border-foreground"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-foreground boty-transition hover:border-foreground disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-primary mb-2">2,500+</div>
              <div className="text-sm text-muted-foreground">Bales Delivered</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Quality Graded</div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center bg-card rounded-3xl p-10 md:p-14 border border-border/60">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              Ready to Start Sourcing?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join hundreds of successful resellers who trust IZUIRE for their thrift sourcing needs. Get started today!
            </p>
            <a
              href="https://wa.me/2349031560905?text=Hello!%20I'm%20interested%20in%20your%20sourcing%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90 boty-shadow"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blur-in {
          0% {
            opacity: 0;
            filter: blur(10px);
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blur-in {
          animation: blur-in 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>

      <Footer />
    </main>
  )
}