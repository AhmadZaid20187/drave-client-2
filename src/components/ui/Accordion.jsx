'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'

function AccordionItemComponent({
  item,
  isOpen,
  onToggle,
}) {
  const shouldReduce = useReducedMotion()

  return (
    <div className="border-t border-[#E5E5E5] last:border-b">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left focus-visible:outline-none group"
        aria-expanded={isOpen}
      >
        <span className="font-sans text-xs font-medium tracking-widest uppercase text-[#0A0A0A]">
          {item.title}
        </span>
        <motion.span
          animate={shouldReduce ? {} : { rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-[#0A0A0A]"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldReduce ? {} : { height: 0, opacity: 0 }}
            animate={shouldReduce ? {} : { height: 'auto', opacity: 1 }}
            exit={shouldReduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm text-[#525252] leading-relaxed font-sans">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Accordion({ items, defaultOpen }) {
  const [openId, setOpenId] = useState(defaultOpen ?? null)

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div>
      {items.map((item) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  )
}
