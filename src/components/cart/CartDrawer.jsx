'use client'

import React, { useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'

// A single cart item row shown inside the drawer
function CartItemComponent({ item }) {
  const { removeItem, updateQuantity } = useCart()
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      layout
      initial={shouldReduce ? {} : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduce ? {} : { opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex gap-4 pb-6 mb-6 border-b border-[#E5E5E5] last:border-0 last:mb-0"
    >
      {/* Product image */}
      <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
        <div className="relative w-20 h-24 bg-[#F5F5F5] overflow-hidden">
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      </Link>

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={`/products/${item.product.slug}`}>
            <span className="font-sans text-xs font-medium tracking-wider uppercase text-[#0A0A0A] leading-tight hover:opacity-70 transition-opacity">
              {item.product.name}
            </span>
          </Link>
          {/* Remove button */}
          <button
            onClick={() => removeItem(item.id)}
            className="text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors flex-shrink-0"
            aria-label="Remove item"
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>

        <p className="font-sans text-xs text-[#737373] mb-3">
          {item.selectedColor} / {item.selectedSize}
        </p>

        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center border border-[#E5E5E5] h-8">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 flex items-center justify-center text-[#737373] hover:text-[#0A0A0A] disabled:opacity-30 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" strokeWidth={2} />
            </button>
            <span className="w-8 text-center font-sans text-xs font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 flex items-center justify-center text-[#737373] hover:text-[#0A0A0A] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" strokeWidth={2} />
            </button>
          </div>

          {/* Item total price */}
          <span className="font-sans text-sm font-medium text-[#0A0A0A]">
            ৳{(item.product.price * item.quantity).toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// CartDrawer — slides in from the right when user adds to cart or clicks the bag icon
export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, shipping, discount, total, totalItems } = useCart()
  const shouldReduce = useReducedMotion()

  // Close the drawer when user presses Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') closeCart()
    },
    [closeCart]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping cart">
          {/* Dark backdrop — clicking it closes the drawer */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduce ? {} : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/50"
            onClick={closeCart}
          />

          {/* Drawer panel — slides in from the right */}
          <motion.div
            initial={shouldReduce ? {} : { x: '100%' }}
            animate={{ x: 0 }}
            exit={shouldReduce ? {} : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                <span className="font-sans text-xs font-medium tracking-widest uppercase">
                  Your Cart ({totalItems})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="text-[#737373] hover:text-[#0A0A0A] transition-colors focus-visible:outline-none"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Empty cart state */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                <ShoppingBag className="h-12 w-12 text-[#D4D4D4]" strokeWidth={1} />
                <p className="font-sans text-sm text-[#737373]">Your cart is empty</p>
                <button
                  onClick={closeCart}
                  className="font-sans text-xs tracking-widest uppercase underline text-[#0A0A0A] hover:opacity-60 transition-opacity"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Cart items list */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartItemComponent key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Order summary */}
                <div className="border-t border-[#E5E5E5] px-6 py-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="font-sans text-xs text-[#737373] uppercase tracking-wider">Subtotal</span>
                      <span className="font-sans text-sm">৳{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-xs text-[#737373] uppercase tracking-wider">Shipping</span>
                      <span className="font-sans text-sm">
                        {shipping === 0 ? 'Free' : `৳${shipping.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-700">
                      <span className="font-sans text-xs uppercase tracking-wider">Discount (WELCOME10)</span>
                      <span className="font-sans text-sm">-৳{discount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-[#E5E5E5]">
                      <span className="font-sans text-xs font-medium uppercase tracking-wider">Total</span>
                      <span className="font-sans text-base font-semibold">৳{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout buttons */}
                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="flex items-center justify-center gap-3 w-full h-12 bg-[#0A0A0A] text-white font-sans text-xs tracking-widest uppercase hover:bg-[#1A1A1A] transition-colors"
                    >
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </Link>
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="flex items-center justify-center w-full h-12 border border-[#0A0A0A] text-[#0A0A0A] font-sans text-xs tracking-widest uppercase hover:bg-[#F4F1EA] transition-colors"
                    >
                      View Cart
                    </Link>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-5 space-y-2">
                    <p className="font-sans text-[10px] text-[#A3A3A3] flex items-center gap-2">
                      🔒 Secure checkout — 100% safe &amp; secure payments
                    </p>
                    <p className="font-sans text-[10px] text-[#A3A3A3] flex items-center gap-2">
                      ↩ Easy returns — 14-day return policy
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
