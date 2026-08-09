"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export function WhatsAppButton() {
  const pathname = usePathname()
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStateRef = useRef<{ pointerX: number; pointerY: number; startX: number; startY: number } | null>(null)
  const isDraggingRef = useRef(false)
  const hasDraggedRef = useRef(false)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const phoneNumber = "2349031560905"
  const message = "Hello! I'm interested in your products."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer")
      if (!footer) return
      const rect = footer.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      // Footer is considered visible when its top edge enters the viewport
      setIsFooterVisible(rect.top < viewportHeight && rect.bottom > 0)
    }

    const handleResize = () => {
      handleScroll()
      const pos = position
      const button = buttonRef.current
      if (pos && button) {
        const maxX = window.innerWidth - button.offsetWidth
        const maxY = window.innerHeight - button.offsetHeight
        const newPos = {
          x: Math.min(pos.x, Math.max(maxX, 0)),
          y: Math.min(pos.y, Math.max(maxY, 0)),
        }
        setPosition(newPos)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (pathname.startsWith("/admin") || pathname.startsWith("/invoice")) {
    return null
  }

  const floatingBadgeImage =
    "https://res.cloudinary.com/djdbcoyot/image/upload/v1786282235/u1fryuoyq3yapptrkr82.png"

  const handlePointerDown = (e: React.PointerEvent) => {
    const btn = buttonRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const currentX = position?.x ?? rect.left
    const currentY = position?.y ?? rect.top

    dragStateRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      startX: currentX,
      startY: currentY,
    }
    hasDraggedRef.current = false
    btn.style.touchAction = "none"
    btn.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const button = buttonRef.current
    if (!button || !dragStateRef.current) return

    const dx = e.clientX - dragStateRef.current.pointerX
    const dy = e.clientY - dragStateRef.current.pointerY

    // Only start dragging after threshold is met
    if (!isDraggingRef.current) {
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasDraggedRef.current = true
        isDraggingRef.current = true
        setIsDragging(true)
      } else {
        return
      }
    }

    const buttonWidth = button.offsetWidth
    const buttonHeight = button.offsetHeight
    const maxX = Math.max(window.innerWidth - buttonWidth, 0)
    const maxY = Math.max(window.innerHeight - buttonHeight, 0)
    const newX = Math.min(Math.max(dragStateRef.current.startX + dx, 0), maxX)
    const newY = Math.min(Math.max(dragStateRef.current.startY + dy, 0), maxY)

    setPosition({ x: newX, y: newY })
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false
    setIsDragging(false)
    dragStateRef.current = null
    if (buttonRef.current) {
      buttonRef.current.style.touchAction = ""
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
    }
  }

  const buttonStyle: React.CSSProperties = {}
  if (position) {
    let top = position.y
    if (isFooterVisible) {
      top = Math.max(position.y - 140, 0)
    }
    buttonStyle.left = position.x
    buttonStyle.top = top
  }
  if (isDragging) {
    buttonStyle.transition = "none"
    buttonStyle.touchAction = "none"
  }

  return (
    <a
      ref={buttonRef}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
      className={`fixed z-50 block select-none touch-none ${
        position ? "" : isFooterVisible ? "bottom-40 right-2" : "bottom-5 right-2"
      } ${isDragging ? "cursor-grabbing" : "cursor-grab transition-all duration-300"}`}
      style={buttonStyle}
      aria-label="Chat on WhatsApp"
    >
      <div
        className="relative flex flex-col items-center"
        style={{ animation: isDragging ? "none" : "floaty 3.2s ease-in-out infinite" }}
      >
        <svg viewBox="0 0 200 60" className="-mb-3 w-[120px] h-[36px] overflow-visible sm:w-[150px] sm:h-[45px]">
          <defs>
            <path id="curvePath" d="M 20,50 Q 100,-10 180,50" fill="none" />
          </defs>
          <text className="fill-foreground font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em]">
            <textPath href="#curvePath" startOffset="50%" textAnchor="middle">
              Speak with Owen
            </textPath>
          </text>
        </svg>
        <div className="relative flex items-center justify-center">
          <div
            className="absolute -inset-4 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,170,80,0.62) 0%, rgba(255,126,54,0.34) 25%, rgba(255,126,54,0) 72%)",
              filter: "blur(12px)",
              opacity: 0.9,
            }}
          />
          <div
            className="absolute -left-3 top-3 h-10 w-1 rounded-full"
            style={{
              background: "linear-gradient(to bottom, rgba(255,196,99,0.9), rgba(255,128,42,0))",
              transform: "rotate(18deg)",
              filter: "blur(2px)",
            }}
          />
          <div
            className="absolute -right-4 top-1 h-11 w-1 rounded-full"
            style={{
              background: "linear-gradient(to bottom, rgba(255,196,99,0.9), rgba(255,128,42,0))",
              transform: "rotate(-16deg)",
              filter: "blur(2px)",
            }}
          />
          <div
            className="absolute left-2 top-1/2 h-7 w-1 rounded-full"
            style={{
              background: "linear-gradient(to bottom, rgba(255,210,120,0.8), rgba(255,140,54,0))",
              transform: "rotate(-24deg)",
              filter: "blur(2px)",
            }}
          />
          <div
            className="absolute right-2 bottom-2 h-7 w-1 rounded-full"
            style={{
              background: "linear-gradient(to bottom, rgba(255,210,120,0.8), rgba(255,140,54,0))",
              transform: "rotate(23deg)",
              filter: "blur(2px)",
            }}
          />

          <div
            className="relative h-14 w-14 overflow-hidden rounded-full border border-white/20 shadow-[0_14px_28px_rgba(0,0,0,0.24)] ring-1 ring-orange-200/40 sm:h-20 sm:w-20"
            style={{
              backgroundImage: `url('${floatingBadgeImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floaty {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </a>
  )
}