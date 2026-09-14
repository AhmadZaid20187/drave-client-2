'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'

// WishlistCard — shown in overview wishlist preview and full wishlist page
// item: wishlist item from MongoDB ({ slug, name, price, image, category })
// onRemove: callback after successfully removing from wishlist
export default function WishlistCard({ item, onRemove }) {
  const { addItem } = useCart()
  const [removing, setRemoving] = useState(false)

  const handleRemove = async () => {
    setRemoving(true)
    try {
      const res = await fetch(`/api/account/wishlist/${item.slug}`, { method: 'DELETE' })
      if (res.ok && onRemove) onRemove(item.slug)
    } finally {
      setRemoving(false)
    }
  }

  const handleAddToCart = () => {
    // Add with default color/size — user can adjust in cart drawer
    addItem(
      { slug: item.slug, name: item.name, price: item.price, images: [item.image] },
      'Default',
      'M',
      1
    )
  }

  return (
    <div className="group relative border border-[#E5E5E5] bg-white">
      {/* Remove button */}
      <button
        onClick={handleRemove}
        disabled={removing}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white/90 hover:bg-white text-[#737373] hover:text-[#0A0A0A] transition-colors opacity-0 group-hover:opacity-100"
        aria-label={`Remove ${item.name} from wishlist`}
      >
        <X className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>

      {/* Product image */}
      <Link href={`/products/${item.slug}`}>
        <div className="relative aspect-[3/4] bg-[#F5F5F5] overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-[#E9E3D8]" />
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <Link href={`/products/${item.slug}`}>
          <p className="font-sans text-[10px] text-[#A3A3A3] tracking-wide uppercase mb-0.5">
            {item.category}
          </p>
          <p className="font-sans text-sm font-medium text-[#0A0A0A] hover:opacity-70 transition-opacity truncate">
            {item.name}
          </p>
          <p className="font-sans text-sm text-[#0A0A0A] mt-1">
            ৳{item.price.toLocaleString()}
          </p>
        </Link>

        <button
          onClick={handleAddToCart}
          className="mt-3 w-full flex items-center justify-center gap-2 h-8 bg-[#0A0A0A] text-white font-sans text-[9px] tracking-[0.18em] uppercase hover:bg-[#1A1A1A] transition-colors duration-200"
        >
          <ShoppingBag className="h-3 w-3" strokeWidth={1.5} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
