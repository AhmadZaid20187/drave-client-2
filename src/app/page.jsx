import { getBestsellers } from '@/lib/products'
import Hero from '@/components/sections/Hero'
import Benefits from '@/components/sections/Benefits'
import Bestsellers from '@/components/sections/Bestsellers'

export const metadata = {
  title: 'DRAVE — Built Different. Worn Proud.',
  description: 'Premium streetwear crafted for those who define their own standard. Shop DRAVE — exclusive designs, finest fabrics, timeless silhouettes.',
}

// Home page — loads bestseller products and renders Hero, Benefits, and Bestsellers sections
export default async function HomePage() {
  const bestsellers = await getBestsellers()

  return (
    <>
      {/* Hero — full screen, overlapped by transparent navbar */}
      <div className="mt-10">
        <Hero />
      </div>

      {/* Benefits bar */}
      <Benefits />

      {/* Bestsellers */}
      <Bestsellers products={bestsellers} />
    </>
  )
}
