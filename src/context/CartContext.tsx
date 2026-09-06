'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { CartItem, Product } from '@/lib/types'

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotal: number
  shipping: number
  discount: number
  total: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, color: string, size: string, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (slug: string, color: string, size: string) => boolean
}

const CartContext = createContext<CartContextValue | null>(null)

const SHIPPING_RATE = 120
const DISCOUNT_CODE = 'WELCOME10'
const DISCOUNT_PERCENT = 0.1
const FREE_SHIPPING_THRESHOLD = 5000

function generateItemId(slug: string, color: string, size: string): string {
  return `${slug}-${color}-${size}`
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Persist cart to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('drave_cart')
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('drave_cart', JSON.stringify(items))
    } catch {}
  }, [items])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : subtotal > 0 ? SHIPPING_RATE : 0
  const discount = subtotal > 0 ? Math.round(subtotal * DISCOUNT_PERCENT) : 0
  const total = subtotal + shipping - discount

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback(
    (product: Product, color: string, size: string, quantity = 1) => {
      const id = generateItemId(product.slug, color, size)
      setItems((prev) => {
        const existing = prev.find((item) => item.id === id)
        if (existing) {
          return prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + quantity } : item
          )
        }
        return [...prev, { id, product, selectedColor: color, selectedSize: size, quantity }]
      })
      setIsOpen(true)
    },
    []
  )

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const isInCart = useCallback(
    (slug: string, color: string, size: string) => {
      const id = generateItemId(slug, color, size)
      return items.some((item) => item.id === id)
    },
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        shipping,
        discount,
        total,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
