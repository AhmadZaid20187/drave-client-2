import { getCollections } from '@/lib/products'
import CollectionCard from '@/components/collections/CollectionCard'

export const metadata = {
  title: 'Collections',
  description: 'Explore DRAVE collections — Essentials, Summer 2026, DRAVE Black, and Limited Edition.',
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="pt-[112px] min-h-screen bg-white">
      <div className="container-drave py-10 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#A3A3A3] mb-2">DRAVE</p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-[#0A0A0A]">Collections</h1>
        </div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {collections.map((collection, i) => (
            <CollectionCard key={collection.id} collection={collection} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
