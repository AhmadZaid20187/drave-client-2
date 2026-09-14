'use client'

import React, { useState } from 'react'

const FIELD_CLASS =
  'w-full h-10 bg-white border border-[#D4D4D4] px-3 font-sans text-sm text-[#0A0A0A] placeholder-[#A3A3A3] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-150'

const LABEL_CLASS =
  'block font-sans text-[10px] tracking-[0.18em] uppercase text-[#737373] mb-1.5'

// AddressForm — used inside the Modal for adding/editing addresses
// initial: pre-filled address data (for edit mode)
// onSubmit: async (data) => void
// onCancel: () => void
// isEditing: bool
export default function AddressForm({ initial = {}, onSubmit, onCancel, isEditing = false }) {
  const [form, setForm] = useState({
    fullName: initial.fullName ?? '',
    phone: initial.phone ?? '',
    address: initial.address ?? '',
    city: initial.city ?? '',
    area: initial.area ?? '',
    postalCode: initial.postalCode ?? '',
    label: initial.label ?? 'Home',
    isDefault: initial.isDefault ?? false,
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Full name is required'
    if (!form.address.trim()) errs.address = 'Address is required'
    if (!form.city.trim()) errs.city = 'City is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit(form)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Label selector */}
      <div>
        <label className={LABEL_CLASS}>Label</label>
        <div className="flex gap-2">
          {['Home', 'Office', 'Other'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setForm((p) => ({ ...p, label: opt }))}
              className={`flex-1 h-9 font-sans text-[10px] tracking-[0.15em] uppercase border transition-colors ${
                form.label === opt
                  ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                  : 'bg-white text-[#737373] border-[#D4D4D4] hover:border-[#0A0A0A]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="addr-fullName" className={LABEL_CLASS}>Full Name</label>
        <input id="addr-fullName" name="fullName" value={form.fullName} onChange={handleChange}
          className={FIELD_CLASS} placeholder="Ahmad Zaid" />
        {errors.fullName && <p className="mt-1 font-sans text-xs text-[#8A2020]">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="addr-phone" className={LABEL_CLASS}>Phone</label>
        <input id="addr-phone" name="phone" value={form.phone} onChange={handleChange}
          className={FIELD_CLASS} placeholder="+880 1XXXXXXXXX" type="tel" />
      </div>

      <div>
        <label htmlFor="addr-address" className={LABEL_CLASS}>Street Address</label>
        <input id="addr-address" name="address" value={form.address} onChange={handleChange}
          className={FIELD_CLASS} placeholder="House / Flat / Road" />
        {errors.address && <p className="mt-1 font-sans text-xs text-[#8A2020]">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="addr-area" className={LABEL_CLASS}>Area / Thana</label>
          <input id="addr-area" name="area" value={form.area} onChange={handleChange}
            className={FIELD_CLASS} placeholder="Gulshan" />
        </div>
        <div>
          <label htmlFor="addr-city" className={LABEL_CLASS}>City</label>
          <input id="addr-city" name="city" value={form.city} onChange={handleChange}
            className={FIELD_CLASS} placeholder="Dhaka" />
          {errors.city && <p className="mt-1 font-sans text-xs text-[#8A2020]">{errors.city}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="addr-postalCode" className={LABEL_CLASS}>Postal Code</label>
        <input id="addr-postalCode" name="postalCode" value={form.postalCode} onChange={handleChange}
          className={FIELD_CLASS} placeholder="1212" />
      </div>

      {/* Set as default */}
      <label className="flex items-center gap-2.5 cursor-pointer">
        <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={handleChange}
          className="h-3.5 w-3.5 accent-[#0A0A0A]" />
        <span className="font-sans text-xs text-[#737373]">Set as default address</span>
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 h-10 bg-[#0A0A0A] text-white font-sans text-[10px] tracking-[0.18em] uppercase hover:bg-[#1A1A1A] disabled:opacity-60 transition-colors duration-200"
        >
          {submitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Address'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 h-10 border border-[#D4D4D4] font-sans text-[10px] tracking-[0.18em] uppercase text-[#737373] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
