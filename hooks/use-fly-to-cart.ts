"use client"

import { useCallback, useRef } from "react"

/**
 * Creates a flying image animation from a source element to the header cart icon.
 * Returns a function that triggers the animation.
 */
export function useFlyToCart() {
  const flyingRef = useRef<HTMLDivElement | null>(null)

  const flyToCart = useCallback((sourceEl: HTMLElement | null, imageSrc: string) => {
    if (!sourceEl || typeof window === "undefined") return

    // Find the header cart icon position
    const cartBtn = document.querySelector('[aria-label="Cart"]')
    if (!cartBtn) return

    const sourceRect = sourceEl.getBoundingClientRect()
    const cartRect = cartBtn.getBoundingClientRect()

    // Create flying element
    const flying = document.createElement("div")
    flying.style.cssText = `
      position: fixed;
      z-index: 9999;
      width: ${sourceRect.width}px;
      height: ${sourceRect.height}px;
      left: ${sourceRect.left}px;
      top: ${sourceRect.top}px;
      pointer-events: none;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    `
    flying.innerHTML = `<img src="${imageSrc}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;" />`
    document.body.appendChild(flying)

    // Animate to cart
    const dx = cartRect.left + cartRect.width / 2 - (sourceRect.left + sourceRect.width / 2)
    const dy = cartRect.top + cartRect.height / 2 - (sourceRect.top + sourceRect.height / 2)

    requestAnimationFrame(() => {
      flying.style.transition = "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s ease"
      flying.style.transform = `translate(${dx}px, ${dy}px) scale(0.15) rotate(8deg)`
      flying.style.opacity = "0.4"
    })

    // Cleanup
    setTimeout(() => {
      flying.remove()
    }, 750)

    // Trigger cart badge bump
    const badge = cartBtn.querySelector("span")
    if (badge) {
      badge.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
      badge.style.transform = "scale(1.6)"
      setTimeout(() => {
        badge.style.transform = "scale(1)"
      }, 300)
    }

    // Also bump the cart icon itself
    const icon = cartBtn.querySelector("svg")
    if (icon) {
      icon.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
      icon.style.transform = "scale(1.3) rotate(-8deg)"
      setTimeout(() => {
        icon.style.transform = "scale(1)"
      }, 400)
    }
  }, [])

  return flyToCart
}