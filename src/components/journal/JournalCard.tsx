'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { JournalArticle } from '@/lib/types'

interface JournalCardProps {
  article: JournalArticle
  index?: number
}

export default function JournalCard({ article, index = 0 }: JournalCardProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.article
      initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: shouldReduce ? 0 : index * 0.1 }}
    >
      <Link href={`/journal/${article.slug}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F5F5] mb-5">
          <motion.div
            className="absolute inset-0"
            whileHover={shouldReduce ? {} : { scale: 1.04 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#A3A3A3]">
            {article.category}
          </span>
          <span className="text-[#D4D4D4]">—</span>
          <span className="font-sans text-[10px] text-[#A3A3A3]">{article.readTime}</span>
        </div>

        {/* Title */}
        <motion.h3
          whileHover={shouldReduce ? {} : { x: 2 }}
          transition={{ duration: 0.2 }}
          className="font-serif text-xl font-medium text-[#0A0A0A] leading-snug mb-2 group-hover:opacity-70 transition-opacity"
        >
          {article.title}
        </motion.h3>

        {/* Excerpt */}
        <p className="font-sans text-sm text-[#737373] leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Read link */}
        <span className="flex items-center gap-2 font-sans text-[11px] tracking-[0.15em] uppercase text-[#0A0A0A] group-hover:gap-3 transition-all duration-300">
          Read Article
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
      </Link>
    </motion.article>
  )
}
