'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AccountPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/signin')
  }, [router])

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0A0A0A] border-t-transparent" />
    </div>
  )
}
