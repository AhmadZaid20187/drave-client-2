'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'

export default function ProductGallery({ images, productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const shouldReduce = useReducedMotion()

  const selectImage = (index) => {
    setDirection(index > selectedIndex ? 1 : -1)
    setSelectedIndex(index)
  }

  const handleMouseMove = (e) => {
    if (!isZoomed) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  const slideVariants = {
    enter: (dir) => ({
      x: shouldReduce ? 0 : dir * 30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: shouldReduce ? 0 : dir * -30,
      opacity: 0,
    }),
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnails — vertical */}
      <div className="flex flex-col gap-3 w-16 flex-shrink-0">
        {images.map((src, i) => (
          <motion.button
            key={i}
            onClick={() => selectImage(i)}
            initial={shouldReduce ? {} : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={shouldReduce ? {} : { scale: 1.03 }}
            className={`relative aspect-square overflow-hidden border transition-all duration-200 focus-visible:outline-none ${
              i === selectedIndex
                ? 'border-[#0A0A0A]'
                : 'border-[#E5E5E5] hover:border-[#A3A3A3]'
            }`}
            aria-label={`View image ${i + 1}`}
            aria-current={i === selectedIndex}
          >
            <Image
              src={src}
              alt={`${productName} — view ${i + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </motion.button>
        ))}
      </div>

      {/* Main image */}
      <div
        className={`relative flex-1 overflow-hidden bg-[#F5F5F5] aspect-[3/4] ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={() => setIsZoomed((z) => !z)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
        role="img"
        aria-label={`${productName} — main view`}
      >
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={selectedIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute inset-0"
              animate={
                shouldReduce
                  ? {}
                  : isZoomed
                  ? {
                      scale: 2,
                      x: `calc(${50 - mousePos.x}% )`,
                      y: `calc(${50 - mousePos.y}%)`,
                    }
                  : { scale: 1, x: 0, y: 0 }
              }
              transition={{ duration: isZoomed ? 0 : 0.3 }}
            >
              <Image
                src={images[selectedIndex]}
                alt={`${productName} — image ${selectedIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={selectedIndex === 0}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Zoom hint */}
        {!isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-3 right-3 bg-white/80 p-1.5"
          >
            <ZoomIn className="h-3.5 w-3.5 text-[#737373]" strokeWidth={1.5} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
