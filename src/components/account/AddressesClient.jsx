'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, Plus, X } from 'lucide-react'
import AddressCard from '@/components/account/AddressCard'
import AddressForm from '@/components/account/AddressForm'
import EmptyState from '@/components/account/EmptyState'
import { AddressCardSkeleton } from '@/components/account/DashboardSkeleton'

export default function AddressesClient() {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const fetchAddresses = async () => {
    try {
      const res = await fetch('/api/account/addresses')
      const data = await res.json()
      setAddresses(data.addresses ?? [])
    } catch {
      setErrorMsg('Failed to load addresses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleOpenAdd = () => {
    setEditingAddress(null)
    setErrorMsg('')
    setModalOpen(true)
  }

  const handleOpenEdit = (address) => {
    setEditingAddress(address)
    setErrorMsg('')
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingAddress(null)
  }

  const handleSubmitForm = async (formData) => {
    setErrorMsg('')
    try {
      if (editingAddress) {
        const res = await fetch(`/api/account/addresses/${editingAddress._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('Failed to update address')
      } else {
        const res = await fetch('/api/account/addresses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('Failed to save address')
      }
      handleCloseModal()
      await fetchAddresses()
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong')
    }
  }

  const handleDelete = async (addressId) => {
    if (!confirm('Are you sure you want to remove this address?')) return
    setDeletingId(addressId)
    try {
      const res = await fetch(`/api/account/addresses/${addressId}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete address')
      setAddresses((prev) => prev.filter((a) => a._id !== addressId))
    } catch (err) {
      alert(err.message || 'Failed to delete address')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      {/* Header with Add CTA */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-1">
            Account
          </p>
          <h1 className="font-sans text-xl font-medium text-[#0A0A0A]">Saved Addresses</h1>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 h-10 px-4 bg-[#0A0A0A] text-white font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-[#262626] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Address
        </button>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3 bg-[#FAF0F0] border border-[#F0D0D0] text-[#8A2020] font-sans text-xs">
          {errorMsg}
        </div>
      )}

      {/* Addresses Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AddressCardSkeleton />
          <AddressCardSkeleton />
        </div>
      ) : addresses.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No saved addresses yet."
          description="Save your shipping addresses for a seamless checkout experience."
          action={{ label: 'Add Address', onClick: handleOpenAdd }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onEdit={() => handleOpenEdit(address)}
              onDelete={() => handleDelete(address._id)}
              isDeleting={deletingId === address._id}
            />
          ))}
        </div>
      )}

      {/* Modal for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white p-6 md:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-[#737373] hover:text-[#0A0A0A] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-1">
                {editingAddress ? 'Update' : 'New'}
              </p>
              <h2 className="font-sans text-lg font-medium text-[#0A0A0A]">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h2>
            </div>

            <AddressForm
              initial={editingAddress || {}}
              isEditing={!!editingAddress}
              onSubmit={handleSubmitForm}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  )
}
