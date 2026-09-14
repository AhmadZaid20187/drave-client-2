'use client'

import React from 'react'
import { MapPin, Pencil, Trash2 } from 'lucide-react'

// AddressCard — shows a saved address with Edit/Delete actions
// address: address object from MongoDB
// onEdit: () => void
// onDelete: () => void
// isDeleting: bool
export default function AddressCard({ address, onEdit, onDelete, isDeleting }) {
  return (
    <div className={`relative border border-[#E5E5E5] bg-white p-5 transition-opacity ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Label + Default badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#A3A3A3]">
          {address.label ?? 'Address'}
        </span>
        {address.isDefault && (
          <span className="font-sans text-[8px] tracking-[0.18em] uppercase px-2 py-0.5 bg-[#0A0A0A] text-white">
            Default
          </span>
        )}
      </div>

      {/* Address details */}
      <div className="space-y-0.5">
        <p className="font-sans text-sm font-medium text-[#0A0A0A]">{address.fullName}</p>
        {address.phone && (
          <p className="font-sans text-sm text-[#737373]">{address.phone}</p>
        )}
        <p className="font-sans text-sm text-[#737373]">{address.address}</p>
        <p className="font-sans text-sm text-[#737373]">
          {[address.area, address.city, address.postalCode].filter(Boolean).join(', ')}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#F0ECE6]">
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors"
          aria-label="Edit address"
        >
          <Pencil className="h-3 w-3" strokeWidth={1.5} />
          Edit
        </button>
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase text-[#A3A3A3] hover:text-[#8A2020] transition-colors"
          aria-label="Delete address"
        >
          <Trash2 className="h-3 w-3" strokeWidth={1.5} />
          Delete
        </button>
      </div>
    </div>
  )
}
