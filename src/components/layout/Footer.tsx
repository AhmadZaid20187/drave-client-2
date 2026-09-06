'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function InstagramIcon({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function YoutubeIcon({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  )
}

const SHOP_LINKS = [
  { label: 'All Products', href: '/shop' },
  { label: 'T-Shirts', href: '/shop?category=T-Shirts' },
  { label: 'Hoodies', href: '/shop?category=Hoodies' },
  { label: 'Jackets', href: '/shop?category=Jackets' },
  { label: 'Joggers', href: '/shop?category=Joggers' },
  { label: 'Accessories', href: '/shop?category=Accessories' },
]

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Journal', href: '/journal' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

const HELP_LINKS = [
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Returns & Exchanges', href: '/returns' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Track Order', href: '/track' },
]

const PAYMENT_ICONS = ['VISA', 'Mastercard', 'bKash', 'Nagad']

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="font-sans text-sm text-[#A3A3A3] hover:text-white transition-colors duration-300 animated-underline inline-block"
      >
        {label}
      </Link>
    </li>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const shouldReduce = useReducedMotion()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduce ? 0 : 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <footer className="bg-[#0A0A0A] text-white" role="contentinfo">
      <div className="container-drave pt-16 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/10"
        >
          {/* Brand column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" aria-label="DRAVE">
              <Image
                src="/logo.png"
                alt="DRAVE"
                width={96}
                height={47}
                className="h-8 w-auto object-contain brightness-0 invert mb-6"
              />
            </Link>
            <p className="font-sans text-sm text-[#A3A3A3] leading-relaxed max-w-xs mb-8">
              More than clothing. It&apos;s a statement of individuality, crafted to inspire confidence.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: InstagramIcon, label: 'Instagram', href: '#' },
                { icon: FacebookIcon, label: 'Facebook', href: '#' },
                { icon: YoutubeIcon, label: 'YouTube', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={shouldReduce ? {} : { y: -2, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#737373] hover:text-white transition-colors duration-300"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Shop */}
          <motion.div variants={itemVariants}>
            <h3 className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-white mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {SHOP_LINKS.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-white mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>
          </motion.div>

          {/* Help + Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-white mb-5">
              Help
            </h3>
            <ul className="space-y-3 mb-10">
              {HELP_LINKS.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <h3 className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-white mb-2">
                Stay in the Loop
              </h3>
              <p className="font-sans text-xs text-[#737373] mb-4">
                Exclusive drops. Early access. Just for you.
              </p>

              {subscribed ? (
                <p className="font-sans text-xs text-[#A3A3A3]">
                  ✓ You&apos;re on the list.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex border border-white/20">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    aria-label="Email for newsletter"
                    className="flex-1 bg-transparent px-4 py-3 text-xs text-white placeholder-[#525252] focus:outline-none min-w-0"
                  />
                  <motion.button
                    type="submit"
                    whileHover={shouldReduce ? {} : { x: 2 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 text-white/70 hover:text-white transition-colors border-l border-white/20 focus-visible:outline-none"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] text-[#525252] tracking-wider">
            © 2026 DRAVE. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {PAYMENT_ICONS.map((icon) => (
              <span key={icon} className="font-sans text-[10px] text-[#525252] tracking-widest uppercase">
                {icon}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-sans text-[11px] text-[#525252] hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-sans text-[11px] text-[#525252] hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/faq" className="font-sans text-[11px] text-[#525252] hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
