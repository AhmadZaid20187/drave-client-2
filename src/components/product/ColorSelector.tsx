'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ProductColor } from '@/lib/types'

interface ColorSelectorProps {
  colors: ProductColor[]
  selectedColor: ProductColor
  onSelect: (color: ProductColor) => void
}

export default function ColorSelector({ colors, selectedColor, onSelect }: ColorSelectorProps) {
  const shouldReduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" role="radiogroup" aria-label="Select color">
      {colors.map((color) => {
        const isSelected = color.name === selectedColor.name
        return (
          <motion.button
            key={color.name}
            onClick={() => onSelect(color)}
            whileHover={shouldReduce ? {} : { scale: 1.1 }}
            whileTap={shouldReduce ? {} : { scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`relative h-7 w-7 rounded-full border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ${
              isSelected ? 'border-[#0A0A0A]' : 'border-[#E5E5E5] hover:border-[#A3A3A3]'
            }`}
            style={{ backgroundColor: color.hex }}
            role="radio"
            aria-checked={isSelected}
            aria-label={color.name}
            title={color.name}
          >
            {/* Inner ring for selected state */}
            {isSelected && (
              <motion.span
                layoutId="colorRing"
                className="absolute inset-0.5 rounded-full border border-white"
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
