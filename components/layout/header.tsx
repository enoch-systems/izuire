"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, LogOut } from "lucide-react"
import { CartDrawer } from "./cart-drawer"
import { useCart } from "@/components/providers/cart-context"
import { useSearchBlur } from "@/components/providers/search-blur-context"

export function Header({ variant = "default", onLogoutClick }: { variant?: "default" | "admin"; onLogoutClick?: () => void } = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const { setIsOpen, itemCount } = useCart()
  const { setSearchOpen } = useSearchBlur()
  const isAdmin = variant === "admin"

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

   return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <nav className="relative z-50 max-w-[1140px] mx-auto px-6">
        <div className="relative z-50 flex items-center justify-between py-[18px]">
          {/* Logo - Only show on non-admin pages */}
          {!isAdmin && (
            <Link href="/" className="flex items-center">
              <img
                src="https://res.cloudinary.com/wglgwuwj/image/upload/v1787544012/logooo.png"
                alt="IZUIRE logo"
                className="size-11 object-contain"
              />
              <h1 className="font-serif text-[1.3rem] tracking-[0.5px] text-foreground">IZUIRE</h1>
              <span className="bg-primary text-background font-mono text-[0.7rem] px-2 py-[3px] -rotate-3 rounded-[2px] ml-2.5">
                THRIFT
              </span>
            </Link>
          )}

          {/* Desktop Navigation - Center */}
          {!isAdmin && (
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition"
              >
                Shop
              </Link>
              <Link
                href="/#reviews"
                className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition"
              >
                Reviews
              </Link>
              <Link
                href="/faq"
                className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition"
              >
                FAQ
              </Link>
            </div>
          )}

          {/* Right Actions */}
          {!isAdmin ? (
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="hidden lg:block p-2 text-foreground/70 hover:text-foreground boty-transition cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-foreground/70 hover:text-foreground boty-transition cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0 -right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
              {/* Desktop-only action buttons - hidden on mobile */}
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/shop" className="ed-btn ed-btn-ghost">
                  View Stock
                </Link>
                <Link href="/contact" className="ed-btn ed-btn-primary">
                  Contact Us
                </Link>
              </div>
              {/* Mobile hamburger - right side */}
              <button
                type="button"
                className="lg:hidden p-2 text-foreground/80 hover:text-foreground boty-transition cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-xs sm:text-sm tracking-wide boty-transition hover:bg-destructive/20 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>

      </nav>

      {/* Mobile Navigation Modal - outside nav for proper fixed positioning */}
      {!isAdmin && (
        <div
          className={`lg:hidden fixed inset-0 z-[70] flex items-start justify-center pt-24 px-6 ${
            isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm boty-transition ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Modal Content */}
          <div
            className={`relative bg-background rounded-2xl max-w-sm w-full boty-shadow border border-border/50 p-8 boty-transition ${
              isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-foreground/70 hover:text-foreground boty-transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6 mb-8">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="font-mono text-[0.85rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition cursor-pointer text-center"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="font-mono text-[0.85rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition cursor-pointer text-center"
              >
                Shop
              </Link>
              <Link
                href="/#reviews"
                onClick={() => setIsMenuOpen(false)}
                className="font-mono text-[0.85rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition cursor-pointer text-center"
              >
                Reviews
              </Link>
              <Link
                href="/faq"
                onClick={() => setIsMenuOpen(false)}
                className="font-mono text-[0.85rem] uppercase tracking-[0.08em] text-foreground/70 hover:text-foreground boty-transition cursor-pointer text-center"
              >
                FAQ
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Link 
                href="/shop" 
                onClick={() => setIsMenuOpen(false)} 
                className="ed-btn ed-btn-ghost w-full justify-center"
              >
                View Stock
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="ed-btn ed-btn-primary w-full justify-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isAdmin && showLogoutModal && onLogoutClick && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="absolute inset-0 backdrop-blur-sm bg-black/30"
            onClick={() => setShowLogoutModal(false)}
          />
          <div
            className="relative bg-card rounded-2xl max-w-md w-full boty-shadow border border-border/50 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-2xl text-foreground mb-4">Confirm Logout</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-6 py-3 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/5 cursor-pointer"
                >
                  No, Stay logged in
                </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutModal(false)
                  onLogoutClick()
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-destructive/10 text-destructive px-6 py-3 rounded-full text-sm tracking-wide boty-transition hover:bg-destructive/20 cursor-pointer"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      <CartDrawer />
    </header>
  )
}