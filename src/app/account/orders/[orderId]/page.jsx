import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { ObjectId } from 'mongodb'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import OrderStatusBadge from '@/components/account/OrderStatusBadge'
import OrderTimeline from '@/components/account/OrderTimeline'

export async function generateMetadata({ params }) {
  const { orderId } = await params
  return { title: `Order #${orderId.slice(-6).toUpperCase()}` }
}

function formatDate(dateVal) {
  if (!dateVal) return '—'
  return new Date(dateVal).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default async function OrderDetailPage({ params }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/signin')

  const { orderId } = await params
  const userId = session.user.id

  let objectId
  try { objectId = new ObjectId(orderId) }
  catch { notFound() }

  const order = await db.collection('orders').findOne({ _id: objectId })
  if (!order) notFound()
  if (order.userId !== userId) notFound() // Don't reveal that the order exists but belongs to someone else

  const items = await db
    .collection('order_items')
    .find({ orderId: order._id.toString() })
    .toArray()

  const address = order.addressId
    ? await db.collection('addresses').findOne({ _id: new ObjectId(order.addressId) })
    : null

  const subtotal = items.reduce((s, i) => s + (i.price ?? 0) * (i.quantity ?? 1), 0)
  const shipping = order.shipping ?? 0
  const total = order.total ?? subtotal + shipping

  return (
    <div>
      {/* Back link */}
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.15em] uppercase text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors mb-8"
      >
        <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
        All Orders
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
        <div>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-1">
            Order #{order.orderNumber ?? orderId.slice(-6).toUpperCase()}
          </p>
          <h1 className="font-sans text-xl font-medium text-[#0A0A0A]">
            {formatDate(order.createdAt)}
          </h1>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: items + price summary + address */}
        <div className="lg:col-span-2 space-y-8">

          {/* Order Items */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-4">
              Items
            </p>
            <div className="border border-[#E5E5E5] bg-white divide-y divide-[#F0ECE6]">
              {items.map((item, i) => (
                <div key={item._id?.toString() ?? i} className="flex items-start gap-4 p-4">
                  <div className="relative h-20 w-16 flex-shrink-0 bg-[#F5F5F5] overflow-hidden">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name ?? 'Product'}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-[#0A0A0A] truncate">
                      {item.name}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-1">
                      {item.size && (
                        <span className="font-sans text-xs text-[#A3A3A3]">Size: {item.size}</span>
                      )}
                      {item.color && (
                        <span className="font-sans text-xs text-[#A3A3A3]">Color: {item.color}</span>
                      )}
                      <span className="font-sans text-xs text-[#A3A3A3]">Qty: {item.quantity ?? 1}</span>
                    </div>
                  </div>
                  <p className="font-sans text-sm font-medium text-[#0A0A0A] flex-shrink-0">
                    ৳{((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-4">
              Price Summary
            </p>
            <div className="border border-[#E5E5E5] bg-white divide-y divide-[#F0ECE6]">
              <PriceLine label="Subtotal" value={subtotal} />
              <PriceLine label="Shipping" value={shipping} />
              <PriceLine label="Total" value={total} bold />
            </div>
          </div>

          {/* Shipping Address */}
          {address && (
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-4">
                Shipping Address
              </p>
              <div className="border border-[#E5E5E5] bg-white p-5 space-y-1">
                <p className="font-sans text-sm font-medium text-[#0A0A0A]">{address.fullName}</p>
                {address.phone && (
                  <p className="font-sans text-sm text-[#737373]">{address.phone}</p>
                )}
                <p className="font-sans text-sm text-[#737373]">{address.address}</p>
                <p className="font-sans text-sm text-[#737373]">
                  {[address.area, address.city, address.postalCode].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Timeline */}
        <div>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-4">
            Order Status
          </p>
          <div className="border border-[#E5E5E5] bg-white p-5">
            <OrderTimeline status={order.status} />
          </div>
        </div>
      </div>
    </div>
  )
}

function PriceLine({ label, value, bold = false }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className={`font-sans text-sm ${bold ? 'font-medium text-[#0A0A0A]' : 'text-[#737373]'}`}>
        {label}
      </span>
      <span className={`font-sans text-sm ${bold ? 'font-medium text-[#0A0A0A]' : 'text-[#737373]'}`}>
        ৳{value.toLocaleString()}
      </span>
    </div>
  )
}
