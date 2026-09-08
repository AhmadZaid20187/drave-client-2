'use client'

import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ quantity, onIncrease, onDecrease, max = 99 }) {
  return (
    <div className="flex items-center border border-[#E5E5E5] w-fit h-11">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="w-11 h-11 flex items-center justify-center text-[#737373] hover:text-[#0A0A0A] disabled:opacity-30 transition-colors focus-visible:outline-none"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2} />
      </button>

      <span
        className="w-12 text-center font-sans text-sm font-medium select-none"
        aria-live="polite"
        aria-label={`Quantity: ${quantity}`}
      >
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-11 h-11 flex items-center justify-center text-[#737373] hover:text-[#0A0A0A] disabled:opacity-30 transition-colors focus-visible:outline-none"
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </div>
  )
}
