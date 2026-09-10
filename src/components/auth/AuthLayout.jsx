'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

export default function AuthLayout({ children }) {
  const shouldReduce = useReducedMotion()

  return (
    <div className="relative min-h-screen w-full bg-[#FAF8F5] flex flex-col justify-between overflow-x-hidden selection:bg-[#0A0A0A] selection:text-white">
      {/* Subtle Editorial Background Treatment — Extremely faint DRAVE editorial texture (3% opacity) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.035] filter grayscale contrast-125 scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80')",
          }}
        />
        {/* Soft radial vignette to preserve 100% focus and contrast on form */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#FAF8F5]/60 to-[#FAF8F5]" />
      </div>

      {/* Main Centered Content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="w-full max-w-[440px] flex flex-col items-center">
          {/* Prominently positioned DRAVE Logo at top-center linking to / */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <Link
              href="/"
              aria-label="DRAVE — Return to homepage"
              className="inline-flex items-center justify-center group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0A0A0A]"
            >
              <Image
                src="/logo.png"
                alt="DRAVE"
                width={112}
                height={55}
                className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-75"
                priority
              />
            </Link>
          </motion.div>

          {/* Form Card Container */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full bg-white border border-[#E7E2D8] p-7 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Editorial Micro Footer */}
      <footer className="relative z-10 py-6 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#8C8C8C]">
          © {new Date().getFullYear()} DRAVE — BUILT DIFFERENT. WORN PROUD.
        </p>
      </footer>
    </div>
  )
}
