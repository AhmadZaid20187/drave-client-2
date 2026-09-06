'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Award, Zap, ShieldCheck, Globe } from 'lucide-react'

const BENEFITS = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Finest fabrics & craftsmanship',
  },
  {
    icon: Zap,
    title: 'Exclusive Designs',
    description: 'Unique. Limited. Iconic.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: '100% safe & secure',
  },
  {
    icon: Globe,
    title: 'Worldwide Shipping',
    description: 'Fast & reliable worldwide',
  },
]

export default function Benefits() {
  const shouldReduce = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.1,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  }

  return (
    <section
      className="border-t border-b border-[#E5E5E5] bg-white"
      aria-label="Brand benefits"
    >
      <div className="container-drave">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4"
        >
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                whileHover={shouldReduce ? {} : { y: -2 }}
                transition={{ duration: 0.2 }}
                className={`group flex items-center gap-4 py-7 px-6 cursor-default ${
                  i < BENEFITS.length - 1 ? 'lg:border-r border-[#E5E5E5]' : ''
                } ${i === 0 || i === 2 ? 'border-r border-[#E5E5E5] lg:border-r' : ''} ${
                  i < 2 ? 'border-b lg:border-b-0 border-[#E5E5E5]' : ''
                }`}
              >
                {/* Icon */}
                <motion.div
                  whileHover={shouldReduce ? {} : { y: -2, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <Icon className="h-5 w-5 text-[#0A0A0A] group-hover:opacity-70 transition-opacity" strokeWidth={1.5} />
                </motion.div>

                {/* Text */}
                <div>
                  <p className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[#0A0A0A] group-hover:translate-y-[-1px] transition-transform">
                    {benefit.title}
                  </p>
                  <p className="font-sans text-xs text-[#737373] mt-0.5">{benefit.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
