'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import SearchOverlay from '@/components/search/SearchOverlay'

// These routes will show the navbar as transparent (overlaid on the hero image)
const TRANSPARENT_NAV_ROUTES = ['/']

// ClientLayout wraps every page with the Navbar, Footer, CartDrawer, and SearchOverlay
export default function ClientLayout({ children }) {
  // Track whether the search overlay is open
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const shouldReduce = useReducedMotion()

  // Make the navbar transparent only on the homepage (where the hero image is)
  const isTransparent = TRANSPARENT_NAV_ROUTES.includes(pathname)
  // Dedicated authentication routes use a clean, focused luxury portal layout
  const isAuthPage = pathname === '/signin' || pathname === '/signup'

  if (isAuthPage) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduce ? {} : { opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <>
      <Navbar transparent={isTransparent} onSearchOpen={() => setSearchOpen(true)} />

      {/* Page transition — fades + slides each page in/out when navigating */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduce ? {} : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <CartDrawer />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
