'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import OrderStatusBadge from './OrderStatusBadge'

// Format a date string or Date object into a readable format
function formatDate(dateVal) {
  if (!dateVal) return '—'
  const d = new Date(dateVal)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// OrderCard — shown in order list and overview recent orders section
export default function OrderCard({ order }) {
  const firstItem = order.items?.[0]
  const extraCount = (order.items?.length ?? 0) - 1

  return (
    <div className="flex items-center justify-between py-5 border-b border-[#F0ECE6] gap-4 group">
      {/* Left: product thumbnail + order info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Product thumbnail */}
        <div className="h-14 w-14 flex-shrink-0 bg-[#F5F5F5] overflow-hidden relative">
          {firstItem?.image ? (
            <Image
              src={firstItem.image}
              alt={firstItem.name ?? 'Product'}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <div className="w-full h-full bg-[#E9E3D8]" />
          )}
        </div>

        {/* Text info */}
        <div className="flex-1 min-w-0">
          <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#A3A3A3] mb-0.5">
            #{order.orderNumber ?? order._id?.slice(-6).toUpperCase()}
          </p>
          <p className="font-sans text-sm font-medium text-[#0A0A0A] truncate">
            {firstItem?.name ?? 'Order'}
            {extraCount > 0 && (
              <span className="text-[#A3A3A3] font-normal"> +{extraCount} more</span>
            )}
          </p>
          <p className="font-sans text-xs text-[#A3A3A3] mt-0.5">
            {formatDate(order.createdAt)}
          </p>
        </div>
      </div>

      {/* Right: price, status, action */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="hidden sm:block text-right">
          <p className="font-sans text-sm font-medium text-[#0A0A0A]">
            ৳{(order.total ?? 0).toLocaleString()}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
        <Link
          href={`/account/orders/${order._id}`}
          className="hidden sm:inline-flex items-center justify-center h-8 px-4 border border-[#0A0A0A] font-sans text-[9px] tracking-[0.18em] uppercase hover:bg-[#0A0A0A] hover:text-white transition-all duration-200"
        >
          View
        </Link>
      </div>
    </div>
  )
}
