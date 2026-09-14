'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Heart, User, MapPin, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Overview', href: '/account', icon: LayoutDashboard },
  { label: 'Orders', href: '/account/orders', icon: Package },
  { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { label: 'Profile', href: '/account/profile', icon: User },
  { label: 'Addresses', href: '/account/addresses', icon: MapPin },
  { label: 'Settings', href: '/account/settings', icon: Settings },
]

export default function DashboardMobileNav() {
  const pathname = usePathname()

  const isActive = (href) => {
    if (href === '/account') return pathname === '/account'
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="lg:hidden border-b border-[#E5E5E5] bg-white sticky top-[72px] z-30"
      aria-label="Account mobile navigation"
    >
      <div className="container-drave">
        <div className="flex overflow-x-auto scrollbar-none -mx-0 gap-0">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-3.5 font-sans text-[10px] tracking-[0.15em] uppercase border-b-[1.5px] transition-all duration-150 whitespace-nowrap ${
                  active
                    ? 'text-[#0A0A0A] border-[#0A0A0A]'
                    : 'text-[#A3A3A3] border-transparent hover:text-[#0A0A0A]'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="h-3 w-3 flex-shrink-0" strokeWidth={active ? 2 : 1.5} />
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
