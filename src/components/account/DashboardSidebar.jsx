'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, Heart, User, MapPin, Settings, LogOut } from 'lucide-react'
import { signOut } from '@/lib/auth-client'

const NAV_ITEMS = [
  { label: 'Overview', href: '/account', icon: LayoutDashboard },
  { label: 'Orders', href: '/account/orders', icon: Package },
  { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { label: 'Profile', href: '/account/profile', icon: User },
  { label: 'Addresses', href: '/account/addresses', icon: MapPin },
  { label: 'Settings', href: '/account/settings', icon: Settings },
]

export default function DashboardSidebar({ user }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/signin')
  }

  const isActive = (href) => {
    if (href === '/account') return pathname === '/account'
    return pathname.startsWith(href)
  }

  return (
    <nav className="flex flex-col h-full" aria-label="Account navigation">
      {/* User identity */}
      <div className="pb-8 mb-8 border-b border-[#E5E5E5]">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-1">
          Account
        </p>
        <p className="font-sans text-sm font-medium text-[#0A0A0A] truncate">
          {user?.name || 'My Account'}
        </p>
      </div>

      {/* Navigation links */}
      <ul className="space-y-0.5 flex-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = isActive(href)
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 font-sans text-xs tracking-[0.12em] uppercase transition-all duration-150 ${
                  active
                    ? 'text-[#0A0A0A] bg-[#F4F1EA]'
                    : 'text-[#737373] hover:text-[#0A0A0A] hover:bg-[#F9F7F4]'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={active ? 2 : 1.5} />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Sign out */}
      <div className="pt-8 mt-8 border-t border-[#E5E5E5]">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 w-full font-sans text-xs tracking-[0.12em] uppercase text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors duration-150"
          aria-label="Sign out"
        >
          <LogOut className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </nav>
  )
}
