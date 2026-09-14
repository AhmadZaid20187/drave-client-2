import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import SettingsClient from '@/components/account/SettingsClient'

export const metadata = {
  title: 'Settings',
  description: 'Manage your DRAVE account settings and preferences.',
}

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/signin')

  return <SettingsClient user={session.user} />
}
