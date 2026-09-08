'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star, Heart, ArrowRight, Ruler } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import Accordion from '@/components/ui/Accordion'
import SizeGuide from './SizeGuide'
import ColorSelector from './ColorSelector'
import SizeSelector from './SizeSelector'
import QuantitySelector from './QuantitySelector'

export default function ProductInfo({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [cartState, setCartState] = useState('idle')
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.slug)
  const shouldReduce = useReducedMotion()

  const handleAddToCart = useCallback(async () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }

    setCartState('adding')
    addItem(product, selectedColor.name, selectedSize, quantity)
    setCartState('added')
    setTimeout(() => setCartState('idle'), 2500)
  }, [selectedSize, selectedColor, quantity, product, addItem])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduce ? 0 : 0.07 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  }

  const accordionItems = [
    {
      id: 'details',
      title: 'Product Details',
      content: (
        <ul className="space-y-2">
          {product.details.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#A3A3A3] mt-0.5">—</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: (
        <div className="space-y-3">
          <p>Free shipping on orders above ৳5,000. Standard shipping ৳120. Estimated delivery 3–5 business days.</p>
          <p>14-day hassle-free returns. Items must be unworn with original tags attached.</p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: (
        <ul className="space-y-2">
          {product.careInstructions.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#A3A3A3] mt-0.5">—</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-0"
      >
        {/* Category */}
        <motion.p variants={itemVariants} className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-3">
          DRAVE Essentials — {product.category}
        </motion.p>

        {/* Product name */}
        <motion.h1 variants={itemVariants} className="font-serif text-3xl md:text-4xl font-medium text-[#0A0A0A] leading-tight mb-4">
          {product.name}
        </motion.h1>

        {/* Price */}
        <motion.div variants={itemVariants} className="flex items-baseline gap-3 mb-4">
          <span className="font-sans text-2xl font-medium text-[#0A0A0A]">
            ৳{product.price.toLocaleString()}.00
          </span>
          {product.originalPrice && (
            <span className="font-sans text-base text-[#A3A3A3] line-through">
              ৳{product.originalPrice.toLocaleString()}
            </span>
          )}
        </motion.div>

        {/* Rating */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < product.rating ? 'fill-[#0A0A0A] text-[#0A0A0A]' : 'text-[#D4D4D4]'}`}
                strokeWidth={1}
              />
            ))}
          </div>
          <span className="font-sans text-xs text-[#737373]">{product.reviewCount} reviews</span>
        </motion.div>

        {/* Description */}
        <motion.p variants={itemVariants} className="font-sans text-sm text-[#525252] leading-relaxed mb-8 pb-8 border-b border-[#E5E5E5]">
          {product.shortDescription}
        </motion.p>

        {/* Color selector */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-sans text-[11px] tracking-[0.15em] uppercase font-medium">
              Color: <span className="text-[#737373] font-normal">{selectedColor.name}</span>
            </span>
          </div>
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
          />
        </motion.div>

        {/* Size selector */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`font-sans text-[11px] tracking-[0.15em] uppercase font-medium ${sizeError ? 'text-red-600' : ''}`}>
              {sizeError ? '— Please select a size' : 'Size'}
              {selectedSize && !sizeError && `: ${selectedSize}`}
            </span>
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="font-sans text-[11px] tracking-wider uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors flex items-center gap-1.5 focus-visible:outline-none"
            >
              <Ruler className="h-3 w-3" strokeWidth={1.5} />
              Size Guide
            </button>
          </div>
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
            hasError={sizeError}
          />
        </motion.div>

        {/* Quantity */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="font-sans text-[11px] tracking-[0.15em] uppercase font-medium block mb-3">
            Quantity
          </span>
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity((q) => q + 1)}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="space-y-3 mb-8">
          {/* Add to Cart */}
          <motion.button
            onClick={handleAddToCart}
            whileTap={shouldReduce ? {} : { scale: 0.98 }}
            disabled={cartState === 'adding'}
            className={`w-full h-13 flex items-center justify-center gap-3 font-sans text-xs tracking-widest uppercase transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A] ${
              cartState === 'added'
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#0A0A0A] text-white hover:bg-[#1A1A1A]'
            }`}
            style={{ height: '52px' }}
          >
            <AnimatePresence mode="wait">
              {cartState === 'added' ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2"
                >
                  Added to Cart ✓
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-3"
                >
                  Add to Cart
                  <motion.span
                    animate={shouldReduce ? {} : { x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Buy Now */}
          <button className="w-full h-13 border border-[#0A0A0A] text-[#0A0A0A] font-sans text-xs tracking-widest uppercase hover:bg-[#F4F1EA] transition-colors focus-visible:outline-none" style={{ height: '52px' }}>
            Buy Now
          </button>

          {/* Wishlist */}
          <button
            onClick={() => toggleItem(product)}
            className="w-full flex items-center justify-center gap-2 py-3 text-[#737373] hover:text-[#0A0A0A] transition-colors font-sans text-[11px] tracking-wider uppercase"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${inWishlist ? 'fill-[#0A0A0A] text-[#0A0A0A]' : ''}`}
              strokeWidth={1.5}
            />
            {inWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
          </button>
        </motion.div>

        {/* Accordions */}
        <motion.div variants={itemVariants}>
          <Accordion items={accordionItems} />
        </motion.div>
      </motion.div>

      {/* Size Guide Modal */}
      <SizeGuide isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </>
  )
}
