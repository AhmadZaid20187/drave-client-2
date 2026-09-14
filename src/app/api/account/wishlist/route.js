import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

// GET /api/account/wishlist — return all wishlist items for authenticated user
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  const items = await db
    .collection('wishlists')
    .find({ userId })
    .sort({ addedAt: -1 })
    .toArray()

  return NextResponse.json({
    items: items.map((item) => ({ ...item, _id: item._id.toString() })),
  })
}

// POST /api/account/wishlist — add a product to the wishlist
export async function POST(request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id
  const body = await request.json()
  const { slug, name, price, image, category } = body

  if (!slug || !name) {
    return NextResponse.json({ error: 'slug and name are required' }, { status: 400 })
  }

  // Idempotent — don't duplicate
  const existing = await db.collection('wishlists').findOne({ userId, slug })
  if (existing) {
    return NextResponse.json({ success: true, alreadyExists: true })
  }

  await db.collection('wishlists').insertOne({
    userId,
    slug,
    name,
    price: price ?? 0,
    image: image ?? '',
    category: category ?? '',
    addedAt: new Date(),
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
