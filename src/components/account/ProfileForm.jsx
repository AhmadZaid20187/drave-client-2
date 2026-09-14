'use client'

import React, { useState } from 'react'

const FIELD_CLASS =
  'w-full h-10 bg-white border border-[#D4D4D4] px-3 font-sans text-sm text-[#0A0A0A] placeholder-[#A3A3A3] focus:border-[#0A0A0A] focus:outline-none transition-colors duration-150 disabled:bg-[#F9F9F9] disabled:cursor-not-allowed'

const LABEL_CLASS =
  'block font-sans text-[10px] tracking-[0.18em] uppercase text-[#737373] mb-1.5'

// ProfileForm — allows editing name and phone; email is read-only
// initialData: { name, email, phone }
// onSave: async (data) => void — callback after successful save
export default function ProfileForm({ initialData }) {
  const [form, setForm] = useState({
    name: initialData?.name ?? '',
    phone: initialData?.phone ?? '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // null | 'saving' | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)
    if (!validate()) return

    setStatus('saving')
    try {
      const res = await fetch('/api/account/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), phone: form.phone.trim() }),
      })

      if (!res.ok) throw new Error('Failed to save')
      setStatus('success')
      setTimeout(() => setStatus(null), 3000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-md">
      {/* Name */}
      <div>
        <label htmlFor="profile-name" className={LABEL_CLASS}>Full Name</label>
        <input
          id="profile-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className={FIELD_CLASS}
          placeholder="Your full name"
          autoComplete="name"
        />
        {errors.name && (
          <p className="mt-1 font-sans text-xs text-[#8A2020]">{errors.name}</p>
        )}
      </div>

      {/* Email — read-only */}
      <div>
        <label htmlFor="profile-email" className={LABEL_CLASS}>
          Email
          <span className="ml-2 text-[#A3A3A3] normal-case tracking-normal font-normal">
            — cannot be changed here
          </span>
        </label>
        <input
          id="profile-email"
          type="email"
          value={initialData?.email ?? ''}
          disabled
          className={FIELD_CLASS}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="profile-phone" className={LABEL_CLASS}>Phone</label>
        <input
          id="profile-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className={FIELD_CLASS}
          placeholder="+880 1XXXXXXXXX"
          autoComplete="tel"
        />
      </div>

      {/* Status feedback */}
      {status === 'success' && (
        <p className="font-sans text-xs text-[#2D6B30] bg-[#EDF5EE] px-3 py-2 border border-[#C8E0C9]">
          ✓ Changes saved successfully.
        </p>
      )}
      {status === 'error' && (
        <p className="font-sans text-xs text-[#8A2020] bg-[#FDF0EF] px-3 py-2 border border-[#F1C6C6]">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'saving'}
        className="h-10 px-6 bg-[#0A0A0A] text-white font-sans text-[10px] tracking-[0.18em] uppercase hover:bg-[#1A1A1A] disabled:opacity-60 transition-colors duration-200"
      >
        {status === 'saving' ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
