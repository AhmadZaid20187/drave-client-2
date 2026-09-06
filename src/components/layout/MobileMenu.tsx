'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion'
import { X, Search, ShoppingBag, User } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Journal', href: '/journal' },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onSearchOpen: () => void
}

export default function MobileMenu({ isOpen, onClose, onSearchOpen }: MobileMenuProps) {
  const shouldReduce = useReducedMotion()
  const { totalItems, openCart } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => {
    onClose()
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: i * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduce ? {} : { opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6">
            <Link href="/" onClick={handleLinkClick} aria-label="DRAVE">
              <Image
                src="/logo.png"
                alt="DRAVE"
                width={96}
                height={47}
                className="h-7 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <div className="flex items-center gap-4">
              <button
                onClick={() => { onSearchOpen(); onClose() }}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => { openCart(); onClose() }}
                className="relative text-white/70 hover:text-white transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-[#F4F1EA] text-[#0A0A0A] text-[9px] font-medium rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <motion.button
                onClick={onClose}
                whileTap={shouldReduce ? {} : { rotate: 90, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="text-white/70 hover:text-white transition-colors focus-visible:outline-none"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </motion.button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 flex flex-col justify-center px-8">
            <ul className="space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="group block py-4 border-b border-white/10 last:border-0"
                  >
                    <span className="font-serif text-4xl text-white/90 group-hover:text-white transition-colors duration-300 tracking-tight">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Footer links */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="px-8 pb-8 flex items-center gap-6"
          >
            <Link
              href="/account"
              onClick={handleLinkClick}
              className="flex items-center gap-2 text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors"
            >
              <User className="h-4 w-4" strokeWidth={1.5} />
              Account
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
