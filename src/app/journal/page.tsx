import type { Metadata } from 'next'
import { getJournalArticles } from '@/lib/products'
import JournalCard from '@/components/journal/JournalCard'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'The DRAVE Journal — Stories, style, and the philosophy behind the brand.',
}

export default async function JournalPage() {
  const articles = await getJournalArticles()

  return (
    <div className="pt-[112px] min-h-screen bg-white">
      <div className="container-drave py-10 md:py-16">
        {/* Header */}
        <div className="mb-14">
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#A3A3A3] mb-2">Stories & Perspectives</p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-[#0A0A0A]">Journal</h1>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {articles.map((article, i) => (
            <JournalCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
