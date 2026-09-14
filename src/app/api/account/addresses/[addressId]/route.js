import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import { ObjectId } from 'mongodb'

// PATCH /api/account/addresses/[addressId] — update an address
export async function PATCH(request, { params }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { addressId } = await params
  const userId = session.user.id

  let objectId
  try {
    objectId = new ObjectId(addressId)
  } catch {
    return NextResponse.json({ error: 'Invalid address ID' }, { status: 400 })
  }

  const existing = await db.collection('addresses').findOne({ _id: objectId })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (existing.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await request.json()
  const { fullName, phone, address, city, area, postalCode, label, isDefault } = body

  // If marking as default, clear other defaults first
  if (isDefault) {
    await db.collection('addresses').updateMany(
      { userId, _id: { $ne: objectId } },
      { $set: { isDefault: false } }
    )
  }

  const updateFields = {
    updatedAt: new Date(),
    ...(fullName !== undefined && { fullName: fullName.trim() }),
    ...(phone !== undefined && { phone: phone.trim() }),
    ...(address !== undefined && { address: address.trim() }),
    ...(city !== undefined && { city: city.trim() }),
    ...(area !== undefined && { area: area.trim() }),
    ...(postalCode !== undefined && { postalCode: postalCode.trim() }),
    ...(label !== undefined && { label: label.trim() }),
    ...(isDefault !== undefined && { isDefault: !!isDefault }),
  }

  await db.collection('addresses').updateOne({ _id: objectId }, { $set: updateFields })

  return NextResponse.json({ success: true })
}

// DELETE /api/account/addresses/[addressId] — remove an address
export async function DELETE(request, { params }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { addressId } = await params
  const userId = session.user.id

  let objectId
  try {
    objectId = new ObjectId(addressId)
  } catch {
    return NextResponse.json({ error: 'Invalid address ID' }, { status: 400 })
  }

  const existing = await db.collection('addresses').findOne({ _id: objectId })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (existing.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  await db.collection('addresses').deleteOne({ _id: objectId })

  return NextResponse.json({ success: true })
}
