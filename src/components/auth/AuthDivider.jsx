'use client'

import React from 'react'

export default function AuthDivider({ text = 'OR' }) {
  return (
    <div className="relative my-6 flex items-center justify-center">
      <div className="w-full border-t border-[#E5E5E5]" aria-hidden="true" />
      <span className="absolute bg-[#FAFAF8] px-4 font-sans text-[10px] uppercase tracking-[0.25em] text-[#8C8C8C] select-none">
        {text}
      </span>
    </div>
  )
}
