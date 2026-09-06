'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Text mask reveal — each line slides up from behind an invisible clip
function MaskReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const shouldReduce = useReducedMotion()
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={shouldReduce ? {} : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const shouldReduce = useReducedMotion()

  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ['0%', '0%'] : ['0%', '15%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], shouldReduce ? [1, 1] : [1, 1.05])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0A0A0A]"
      aria-label="Hero — Built Different. Worn Proud."
    >
      {/* Hero image with parallax */}
      <motion.div
        initial={shouldReduce ? {} : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1800&q=90"
          alt="DRAVE — Premium streetwear, built different"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay — left side for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-20 container-drave">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <motion.p
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/60 mb-6"
          >
            New Collection
          </motion.p>

          {/* Headline — masked reveal */}
          <div className="mb-6">
            <MaskReveal delay={0.8}>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] tracking-tight">
                Built Different.
              </h1>
            </MaskReveal>
            <MaskReveal delay={1.0}>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] tracking-tight">
                Worn Proud.
              </h1>
            </MaskReveal>
          </div>

          {/* Description */}
          <motion.p
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="font-sans text-sm md:text-base text-white/70 leading-relaxed mb-10 max-w-sm"
          >
            Premium fabrics. Timeless design.
            <br />
            Made to define who you are.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#F4F1EA] transition-colors duration-300"
            >
              Explore Collection
              <motion.span
                animate={shouldReduce ? {} : { x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 hidden md:flex"
      >
        <div className="h-12 w-px bg-white/30 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="absolute inset-x-0 top-0 h-full bg-white/60"
          />
        </div>
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/30 rotate-90 origin-center mt-2">
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
