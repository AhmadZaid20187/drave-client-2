import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

// DELETE /api/account/wishlist/[productSlug] — remove a product from the wishlist
export async function DELETE(request, { params }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { productSlug } = await params
  const userId = session.user.id

  const result = await db
    .collection('wishlists')
    .deleteOne({ userId, slug: productSlug })

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
