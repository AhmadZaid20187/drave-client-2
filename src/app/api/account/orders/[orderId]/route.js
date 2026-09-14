import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import { ObjectId } from 'mongodb'

// GET /api/account/orders/[orderId] — single order detail
export async function GET(request, { params }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { orderId } = await params
  const userId = session.user.id

  let objectId
  try {
    objectId = new ObjectId(orderId)
  } catch {
    return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 })
  }

  const order = await db.collection('orders').findOne({ _id: objectId })

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  // Security: ensure this order belongs to the authenticated user
  if (order.userId !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const items = await db
    .collection('order_items')
    .find({ orderId: order._id.toString() })
    .toArray()

  return NextResponse.json({
    ...order,
    _id: order._id.toString(),
    items: items.map((item) => ({ ...item, _id: item._id.toString() })),
  })
}
