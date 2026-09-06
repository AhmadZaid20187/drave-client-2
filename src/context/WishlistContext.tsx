'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { Product } from '@/lib/types'

interface WishlistContextValue {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (slug: string) => void
  toggleItem: (product: Product) => void
  isInWishlist: (slug: string) => boolean
  totalItems: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('drave_wishlist')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('drave_wishlist', JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.find((p) => p.slug === product.slug)) return prev
      return [...prev, product]
    })
  }, [])

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug))
  }, [])

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.slug === product.slug)
      if (exists) return prev.filter((p) => p.slug !== product.slug)
      return [...prev, product]
    })
  }, [])

  const isInWishlist = useCallback(
    (slug: string) => items.some((p) => p.slug === slug),
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

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}
