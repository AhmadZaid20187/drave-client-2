'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

// 4 Luxury Streetwear Campaign Slides
const HERO_SLIDES = [
  {
    id: 'hero-01',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1920&q=90',
    alt: 'DRAVE Campaign 01 — Signature Oversize Tee in Black',
    eyebrow: 'NEW COLLECTION',
    titleLine1: 'Built Different.',
    titleLine2: 'Worn Proud.',
    description: 'Premium fabrics. Timeless design.\nMade to define who you are.',
    objectPosition: 'center 20%',
  },
  {
    id: 'hero-02',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1920&q=90',
    alt: 'DRAVE Campaign 02 — The Essentials in Beige French Terry',
    eyebrow: 'THE ESSENTIALS',
    titleLine1: 'Designed to Last.',
    titleLine2: 'Made for Life.',
    description: 'Engineered with 320 GSM French terry.\nPure luxury in every stitch.',
    objectPosition: 'center 25%',
  },
  {
    id: 'hero-03',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=1920&q=90',
    alt: 'DRAVE Campaign 03 — DRAVE Black Tailored Utility Jacket',
    eyebrow: 'DRAVE BLACK',
    titleLine1: 'Less. But Better.',
    titleLine2: 'Absolute Presence.',
    description: 'Monochrome precision.\nZero excess, maximum statement.',
    objectPosition: 'center 30%',
  },
  {
    id: 'hero-04',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=90',
    alt: 'DRAVE Campaign 04 — Limited Drop Oversized Bomber',
    eyebrow: 'LIMITED DROP',
    titleLine1: 'Made for the Few.',
    titleLine2: 'Never Restocked.',
    description: 'Small-batch heavyweight tailoring.\nAvailable while quantities endure.',
    objectPosition: 'center 25%',
  },
]

const SLIDE_DURATION = 5000 // Approximately 5 seconds per campaign image

