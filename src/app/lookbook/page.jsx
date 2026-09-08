'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const LOOKBOOK_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80',
    alt: 'DRAVE Lookbook — Signature Oversize Tee',
    caption: 'Signature Oversize Tee — Black',
    size: 'large',
  },
  {
    src: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
    alt: 'DRAVE Lookbook — Minimal Hoodie',
    caption: 'Minimal Hoodie — Beige',
    size: 'small',
  },
  {
    src: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80',
    alt: 'DRAVE Lookbook — Utility Jacket',
    caption: 'Utility Jacket — Black',
    size: 'small',
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
    alt: 'DRAVE Lookbook — Premium Joggers',
    caption: 'Premium Joggers — Black',
    size: 'large',
  },
  {
    src: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80',
    alt: 'DRAVE Lookbook — DRAVE Black',
    caption: 'DRAVE Black Zip Hoodie',
    size: 'small',
  },
  {
    src: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
    alt: 'DRAVE Lookbook — Oversized Bomber',
    caption: 'Oversized Bomber Jacket — Black',
    size: 'small',
  },
]

function LookbookImage({ image, index }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      className={`group relative overflow-hidden bg-[#111111] ${image.size === 'large' ? 'col-span-2 aspect-[16/10]' : 'aspect-[3/4]'}`}
      initial={shouldReduce ? {} : { clipPath: 'inset(100% 0 0 0)', opacity: 0.5 }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={shouldReduce ? {} : { scale: 1.04 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes={image.size === 'large' ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
      </motion.div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <motion.p
          whileHover={shouldReduce ? {} : { y: -2 }}
          transition={{ duration: 0.2 }}
          className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60"
        >
          {image.caption}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function LookbookPage() {
  const shouldReduce = useReducedMotion()

  return (
    <div className="pt-[112px] min-h-screen bg-white">
      {/* Header */}
      <div className="container-drave py-10 md:py-16 border-b border-[#E5E5E5]">
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#A3A3A3] mb-2">DRAVE</p>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-[#0A0A0A]">Lookbook</h1>
          <p className="font-sans text-sm text-[#737373] mt-4 max-w-md leading-relaxed">
            Summer 2026 — See how the collection comes together in the real world.
          </p>
        </motion.div>
      </div>

      {/* Lookbook grid */}
      <div className="container-drave py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {LOOKBOOK_IMAGES.map((image, i) => (
            <LookbookImage key={i} image={image} index={i} />
          ))}
        </div>
      </div>

      {/* Statement */}
      <div className="py-20 md:py-28 bg-[#0A0A0A]">
        <div className="container-drave text-center">
          <motion.p
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif text-3xl md:text-5xl text-white leading-tight max-w-2xl mx-auto"
          >
            &ldquo;More than clothing. It&apos;s a statement of individuality.&rdquo;
          </motion.p>
        </div>
      </div>
    </div>
  )
}
