'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart, Eye } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'

// ProductCard — displays a single product in a grid
// product: the product object
// index: position in the grid (used to stagger the reveal animation)
export default function ProductCard({ product, index = 0 }) {
  // Track hover state to show the "View Product" overlay
  const [imageHovered, setImageHovered] = useState(false)
  const { toggleItem, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.slug)
  const shouldReduce = useReducedMotion()

  // Toggle wishlist when clicking the heart button
  // e.preventDefault stops the click from also navigating to the product page
  const handleWishlistClick = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      toggleItem(product)
    },
    [product, toggleItem]
  )

  return (
    <motion.article
      initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: shouldReduce ? 0 : index * 0.1, ease: 'easeOut' }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-[#F5F5F5] aspect-[3/4] mb-4 group">
        <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
          {/* Zoom on hover */}
          <motion.div
            className="absolute inset-0"
            animate={shouldReduce ? {} : { scale: imageHovered ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </motion.div>

          {/* "View Product" overlay — appears on hover */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 10 }}
            animate={shouldReduce ? {} : { opacity: imageHovered ? 1 : 0, y: imageHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 bg-white/90 py-3 flex items-center justify-center gap-2"
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium">
              View Product
            </span>
          </motion.div>
        </Link>

        {/* NEW badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="font-sans text-[9px] font-medium tracking-widest uppercase bg-[#0A0A0A] text-white px-2 py-1">
              New
            </span>
          )}
        </div>

        {/* Wishlist heart button */}
        <motion.button
          onClick={handleWishlistClick}
          whileHover={shouldReduce ? {} : { scale: 1.15 }}
          whileTap={shouldReduce ? {} : { scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white transition-colors focus-visible:outline-none"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={inWishlist}
        >
          <Heart
            className={`h-4 w-4 transition-colors duration-200 ${inWishlist ? 'fill-[#0A0A0A] text-[#0A0A0A]' : 'text-[#737373]'}`}
            strokeWidth={1.5}
          />
        </motion.button>
      </div>

      {/* Product text info below the image */}
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="space-y-1.5">
          {/* Category label */}
          <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#A3A3A3]">
            {product.category}
          </p>

          {/* Product name */}
          <h3 className="font-sans text-sm font-medium text-[#0A0A0A] group-hover:opacity-70 transition-opacity">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-sans text-sm font-medium text-[#0A0A0A]">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-xs text-[#A3A3A3] line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color swatches */}
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.slice(0, 4).map((color) => (
              <motion.div
                key={color.name}
                whileHover={shouldReduce ? {} : { scale: 1.2 }}
                transition={{ duration: 0.15 }}
                title={color.name}
                className="h-3.5 w-3.5 rounded-full border border-[#E5E5E5] cursor-default flex-shrink-0"
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="font-sans text-[10px] text-[#A3A3A3]">+{product.colors.length - 4}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