export default function Hero() {
  const containerRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const shouldReduce = useReducedMotion()

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ['0%', '0%'] : ['0%', '15%'])

  // Change to a specific slide & reset progress animation
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
    setProgressKey((prev) => prev + 1)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    setProgressKey((prev) => prev + 1)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
    setProgressKey((prev) => prev + 1)
  }, [])

  // Automatic slide rotation: changes slide approximately every 5 seconds
  useEffect(() => {
    if (isPaused) return

    const timer = setTimeout(() => {
      nextSlide()
    }, SLIDE_DURATION)

    return () => clearTimeout(timer)
  }, [currentSlide, progressKey, isPaused, nextSlide])

  // Pause on hover handlers for interactive controls
  const handleControlsMouseEnter = useCallback(() => {
    setIsPaused(true)
  }, [])

  const handleControlsMouseLeave = useCallback(() => {
    setIsPaused(false)
  }, [])

  // Preload next slide image to guarantee zero blank flicker
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % HERO_SLIDES.length
    const img = new window.Image()
    img.src = HERO_SLIDES[nextIndex].image

    // Preload remaining slides gently
    HERO_SLIDES.forEach((slide) => {
      const preload = new window.Image()
      preload.src = slide.image
    })
  }, [currentSlide])

  const activeSlideData = HERO_SLIDES[currentSlide]

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#0A0A0A] select-none"
      aria-label="Hero — DRAVE Luxury Fashion Campaign"
    >
      {/* =======================================================
          1. IMAGE LAYER — Cinematic Crossfade & Ken Burns Zoom
          ======================================================= */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{
              opacity: 0,
              scale: shouldReduce ? 1 : 1.06,
            }}
            animate={{
              opacity: 1,
              scale: shouldReduce ? 1 : 1.01,
              x: shouldReduce ? 0 : ['0%', '-0.8%'],
            }}
            exit={{
              opacity: 0,
              scale: shouldReduce ? 1 : 1.0,
              transition: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            transition={{
              opacity: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] },
              scale: { duration: SLIDE_DURATION / 1000, ease: 'easeOut' },
              x: { duration: SLIDE_DURATION / 1000, ease: 'easeOut' },
            }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlideData.image}
              alt={activeSlideData.alt}
              fill
              priority={currentSlide === 0}
              className="object-cover"
              style={{ objectPosition: activeSlideData.objectPosition }}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* =======================================================
          2. GRADIENT OVERLAYS — Ensures typography contrast
          ======================================================= */}
      {/* Left-to-right gradient: dark behind text, transparent on model */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/85 via-black/50 to-black/15 pointer-events-none" />
      {/* Bottom vignette */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

      {/* =======================================================
          3. HERO CONTENT LAYER — Stable CTA with gentle text reveal
          ======================================================= */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-20 container-drave">
        <div className="max-w-xl">
          {/* Animated Text Block */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={shouldReduce ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduce ? {} : { opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Eyebrow Label */}
              <motion.p
                initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/60 mb-6"
              >
                {activeSlideData.eyebrow}
              </motion.p>

              {/* Headline */}
              <div className="mb-6">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={shouldReduce ? {} : { y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.75, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] tracking-tight"
                  >
                    {activeSlideData.titleLine1}
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={shouldReduce ? {} : { y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.75, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] tracking-tight"
                  >
                    {activeSlideData.titleLine2}
                  </motion.h1>
                </div>
              </div>

              {/* Description */}
              <motion.p
                initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="font-sans text-sm md:text-base text-white/70 leading-relaxed mb-8 max-w-sm whitespace-pre-line"
              >
                {activeSlideData.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Stable CTA Button — Remains solid, does not re-render or jump */}
          <div className="mb-10">
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
          </div>

          {/* =======================================================
              4. SLIDE CONTROLS: Minimal Editorial Progress Indicators
              ======================================================= */}
          <div
            onMouseEnter={handleControlsMouseEnter}
            onMouseLeave={handleControlsMouseLeave}
            className="flex items-center justify-between pt-2 border-t border-white/10 max-w-lg"
          >
            {/* Progress indicators: 01 ━━━  02 ━━━  03 ━━━  04 ━━━ */}
            <div className="flex items-center gap-4 md:gap-6" role="tablist" aria-label="Campaign slides">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === currentSlide
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className="group flex items-center gap-2 py-2 text-left focus-visible:outline-none cursor-pointer"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Slide ${index + 1}: ${slide.titleLine1}`}
                  >
                    <span
                      className={`font-sans text-[10px] tracking-[0.2em] transition-colors duration-300 ${
                        isActive
                          ? 'text-white font-medium'
                          : 'text-white/40 group-hover:text-white/80'
                      }`}
                    >
                      {`0${index + 1}`}
                    </span>
                    <div className="relative w-8 md:w-12 h-[2px] bg-white/20 overflow-hidden rounded-full">
                      {isActive && (
                        <motion.div
                          key={`progress-${currentSlide}-${progressKey}`}
                          className="absolute inset-y-0 left-0 bg-white"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{
                            duration: SLIDE_DURATION / 1000,
                            ease: 'linear',
                          }}
                        />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Subtle Manual Arrows: ← → */}
            <div className="flex items-center gap-1">
              <button
                onClick={prevSlide}
                aria-label="Previous campaign slide"
                className="p-2 text-white/50 hover:text-white transition-colors duration-200 focus-visible:outline-none cursor-pointer"
              >
                <motion.span
                  className="inline-block"
                  whileHover={shouldReduce ? {} : { x: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                </motion.span>
              </button>
              <span className="text-white/20 text-xs select-none">/</span>
              <button
                onClick={nextSlide}
                aria-label="Next campaign slide"
                className="p-2 text-white/50 hover:text-white transition-colors duration-200 focus-visible:outline-none cursor-pointer"
              >
                <motion.span
                  className="inline-block"
                  whileHover={shouldReduce ? {} : { x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          5. SCROLL INDICATOR — Luxury Editorial Accent
          ======================================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 hidden md:flex z-10"
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
