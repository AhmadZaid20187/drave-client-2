'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) {
  const shouldReduce = useReducedMotion()

  const base =
    'relative inline-flex items-center justify-center gap-2 font-sans font-medium tracking-widest uppercase text-xs transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none overflow-hidden'

  const variants = {
    primary:
      'bg-[#0A0A0A] text-white border border-[#0A0A0A] hover:bg-[#1A1A1A] focus-visible:outline-[#0A0A0A]',
    secondary:
      'bg-[#F4F1EA] text-[#0A0A0A] border border-[#F4F1EA] hover:bg-[#E9E3D8] focus-visible:outline-[#0A0A0A]',
    ghost:
      'bg-transparent text-[#0A0A0A] border border-transparent hover:border-[#0A0A0A] focus-visible:outline-[#0A0A0A]',
    outline:
      'bg-transparent text-[#0A0A0A] border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white focus-visible:outline-[#0A0A0A]',
  }

  const sizes = {
    sm: 'h-9 px-5 text-[10px]',
    md: 'h-12 px-7 text-xs',
    lg: 'h-14 px-10 text-xs',
  }

  return (
    <motion.button
      whileTap={shouldReduce ? {} : { scale: 0.97 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <motion.span
              className="flex-shrink-0"
              whileHover={shouldReduce ? {} : { x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.span>
          )}
        </>
      )}
    </motion.button>
  )
}
