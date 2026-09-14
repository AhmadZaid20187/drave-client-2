import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/account/ProfileForm'

export const metadata = {
  title: 'Profile',
  description: 'Edit your DRAVE account profile.',
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/signin')

  const userId = session.user.id

  const profile = await db.collection('user_profiles').findOne({ userId })

  const initialData = {
    name: session.user.name ?? '',
    email: session.user.email ?? '',
    phone: profile?.phone ?? '',
  }

  return (
    <div>
      <div className="mb-10">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-1">
          Account
        </p>
        <h1 className="font-sans text-xl font-medium text-[#0A0A0A]">Profile</h1>
      </div>

      <div className="mb-8 pb-8 border-b border-[#E5E5E5]">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-5">
          Personal Information
        </p>
        <ProfileForm initialData={initialData} />
      </div>

      <div>
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3] mb-3">
          Account Details
        </p>
        <div className="border border-[#E5E5E5] bg-white divide-y divide-[#F0ECE6] max-w-md">
          <InfoRow label="Member Since" value={
            session.user.createdAt
              ? new Date(session.user.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
              : '—'
          } />
          <InfoRow label="Status" value="Active" />
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center px-5 py-3.5 gap-6">
      <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#A3A3A3] w-28 flex-shrink-0">
        {label}
      </span>
      <span className="font-sans text-sm text-[#0A0A0A]">{value}</span>
    </div>
  )
}
