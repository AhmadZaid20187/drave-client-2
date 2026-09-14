import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

// GET /api/account/profile — returns the current user's profile
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  // Fetch core user data from Better Auth's users collection
  const user = await db.collection('user').findOne(
    { id: userId },
    { projection: { id: 1, name: 1, email: 1, createdAt: 1, image: 1 } }
  )

  // Fetch extended profile (phone etc.) from user_profiles collection
  const profile = await db.collection('user_profiles').findOne({ userId })

  return NextResponse.json({
    id: user?.id ?? userId,
    name: user?.name ?? '',
    email: user?.email ?? '',
    createdAt: user?.createdAt ?? null,
    image: user?.image ?? null,
    phone: profile?.phone ?? '',
  })
}

// PATCH /api/account/profile — update name and/or phone
export async function PATCH(request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id
  const body = await request.json()

  const name = typeof body.name === 'string' ? body.name.trim() : undefined
  const phone = typeof body.phone === 'string' ? body.phone.trim() : undefined

  // Validate
  if (name !== undefined && name.length < 2) {
    return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 })
  }

  // Update name in Better Auth users collection if provided
  if (name !== undefined) {
    await db.collection('user').updateOne({ id: userId }, { $set: { name } })
  }

  // Upsert phone in user_profiles collection
  if (phone !== undefined) {
    await db.collection('user_profiles').updateOne(
      { userId },
      { $set: { userId, phone, updatedAt: new Date() } },
      { upsert: true }
    )
  }

  return NextResponse.json({ success: true })
}
