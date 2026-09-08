'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

// ============================================
// Cart Context
// Manages the shopping cart state across the whole app
// ============================================

// Create the context (starts as null, will be filled by CartProvider)
const CartContext = createContext(null)

// Constants for cart calculations
const SHIPPING_RATE = 120
const DISCOUNT_PERCENT = 0.1
const FREE_SHIPPING_THRESHOLD = 5000

// Helper: generate a unique ID for a cart item based on product + color + size
function generateItemId(slug, color, size) {
  return `${slug}-${color}-${size}`
}

// CartProvider wraps the app and shares cart state with all children
export function CartProvider({ children }) {
  // The list of items currently in the cart
  const [items, setItems] = useState([])
  // Whether the cart drawer is open or closed
  const [isOpen, setIsOpen] = useState(false)

  // Load saved cart from localStorage when the app first opens
  useEffect(() => {
    try {
      const saved = localStorage.getItem('drave_cart')
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch {}
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('drave_cart', JSON.stringify(items))
    } catch {}
  }, [items])

  // Calculate totals from the items array
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : subtotal > 0 ? SHIPPING_RATE : 0
  const discount = subtotal > 0 ? Math.round(subtotal * DISCOUNT_PERCENT) : 0
  const total = subtotal + shipping - discount

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  // Add a product to the cart (or increase quantity if it already exists)
  const addItem = useCallback((product, color, size, quantity = 1) => {
    const id = generateItemId(product.slug, color, size)
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        // Item already in cart — just increase quantity
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      // New item — add to cart
      return [...prev, { id, product, selectedColor: color, selectedSize: size, quantity }]
    })
    setIsOpen(true) // Open the cart drawer after adding
  }, [])

  // Remove an item from the cart by its ID
  const removeItem = useCallback((itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }, [])

  // Update the quantity of a specific cart item
  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    )
  }, [])

  // Remove all items from the cart
  const clearCart = useCallback(() => setItems([]), [])

  // Check if a specific product (with color + size) is already in the cart
  const isInCart = useCallback((slug, color, size) => {
    const id = generateItemId(slug, color, size)
    return items.some((item) => item.id === id)
  }, [items])

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

// useCart hook — use this in any component to access cart data
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
