import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

// GET /api/account/orders — list all orders for the authenticated user
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  const orders = await db
    .collection('orders')
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray()

  // For each order, fetch its items
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const items = await db
        .collection('order_items')
        .find({ orderId: order._id.toString() })
        .toArray()
      return { ...order, _id: order._id.toString(), items }
    })
  )

  return NextResponse.json({ orders: ordersWithItems })
}
