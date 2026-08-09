import React, { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductPageClient } from "./product-page-client"
import { ProductPageSkeleton } from "./product-page-skeleton"
import { hardcodedProducts } from "@/lib/hardcoded-products"

// Dynamic params — products are hardcoded
export const dynamicParams = true

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = hardcodedProducts.find(p => p.id === id)

  if (!product) {
    return { title: "Product Not Found — IZUIRE" }
  }

  return {
    title: `${product.name} — IZUIRE`,
    description: product.description || `${product.name} — Premium thrift bale from IZUIRE.`,
    openGraph: {
      title: `${product.name} — IZUIRE`,
      description: product.description || `${product.name} — Premium thrift bale from IZUIRE.`,
      images: [{ url: product.image, width: 600, height: 600 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — IZUIRE`,
      description: product.description || `${product.name} — Premium thrift bale from IZUIRE.`,
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params

  const product = hardcodedProducts.find(p => p.id === id)

  if (!product) {
    notFound()
  }

  // Get suggestions (other products from the same category, excluding current)
  const suggestions = hardcodedProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  // If we don't have enough from the same category, fill with featured products
  while (suggestions.length < 4) {
    const fill = hardcodedProducts.find(p => 
      p.id !== product.id && 
      !suggestions.some(s => s.id === p.id) &&
      (p.badge === "Featured" || p.badge === "Premium" || p.badge === "Hot")
    )
    if (!fill) break
    suggestions.push(fill)
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductPageClient
          productId={id}
          initialProduct={product}
          initialSuggestions={suggestions}
        />
      </Suspense>
    </main>
  )
}