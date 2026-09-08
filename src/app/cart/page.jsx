'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, subtotal, shipping, discount, total, removeItem, updateQuantity, totalItems } = useCart()
  const shouldReduce = useReducedMotion()

  return (
    <div className="pt-[112px] min-h-screen bg-white">
      <div className="container-drave py-10 md:py-16">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-[#0A0A0A]">
            Shopping Bag {totalItems > 0 && <span className="text-[#A3A3A3]">({totalItems})</span>}
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 gap-6">
            <ShoppingBag className="h-16 w-16 text-[#D4D4D4]" strokeWidth={1} />
            <p className="font-serif text-2xl text-[#A3A3A3]">Your bag is empty</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-[#0A0A0A] text-white px-8 py-4 font-sans text-xs tracking-widest uppercase hover:bg-[#1A1A1A] transition-colors"
            >
              Start Shopping <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16">
            {/* Items — left */}
            <div className="lg:col-span-2">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 pb-4 mb-4 border-b border-[#E5E5E5]">
                <div className="w-20" />
                <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#A3A3A3]">Product</span>
                <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#A3A3A3] text-center">Quantity</span>
                <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#A3A3A3] text-right">Price</span>
                <div className="w-8" />
              </div>

              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={shouldReduce ? {} : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduce ? {} : { opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-5 py-6 border-b border-[#E5E5E5]"
                  >
                    {/* Image */}
                    <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                      <div className="relative w-20 md:w-24 aspect-[3/4] bg-[#F5F5F5] overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link href={`/products/${item.product.slug}`}>
                            <h3 className="font-sans text-sm font-medium text-[#0A0A0A] hover:opacity-70 transition-opacity uppercase tracking-wider">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="font-sans text-xs text-[#737373] mt-1">
                            {item.selectedColor} / {item.selectedSize}
                          </p>
                          <p className="font-sans text-sm font-medium text-[#0A0A0A] mt-2 md:hidden">
                            ৳{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        {/* Quantity */}
                        <div className="flex items-center border border-[#E5E5E5] h-9">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-9 flex items-center justify-center text-[#737373] hover:text-[#0A0A0A] disabled:opacity-30 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" strokeWidth={2} />
                          </button>
                          <span className="w-9 text-center font-sans text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 flex items-center justify-center text-[#737373] hover:text-[#0A0A0A] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" strokeWidth={2} />
                          </button>
                        </div>

                        {/* Price — desktop */}
                        <span className="font-sans text-sm font-medium text-[#0A0A0A] hidden md:block">
                          ৳{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="pt-6">
                <Link
                  href="/shop"
                  className="font-sans text-xs tracking-wider uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors animated-underline"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order summary — right */}
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:sticky lg:top-[120px] lg:self-start"
            >
              <div className="bg-[#F5F5F5] p-6">
                <h2 className="font-sans text-xs font-medium tracking-widest uppercase mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-[#737373]">Subtotal</span>
                    <span className="font-sans text-sm">৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-[#737373]">Shipping</span>
                    <span className="font-sans text-sm">{shipping === 0 ? 'Free' : `৳${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between text-green-700">
                    <span className="font-sans text-xs">Discount (WELCOME10)</span>
                    <span className="font-sans text-sm">-৳{discount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-[#E5E5E5]">
                    <span className="font-sans text-sm font-medium">Total</span>
                    <span className="font-sans text-lg font-semibold">৳{total.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-3 w-full h-13 bg-[#0A0A0A] text-white font-sans text-xs tracking-widest uppercase hover:bg-[#1A1A1A] transition-colors mb-3"
                  style={{ height: '52px' }}
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>

                {shipping > 0 && (
                  <p className="font-sans text-[11px] text-center text-[#737373] mt-3">
                    Add ৳{(5000 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}
              </div>

              <div className="mt-4 space-y-2 px-1">
                <p className="font-sans text-[11px] text-[#A3A3A3]">🔒 Secure checkout</p>
                <p className="font-sans text-[11px] text-[#A3A3A3]">↩ Easy 14-day returns</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
