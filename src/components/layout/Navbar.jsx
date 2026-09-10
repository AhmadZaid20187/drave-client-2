'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingBag, Menu } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import AnnouncementBar from './AnnouncementBar'
import MobileMenu from './MobileMenu'

// Navigation links shown in the desktop navbar
const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Journal', href: '/journal' },
]

// Navbar — fixed at the top of every page
// transparent: true on the homepage so it overlaps the hero image
export default function Navbar({ transparent = false, onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems, openCart } = useCart()
  const shouldReduce = useReducedMotion()

  // Track whether the user has scrolled down (used to switch navbar style)
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // The navbar is only transparent when on homepage AND user hasn't scrolled
  const isTransparent = transparent && !scrolled
  const textColor = isTransparent ? 'text-white' : 'text-[#0A0A0A]'
  const bgStyle = isTransparent
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-xs'

  // Animation variants for nav links appearing one-by-one
  const linkVariants = {
    hidden: { opacity: 0, y: -6 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.1 + i * 0.07, ease: 'easeOut' },
    }),
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300">
        <AnnouncementBar collapsed={scrolled} />
        <nav
          className={`w-full transition-all duration-300 ${bgStyle}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="container-drave flex items-center justify-between h-[72px]">
            {/* Logo */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <Link href="/" aria-label="DRAVE — Go to homepage" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="DRAVE"
                  width={96}
                  height={47}
                  className={`h-7 md:h-8 w-auto object-contain transition-all duration-300 ${isTransparent ? 'brightness-0 invert' : ''
                    }`}
                  priority
                />
              </Link>
            </motion.div>

            {/* Center nav links — desktop only */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.href} custom={i} variants={linkVariants} initial="hidden" animate="visible">
                  <Link
                    href={link.href}
                    className={`relative font-sans text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-300 ${textColor} animated-underline`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right icons */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              {/* Search button */}
              <button
                onClick={onSearchOpen}
                className={`p-1 transition-colors duration-300 ${textColor} hover:opacity-60 focus-visible:outline-none`}
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>

              {/* Account link — desktop only */}
              <Link
                href="/signin"
                className={`p-1 hidden md:block transition-colors duration-300 ${textColor} hover:opacity-60 focus-visible:outline-none`}
                aria-label="SignIn"
              >
                <User className="h-5 w-5" strokeWidth={1.5} />
              </Link>

              {/* Cart button with item count badge */}
              <button
                onClick={openCart}
                className={`p-1 relative transition-colors duration-300 ${textColor} hover:opacity-60 focus-visible:outline-none`}
                aria-label={`Shopping bag, ${totalItems} items`}
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={shouldReduce ? {} : { scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={shouldReduce ? {} : { scale: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-[#0A0A0A] text-white text-[9px] font-medium rounded-full"
                      style={{ backgroundColor: isTransparent ? '#F4F1EA' : '#0A0A0A', color: isTransparent ? '#0A0A0A' : '#FFFFFF' }}
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile menu button — hidden on desktop */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`p-1 lg:hidden transition-colors duration-300 ${textColor} hover:opacity-60 focus-visible:outline-none`}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu — slides in from off-screen */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onSearchOpen={onSearchOpen}
      />
    </>
  )
}
