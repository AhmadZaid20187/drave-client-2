'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function SizeSelector({ sizes, selectedSize, onSelect, hasError }) {
  const shouldReduce = useReducedMotion()

  return (
    <div className="flex items-center flex-wrap gap-2" role="radiogroup" aria-label="Select size">
      {sizes.map((size) => {
        const isSelected = size === selectedSize
        return (
          <motion.button
            key={size}
            onClick={() => onSelect(size)}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`relative h-10 min-w-[48px] px-3 border font-sans text-xs tracking-wider font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ${
              isSelected
                ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                : hasError
                ? 'border-red-400 text-[#0A0A0A] hover:border-[#0A0A0A]'
                : 'border-[#E5E5E5] text-[#0A0A0A] hover:border-[#0A0A0A]'
            }`}
            role="radio"
            aria-checked={isSelected}
            aria-label={`Size ${size}`}
          >
            {size}
          </motion.button>
        )
      })}
    </div>
  )
}
