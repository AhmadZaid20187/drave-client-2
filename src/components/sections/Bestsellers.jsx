'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'

// Bestsellers — displays the top 4 bestselling products on the homepage
// products: array of product objects passed from the home page
export default function Bestsellers({ products }) {
  const shouldReduce = useReducedMotion()

  return (
    <section className="py-20 md:py-28 bg-white" aria-label="Bestsellers">
      <div className="container-drave">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#A3A3A3] mb-2">
              The Selection
            </h2>
            <span className="font-serif text-4xl md:text-5xl font-medium text-[#0A0A0A]">
              Bestsellers
            </span>
          </motion.div>

          <motion.div
            initial={shouldReduce ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/shop"
              className="group flex items-center gap-2 font-sans text-[11px] tracking-[0.18em] uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors duration-300"
            >
              View All
              <motion.span
                whileHover={shouldReduce ? {} : { x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Product grid — 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
