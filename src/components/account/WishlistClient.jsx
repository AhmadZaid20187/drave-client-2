'use client'

import React, { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import WishlistCard from '@/components/account/WishlistCard'
import EmptyState from '@/components/account/EmptyState'

export default function WishlistClient() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchWishlist = async () => {
    try {
      const res = await fetch('/api/account/wishlist')
      const data = await res.json()
      setItems(data.items ?? [])
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const handleRemove = (slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-1">
          Account
        </p>
        <h1 className="font-sans text-xl font-medium text-[#0A0A0A]">
          Wishlist {items.length > 0 && <span className="text-[#737373] text-sm font-normal">({items.length})</span>}
        </h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-[#E9E3D8] animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty."
          description="Explore the latest drop and save your favorite pieces."
          action={{ label: 'Explore Collection', href: '/shop' }}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <WishlistCard key={item.slug} item={item} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  )
}
