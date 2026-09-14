'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Bell, User, LogOut, ArrowRight } from 'lucide-react'
import { signOut } from '@/lib/auth-client'

export default function SettingsClient({ user }) {
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newDrops: false,
    promotions: false,
  })

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
      router.push('/signin')
    } catch {
      setSigningOut(false)
    }
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-1">
          Account
        </p>
        <h1 className="font-sans text-xl font-medium text-[#0A0A0A]">Settings</h1>
      </div>

      <div className="space-y-8">
        {/* Profile Card */}
        <div className="p-6 bg-white border border-[#E5E5E5]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0A0A0A] text-white flex items-center justify-center font-sans text-sm font-medium">
                {user?.name?.[0]?.toUpperCase() || 'D'}
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-[#0A0A0A]">{user?.name || 'Customer'}</p>
                <p className="font-sans text-xs text-[#737373]">{user?.email}</p>
              </div>
            </div>
            <Link
              href="/account/profile"
              className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase text-[#0A0A0A] hover:underline"
            >
              Edit Profile
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Security & Authentication */}
        <div className="p-6 bg-white border border-[#E5E5E5]">
          <div className="flex items-center gap-2.5 mb-3">
            <Shield className="w-4 h-4 text-[#0A0A0A]" strokeWidth={1.5} />
            <h2 className="font-sans text-sm font-medium text-[#0A0A0A]">Security & Login</h2>
          </div>
          <p className="font-sans text-xs text-[#737373] leading-relaxed mb-4">
            Your account is secured via DRAVE Identity. Session credentials and encrypted authentication tokens are managed automatically.
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-[#F0ECE6]">
            <div>
              <p className="font-sans text-xs font-medium text-[#0A0A0A]">Email Verification</p>
              <p className="font-sans text-[11px] text-[#A3A3A3]">Verified and secured</p>
            </div>
            <span className="font-sans text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 bg-[#F5F5F5] text-[#737373]">
              Active
            </span>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="p-6 bg-white border border-[#E5E5E5]">
          <div className="flex items-center gap-2.5 mb-4">
            <Bell className="w-4 h-4 text-[#0A0A0A]" strokeWidth={1.5} />
            <h2 className="font-sans text-sm font-medium text-[#0A0A0A]">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-xs font-medium text-[#0A0A0A]">Order Updates</p>
                <p className="font-sans text-[11px] text-[#737373]">Receive tracking alerts and shipping status updates</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('orderUpdates')}
                className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors ${
                  notifications.orderUpdates ? 'bg-[#0A0A0A]' : 'bg-[#D4D4D4]'
                }`}
              >
                <div
                  className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${
                    notifications.orderUpdates ? 'translate-x-4' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#F0ECE6]">
              <div>
                <p className="font-sans text-xs font-medium text-[#0A0A0A]">New Drop Announcements</p>
                <p className="font-sans text-[11px] text-[#737373]">Be the first to know when limited edition capsules release</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('newDrops')}
                className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors ${
                  notifications.newDrops ? 'bg-[#0A0A0A]' : 'bg-[#D4D4D4]'
                }`}
              >
                <div
                  className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${
                    notifications.newDrops ? 'translate-x-4' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Danger / Session Exit */}
        <div className="p-6 bg-white border border-[#E5E5E5]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sans text-sm font-medium text-[#0A0A0A]">Sign Out</p>
              <p className="font-sans text-xs text-[#737373]">Log out of your current session on this device</p>
            </div>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#E5E5E5] font-sans text-[10px] tracking-[0.15em] uppercase text-[#8A2020] hover:border-[#8A2020] hover:bg-[#FAF0F0] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              {signingOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
