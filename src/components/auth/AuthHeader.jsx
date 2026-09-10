'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function AuthHeader({ title, subtitle }) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-center mb-8"
    >
      <h1 className="font-sans text-xl sm:text-2xl font-bold uppercase tracking-[0.22em] text-[#0A0A0A]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-xs sm:text-sm font-normal text-[#666666] tracking-[0.02em]">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
