import React from "react"
import type { Metadata, Viewport } from 'next'
import { Archivo_Black, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/providers/cart-context'
import { SearchBlurProvider } from '@/components/providers/search-blur-context'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/components/providers/query-provider'
import { LenisProvider } from '@/components/providers/lenis-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700']
});

const archivoBlack = Archivo_Black({ 
  subsets: ["latin"],
  variable: '--font-archivo-black',
  weight: ['400']
});

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'IZUIRE — Premium Thrift Bales from China',
  description: 'Your trusted partner for sourcing premium thrift bales from China. Quality inspection, grading, and global shipping to Africa and beyond.',
  generator: 'v0.app',
  keywords: ['thrift bales', 'china sourcing', 'quality inspection', 'thrift wholesale', 'clothing bales', 'reseller'],
  icons: {
    icon: 'https://res.cloudinary.com/deafv5ovi/image/upload/v1784555201/a_dow3yp.png',
    apple: 'https://res.cloudinary.com/deafv5ovi/image/upload/v1784555201/a_dow3yp.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F3EC',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${archivoBlack.variable} ${jetBrainsMono.variable} font-sans antialiased`}>
        <QueryProvider>
          <CartProvider>
            <SearchBlurProvider>
              <LenisProvider>
                {children}
              </LenisProvider>
            </SearchBlurProvider>
          </CartProvider>
        </QueryProvider>
        <WhatsAppButton />
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
