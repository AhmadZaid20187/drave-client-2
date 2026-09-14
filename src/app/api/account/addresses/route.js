import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

// GET /api/account/addresses — list all saved addresses for authenticated user
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  const addresses = await db
    .collection('addresses')
    .find({ userId })
    .sort({ isDefault: -1, createdAt: -1 })
    .toArray()

  return NextResponse.json({
    addresses: addresses.map((a) => ({ ...a, _id: a._id.toString() })),
  })
}

// POST /api/account/addresses — create a new address
export async function POST(request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id
  const body = await request.json()

  const { fullName, phone, address, city, area, postalCode, label, isDefault } = body

  // Basic validation
  if (!fullName?.trim() || !address?.trim() || !city?.trim()) {
    return NextResponse.json({ error: 'Full name, address and city are required' }, { status: 400 })
  }

  // If this is marked as default, unset existing default
  if (isDefault) {
    await db.collection('addresses').updateMany(
      { userId },
      { $set: { isDefault: false } }
    )
  }

  const now = new Date()
  const result = await db.collection('addresses').insertOne({
    userId,
    fullName: fullName.trim(),
    phone: phone?.trim() ?? '',
    address: address.trim(),
    city: city.trim(),
    area: area?.trim() ?? '',
    postalCode: postalCode?.trim() ?? '',
    label: label?.trim() ?? 'Home',
    isDefault: !!isDefault,
    createdAt: now,
    updatedAt: now,
  })

  return NextResponse.json({ id: result.insertedId.toString(), success: true }, { status: 201 })
}
