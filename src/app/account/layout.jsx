import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/account/DashboardSidebar'
import DashboardMobileNav from '@/components/account/DashboardMobileNav'

export const metadata = {
  title: {
    default: 'My Account',
    template: '%s | My Account | DRAVE',
  },
}

export default async function AccountLayout({ children }) {
  // Server-side session check — redirect immediately if unauthenticated
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect('/signin')
  }

  const user = session.user

  return (
    <div className="pt-[112px] min-h-screen bg-[#FAF8F5]">
      {/* Mobile nav — shown below the site Navbar on small screens */}
      <DashboardMobileNav />

      <div className="container-drave py-10 lg:py-16">
        <div className="flex gap-12 lg:gap-16 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-[220px] flex-shrink-0 sticky top-[140px]">
            <DashboardSidebar user={user} />
          </aside>

          {/* Main content area */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
