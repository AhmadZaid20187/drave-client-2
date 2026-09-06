import type { Metadata } from 'next'
import { getBestsellers } from '@/lib/products'
import Hero from '@/components/sections/Hero'
import Benefits from '@/components/sections/Benefits'
import Bestsellers from '@/components/sections/Bestsellers'

export const metadata: Metadata = {
  title: 'DRAVE — Built Different. Worn Proud.',
  description: 'Premium streetwear crafted for those who define their own standard. Shop DRAVE — exclusive designs, finest fabrics, timeless silhouettes.',
}

export default async function HomePage() {
  const bestsellers = await getBestsellers()

  return (
    <>
      {/* Hero — full screen, overlapped by transparent navbar */}
      <div className="mt-10"> {/* offset for announcement bar only, navbar is transparent/overlay */}
        <Hero />
      </div>

      {/* Benefits bar */}
      <Benefits />

      {/* Bestsellers */}
      <Bestsellers products={bestsellers} />
    </>
  )
}
