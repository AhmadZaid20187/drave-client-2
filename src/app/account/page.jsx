import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, Heart } from 'lucide-react'
import OrderCard from '@/components/account/OrderCard'
import WishlistCard from '@/components/account/WishlistCard'
import EmptyState from '@/components/account/EmptyState'

export const metadata = {
  title: 'Overview',
  description: 'Your DRAVE account overview.',
}

function formatMemberSince(dateVal) {
  if (!dateVal) return '—'
  return new Date(dateVal).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

export default async function AccountOverviewPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/signin')

  const userId = session.user.id

  // Fetch orders (most recent 3 for preview)
  const orders = await db
    .collection('orders')
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(3)
    .toArray()

  // Attach items to each order
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const items = await db
        .collection('order_items')
        .find({ orderId: order._id.toString() })
        .toArray()
      return {
        ...order,
        _id: order._id.toString(),
        createdAt: order.createdAt?.toISOString?.() ?? order.createdAt,
        items: items.map((i) => ({ ...i, _id: i._id.toString() })),
      }
    })
  )

  // Total order count
  const totalOrders = await db.collection('orders').countDocuments({ userId })

  // Wishlist preview (up to 4 items)
  const wishlistItems = await db
    .collection('wishlists')
    .find({ userId })
    .sort({ addedAt: -1 })
    .limit(4)
    .toArray()
  const wishlistCount = await db.collection('wishlists').countDocuments({ userId })

  // Extended profile
  const profile = await db.collection('user_profiles').findOne({ userId })
  const user = session.user

  return (
    <div className="space-y-14">
      {/* Welcome */}
      <div>
        <h1 className="font-sans text-2xl font-medium text-[#0A0A0A] mb-1">
          Welcome back, {user.name?.split(' ')[0] ?? 'there'}.
        </h1>
        <p className="font-sans text-sm text-[#A3A3A3]">
          Manage your DRAVE account and keep track of your orders.
        </p>
      </div>

      {/* Stats */}
      <div>
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-4">
          Account Overview
        </p>
        <div className="grid grid-cols-3 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
          <StatCard label="Total Orders" value={totalOrders} />
          <StatCard label="Wishlist" value={wishlistCount} />
          <StatCard label="Status" value="Active" isText />
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3]">
            Recent Orders
          </p>
          {totalOrders > 0 && (
            <Link
              href="/account/orders"
              className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors animated-underline"
            >
              View All
            </Link>
          )}
        </div>

        {ordersWithItems.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No orders yet."
            description="Your next DRAVE piece is waiting."
            action={{ label: 'Shop Collection', href: '/shop' }}
          />
        ) : (
          <div>
            {ordersWithItems.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>

      {/* Wishlist Preview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3]">
            Wishlist
          </p>
          {wishlistCount > 0 && (
            <Link
              href="/account/wishlist"
              className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors animated-underline"
            >
              View All
            </Link>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty."
            description="Save pieces you love and come back to them later."
            action={{ label: 'Explore Collection', href: '/shop' }}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {wishlistItems.map((item) => (
              <WishlistCard
                key={item._id.toString()}
                item={{ ...item, _id: item._id.toString() }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Account Info */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3]">
            Account Information
          </p>
          <Link
            href="/account/profile"
            className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors animated-underline"
          >
            Edit Profile
          </Link>
        </div>

        <div className="border border-[#E5E5E5] bg-white divide-y divide-[#F0ECE6]">
          <InfoRow label="Name" value={user.name ?? '—'} />
          <InfoRow label="Email" value={user.email ?? '—'} />
          <InfoRow label="Phone" value={profile?.phone || '—'} />
          <InfoRow label="Member Since" value={formatMemberSince(user.createdAt)} />
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, isText = false }) {
  return (
    <div className="bg-white px-6 py-5">
      <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-2">{label}</p>
      <p className={`font-sans font-medium text-[#0A0A0A] ${isText ? 'text-sm' : 'text-2xl'}`}>
        {value}
      </p>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center px-5 py-3.5 gap-6">
      <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#A3A3A3] w-24 flex-shrink-0">
        {label}
      </span>
      <span className="font-sans text-sm text-[#0A0A0A]">{value}</span>
    </div>
  )
}
