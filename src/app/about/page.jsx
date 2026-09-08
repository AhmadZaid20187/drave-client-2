'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function SectionReveal({ children, delay = 0 }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function ImageReveal({ src, alt, className }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={shouldReduce ? {} : { clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
    </motion.div>
  )
}

export default function AboutPage() {
  const shouldReduce = useReducedMotion()

  return (
    <div className="pt-[112px] min-h-screen bg-white">
      {/* Hero statement */}
      <section className="py-24 md:py-32 bg-[#0A0A0A]">
        <div className="container-drave">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/40 mb-6">Our Story</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] tracking-tight">
              Built Different.<br />Worn Proud.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-28">
        <div className="container-drave">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#A3A3A3] mb-5">Philosophy</p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#0A0A0A] mb-6 leading-tight">
                Clothing that says something without saying anything.
              </h2>
              <p className="font-sans text-sm text-[#525252] leading-relaxed mb-4">
                DRAVE was founded on a simple belief: the clothes you wear are an extension of who you are. Not a trend. Not a logo to chase. A decision.
              </p>
              <p className="font-sans text-sm text-[#525252] leading-relaxed">
                Every piece we design starts from the question: does this make the person wearing it feel more like themselves? If the answer is yes, we build it. If not, we start again.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <ImageReveal
                src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"
                alt="DRAVE philosophy — premium streetwear"
                className="aspect-[4/5]"
              />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20 md:py-28 bg-[#F5F5F5]">
        <div className="container-drave">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal delay={0.1}>
              <ImageReveal
                src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80"
                alt="DRAVE craftsmanship"
                className="aspect-[4/5]"
              />
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#A3A3A3] mb-5">Craftsmanship</p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#0A0A0A] mb-6 leading-tight">
                No shortcuts. No compromises.
              </h2>
              <p className="font-sans text-sm text-[#525252] leading-relaxed mb-4">
                Each DRAVE piece undergoes rigorous quality control before it ever reaches you. We work with premium fabric mills, use reinforced stitching at every stress point, and pre-wash every garment for immediate comfort.
              </p>
              <p className="font-sans text-sm text-[#525252] leading-relaxed">
                240 GSM. 320 GSM. 360 GSM. Numbers that matter because the weight of a fabric determines how it hangs, how it drapes, and how long it lasts.
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-20 md:py-28">
        <div className="container-drave max-w-3xl">
          <SectionReveal>
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#A3A3A3] mb-5 text-center">Materials</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#0A0A0A] mb-8 leading-tight text-center">
              What goes in determines what comes out.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { title: '100% Premium Cotton', description: 'Combed and ring-spun for exceptional softness and durability.' },
                { title: 'French Terry', description: 'Loopback construction for superior warmth without the bulk.' },
                { title: 'DWR Coating', description: 'Water-resistant treatment that maintains breathability.' },
              ].map((item) => (
                <div key={item.title} className="border-t border-[#E5E5E5] pt-6">
                  <h3 className="font-sans text-sm font-medium text-[#0A0A0A] mb-2">{item.title}</h3>
                  <p className="font-sans text-xs text-[#737373] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container-drave text-center">
          <SectionReveal>
            <p className="font-serif text-3xl md:text-5xl text-white mb-8 leading-tight">
              Ready to wear the standard?
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 border border-white text-white px-10 py-4 font-sans text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300"
            >
              Shop DRAVE <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}
