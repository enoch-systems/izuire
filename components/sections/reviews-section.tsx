"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ChevronLeft, Quote, Images } from "lucide-react"
import { hardcodedReviews, type HardcodedReview } from "@/lib/hardcoded-reviews"

function ReviewCard({ review, index }: { review: HardcodedReview; index: number }) {
  const [activeImage, setActiveImage] = useState(0)
  const gallery = review.gallery.length > 0 ? review.gallery : [review.productImage]

  const goPrev = () => setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length)
  const goNext = () => setActiveImage((prev) => (prev + 1) % gallery.length)

  return (
    <div
      className="relative bg-card rounded-2xl border border-border/40 border-b-0 flex flex-col overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border/60 hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.12)]"
      style={{
        animationDelay: `${index * 100}ms`,
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

export function ReviewsSection() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const displayedReviews = hardcodedReviews.slice(0, 4)

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

  return (
    <section id="reviews" ref={sectionRef} className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span className={`font-mono text-[0.78rem] uppercase tracking-[0.18em] text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            Client Testimonials
          </span>
          <h2 className={`font-serif text-[clamp(2rem,5vw,3.2rem)] leading-tight text-foreground mb-4 text-balance ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            What our clients say
          </h2>
          <p className={`text-base sm:text-lg text-muted-foreground leading-relaxed mx-auto max-w-2xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
            Real reviews from resellers who trust IZUIRE for their thrift sourcing needs
          </p>
        </div>

        {/* Reviews Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-10 md:mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={isVisible ? { animationDelay: '0.8s', animationFillMode: 'forwards' } : {}}>
          {displayedReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8 md:mt-10">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 border border-border/60 bg-transparent text-foreground px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 ease-out hover:border-primary/40 hover:text-primary active:scale-[0.97]"
          >
            View All Reviews
            <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Link>
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
    </section>
  )
}