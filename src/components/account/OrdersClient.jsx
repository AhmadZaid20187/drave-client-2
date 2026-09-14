'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Package } from 'lucide-react'
import OrderCard from '@/components/account/OrderCard'
import EmptyState from '@/components/account/EmptyState'
import { OrderRowSkeleton } from '@/components/account/DashboardSkeleton'

const FILTERS = ['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function OrdersClient() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    fetch('/api/account/orders')
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered =
    activeFilter === 'All'
      ? orders
      : orders.filter((o) => o.status?.toLowerCase() === activeFilter.toLowerCase())

  return (
    <div>
      {/* Page heading */}
      <div className="mb-8">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-1">
          Account
        </p>
        <h1 className="font-sans text-xl font-medium text-[#0A0A0A]">Orders</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex overflow-x-auto gap-0 mb-8 border-b border-[#E5E5E5] -mx-0">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 px-4 py-2.5 font-sans text-[10px] tracking-[0.15em] uppercase border-b-[1.5px] transition-all duration-150 whitespace-nowrap ${
              activeFilter === f
                ? 'text-[#0A0A0A] border-[#0A0A0A]'
                : 'text-[#A3A3A3] border-transparent hover:text-[#0A0A0A]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {loading ? (
        <div>
          {[...Array(4)].map((_, i) => (
            <OrderRowSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title={activeFilter === 'All' ? 'No orders yet.' : `No ${activeFilter.toLowerCase()} orders.`}
          description="Your next DRAVE piece is waiting."
          action={{ label: 'Shop Collection', href: '/shop' }}
        />
      ) : (
        <div>
          {filtered.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
