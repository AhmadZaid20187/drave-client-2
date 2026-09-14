import React from 'react'
import Link from 'next/link'

// EmptyState — shown when a dashboard section has no data
// icon: lucide react icon component
// title: primary message
// description: secondary context
// action: { label, href, onClick } — optional CTA link or button
export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {Icon && (
        <div className="mb-6 p-4 bg-[#F4F1EA]">
          <Icon className="h-6 w-6 text-[#A3A3A3]" strokeWidth={1.5} />
        </div>
      )}
      <p className="font-sans text-sm font-medium text-[#0A0A0A] mb-2">{title}</p>
      {description && (
        <p className="font-sans text-sm text-[#A3A3A3] max-w-xs leading-relaxed">{description}</p>
      )}
      {action && action.href && (
        <Link
          href={action.href}
          className="mt-8 inline-flex items-center justify-center h-10 px-6 bg-[#0A0A0A] text-white font-sans text-[10px] tracking-[0.18em] uppercase hover:bg-[#1A1A1A] transition-colors duration-200"
        >
          {action.label}
        </Link>
      )}
      {action && !action.href && action.onClick && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-8 inline-flex items-center justify-center h-10 px-6 bg-[#0A0A0A] text-white font-sans text-[10px] tracking-[0.18em] uppercase hover:bg-[#1A1A1A] transition-colors duration-200 cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
