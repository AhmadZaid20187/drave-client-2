'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import SearchOverlay from '@/components/search/SearchOverlay'

const TRANSPARENT_NAV_ROUTES = ['/']

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const shouldReduce = useReducedMotion()

  const isTransparent = TRANSPARENT_NAV_ROUTES.includes(pathname)

  return (
    <>
      <Navbar transparent={isTransparent} onSearchOpen={() => setSearchOpen(true)} />

      {/* Page transition wrapper */}
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
