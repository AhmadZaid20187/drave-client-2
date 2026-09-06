'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Search, ArrowRight } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import type { Product } from '@/lib/types'

const POPULAR_SEARCHES = ['T-Shirts', 'Hoodies', 'Jackets', 'Joggers', 'DRAVE Black']

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const shouldReduce = useReducedMotion()

  const handleSearch = useCallback((q: string) => {
    setQuery(q)
    if (q.trim().length < 2) {
      setResults([])
      return
    }
    const lower = q.toLowerCase()
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower))
    ).slice(0, 6)
    setResults(filtered)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduce ? {} : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-white flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-10 pt-6 pb-4">
            <Link href="/" onClick={onClose} aria-label="DRAVE">
              <span className="font-serif text-xl font-medium tracking-tight">DRAVE</span>
            </Link>
            <motion.button
              onClick={onClose}
              whileTap={shouldReduce ? {} : { rotate: 90, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="text-[#737373] hover:text-[#0A0A0A] transition-colors focus-visible:outline-none"
              aria-label="Close search"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Search input */}
          <div className="px-6 md:px-10 py-6 border-b border-[#E5E5E5]">
            <motion.div
              initial={shouldReduce ? {} : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <Search className="h-5 w-5 text-[#A3A3A3] flex-shrink-0" strokeWidth={1.5} />
              <input
                type="search"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search DRAVE..."
                autoFocus
                className="flex-1 font-sans text-xl md:text-2xl text-[#0A0A0A] placeholder-[#D4D4D4] bg-transparent focus:outline-none"
                aria-label="Search products"
              />
              {query && (
                <button
                  onClick={() => handleSearch('')}
                  className="text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              )}
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
            {/* Results */}
            {results.length > 0 ? (
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-5">
                  Results ({results.length})
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {results.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={onClose}
                        className="group block"
                      >
                        <div className="relative aspect-[3/4] bg-[#F5F5F5] overflow-hidden mb-3">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="200px"
                          />
                        </div>
                        <p className="font-sans text-xs font-medium text-[#0A0A0A] group-hover:opacity-70 transition-opacity">
                          {product.name}
                        </p>
                        <p className="font-sans text-xs text-[#737373] mt-0.5">৳{product.price.toLocaleString()}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : query.length >= 2 ? (
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="font-sans text-sm text-[#737373]">No results for &quot;{query}&quot;</p>
                <p className="font-sans text-xs text-[#A3A3A3] mt-2">Try a different search term</p>
              </motion.div>
            ) : (
              /* Popular searches */
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-5">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-3">
                  {POPULAR_SEARCHES.map((term, i) => (
                    <motion.button
                      key={term}
                      initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                      onClick={() => handleSearch(term)}
                      className="group flex items-center gap-2 px-4 py-2.5 border border-[#E5E5E5] font-sans text-xs tracking-wider hover:border-[#0A0A0A] transition-colors duration-200"
                    >
                      {term}
                      <ArrowRight className="h-3 w-3 text-[#A3A3A3] group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all duration-200" strokeWidth={1.5} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
