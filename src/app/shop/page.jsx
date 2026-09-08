'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { PRODUCTS } from '@/lib/products'

const CATEGORIES = ['All', 'T-Shirts', 'Hoodies', 'Jackets', 'Joggers', 'Accessories']
const SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
]

export default function ShopPage() {
  const [category, setCategory] = useState('All')
  const [selectedSizes, setSelectedSizes] = useState([])
  const [sortBy, setSortBy] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const shouldReduce = useReducedMotion()

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  const filtered = useMemo(() => {
    let result = PRODUCTS

    if (category !== 'All') {
      result = result.filter((p) => p.category === category)
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)))
    }

    switch (sortBy) {
      case 'newest':
        result = [...result].filter((p) => p.isNew).concat(result.filter((p) => !p.isNew))
        break
      case 'price_asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      default:
        result = [...result].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }

    return result
  }, [category, selectedSizes, sortBy])

  return (
    <div className="pt-[112px] min-h-screen bg-white">
      {/* Page header */}
      <div className="container-drave py-10 border-b border-[#E5E5E5]">
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#A3A3A3] mb-1">DRAVE</p>
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-[#0A0A0A]">Shop All</h1>
          </div>
          <p className="font-sans text-sm text-[#737373]">{filtered.length} Products</p>
        </motion.div>
      </div>

      <div className="container-drave py-8">
        <div className="flex gap-8">
          {/* Sidebar filters — desktop */}
          <aside className="w-56 flex-shrink-0 hidden lg:block" aria-label="Filters">
            <div className="sticky top-[120px] space-y-8">
              {/* Category */}
              <div>
                <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium mb-4">Category</h2>
                <ul className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setCategory(cat)}
                        className={`font-sans text-sm transition-colors duration-200 animated-underline ${
                          category === cat ? 'text-[#0A0A0A] font-medium' : 'text-[#737373] hover:text-[#0A0A0A]'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size */}
              <div>
                <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium mb-4">Size</h2>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`h-9 w-9 border text-xs font-sans transition-all duration-200 focus-visible:outline-none ${
                        selectedSizes.includes(size)
                          ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                          : 'border-[#E5E5E5] text-[#737373] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {selectedSizes.length > 0 && (
                  <button
                    onClick={() => setSelectedSizes([])}
                    className="mt-2 font-sans text-xs text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors"
                  >
                    Clear sizes
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Top bar: mobile filters + sort */}
            <div className="flex items-center justify-between mb-6 gap-4">
              {/* Mobile filter button */}
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 border border-[#E5E5E5] px-4 py-2.5 font-sans text-xs tracking-wider hover:border-[#0A0A0A] transition-colors"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
                Filters {(category !== 'All' || selectedSizes.length > 0) && `(${(category !== 'All' ? 1 : 0) + selectedSizes.length})`}
              </button>

              {/* Sort */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="font-sans text-xs text-[#A3A3A3] hidden sm:block">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-[#E5E5E5] font-sans text-xs px-3 py-2.5 bg-white focus:outline-none focus:border-[#0A0A0A] cursor-pointer"
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filters */}
            {(category !== 'All' || selectedSizes.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {category !== 'All' && (
                  <button
                    onClick={() => setCategory('All')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0A] text-white font-sans text-[10px] tracking-wider"
                  >
                    {category} <X className="h-3 w-3" strokeWidth={2} />
                  </button>
                )}
                {selectedSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0A] text-white font-sans text-[10px] tracking-wider"
                  >
                    {s} <X className="h-3 w-3" strokeWidth={2} />
                  </button>
                ))}
              </div>
            )}

            {/* Product grid */}
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                <motion.div layout className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                  {filtered.map((product, i) => (
                    <motion.div key={product.id} layout>
                      <ProductCard product={product} index={i} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24"
                >
                  <p className="font-sans text-sm text-[#737373]">No products found.</p>
                  <button
                    onClick={() => { setCategory('All'); setSelectedSizes([]) }}
                    className="mt-4 font-sans text-xs tracking-wider uppercase underline text-[#0A0A0A]"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={shouldReduce ? {} : { x: '-100%' }}
              animate={{ x: 0 }}
              exit={shouldReduce ? {} : { x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-sans text-xs font-medium tracking-widest uppercase">Filters</span>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium mb-4">Category</h2>
                  <ul className="space-y-3">
                    {CATEGORIES.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => { setCategory(cat); setFiltersOpen(false) }}
                          className={`font-sans text-sm transition-colors ${category === cat ? 'text-[#0A0A0A] font-medium' : 'text-[#737373]'}`}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium mb-4">Size</h2>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`h-10 w-10 border text-xs font-sans ${selectedSizes.includes(size) ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]' : 'border-[#E5E5E5] text-[#737373]'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setFiltersOpen(false)}
                className="mt-8 w-full h-12 bg-[#0A0A0A] text-white font-sans text-xs tracking-widest uppercase"
              >
                Apply Filters
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
