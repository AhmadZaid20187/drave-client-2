'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CollectionCard({ collection, index = 0, variant = 'default' }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.article
      initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: shouldReduce ? 0 : index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={variant === 'large' ? 'col-span-2' : ''}
    >
      <Link href={`/collections/${collection.slug}`} className="group block relative overflow-hidden">
        {/* Image */}
        <div className={`relative overflow-hidden bg-[#111111] ${variant === 'large' ? 'aspect-[16/9]' : 'aspect-[3/4]'}`}>
          <motion.div
            className="absolute inset-0"
            initial={shouldReduce ? {} : { clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="absolute inset-0"
              whileHover={shouldReduce ? {} : { scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover"
                sizes={variant === 'large' ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
              />
            </motion.div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-500" />
          </motion.div>

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <motion.div
              whileHover={shouldReduce ? {} : { y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/60 mb-2">
                {collection.productCount} Pieces
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-white leading-tight mb-2">
                {collection.name}
              </h3>
              <p className="font-sans text-xs text-white/70 mb-4 max-w-xs hidden md:block">
                {collection.tagline}
              </p>
              <span className="flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors">
                Explore
                <motion.span
                  whileHover={shouldReduce ? {} : { x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </motion.span>
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
