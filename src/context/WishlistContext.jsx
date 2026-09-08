'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

// ============================================
// Wishlist Context
// Manages the wishlist (saved products) across the app
// ============================================

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  // The list of products the user has saved to their wishlist
  const [items, setItems] = useState([])

  // Load saved wishlist from localStorage when the app first opens
  useEffect(() => {
    try {
      const saved = localStorage.getItem('drave_wishlist')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('drave_wishlist', JSON.stringify(items))
    } catch {}
  }, [items])

  // Add a product to the wishlist (only if it's not already there)
  const addItem = useCallback((product) => {
    setItems((prev) => {
      if (prev.find((p) => p.slug === product.slug)) return prev
      return [...prev, product]
    })
  }, [])

  // Remove a product from the wishlist by slug
  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug))
  }, [])

  // Toggle a product in/out of the wishlist
  const toggleItem = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.slug === product.slug)
      if (exists) return prev.filter((p) => p.slug !== product.slug)
      return [...prev, product]
    })
  }, [])

  // Check if a product is in the wishlist
  const isInWishlist = useCallback(
    (slug) => items.some((p) => p.slug === slug),
    [items]
  )

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        totalItems: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

// useWishlist hook — use this in any component to access wishlist data
export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}
