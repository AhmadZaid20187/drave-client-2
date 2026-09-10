'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import AuthLayout from '@/components/auth/AuthLayout'
import AuthHeader from '@/components/auth/AuthHeader'
import AuthInput from '@/components/auth/AuthInput'
import PasswordInput from '@/components/auth/PasswordInput'
import GoogleButton from '@/components/auth/GoogleButton'
import AuthDivider from '@/components/auth/AuthDivider'
import { authClient } from '@/lib/auth-client' // <-- your Better Auth client

export default function SignInPage() {
  const shouldReduce = useReducedMotion()
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // ---- Changed: real Better Auth call instead of setTimeout ----
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatusMessage(null)

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    const { data, error } = await authClient.signIn.email({
      email: formData.email.trim(),
      password: formData.password,
    })

    setIsSubmitting(false)

    if (error) {
      setStatusMessage({
        type: 'error',
        text: error.message || 'Invalid email or password.',
      })
      return
    }

    setStatusMessage({
      type: 'success',
      text: 'Welcome back to DRAVE. Redirecting to your account...',
    })

    router.push('/dashboard')
  }

  // ---- Changed: real Google OAuth call (only if provider is configured server-side) ----
  const handleGoogleSignIn = async () => {
    setStatusMessage({
      type: 'info',
      text: 'Connecting with Google authentication...',
    })

    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    })
  }

  // ---- Changed: real password-reset email instead of just flipping local state ----
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault()
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      return
    }

    const { error } = await authClient.forgetPassword({
      email: forgotEmail,
      redirectTo: '/reset-password',
    })

    if (error) {
      // Still show the generic message below — don't leak whether the email exists
      console.error(error)
    }

    setForgotSent(true)
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: custom * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="WELCOME BACK"
        subtitle="Sign in to continue to your DRAVE account."
      />

      {statusMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-3.5 text-xs tracking-wide text-center ${statusMessage.type === 'success'
              ? 'bg-[#F4F1EA] text-[#0A0A0A] border border-[#DCD6CA]'
              : statusMessage.type === 'error'
                ? 'bg-[#FBEAEA] text-[#7A1F1F] border border-[#F1C6C6]'
                : 'bg-[#F5F5F5] text-[#525252] border border-[#E5E5E5]'
            }`}
        >
          {statusMessage.text}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <motion.div
          custom={1}
          variants={itemVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
        >
          <AuthInput
            label="EMAIL"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="username"
            inputMode="email"
            enterKeyHint="next"
            required
            disabled={isSubmitting}
          />
        </motion.div>

        <motion.div
          custom={2}
          variants={itemVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
        >
          <PasswordInput
            label="PASSWORD"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
            enterKeyHint="done"
            required
            disabled={isSubmitting}
          />
        </motion.div>

        <motion.div
          custom={3}
          variants={itemVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
          className="pt-2"
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex h-12 w-full items-center justify-center bg-[#0A0A0A] px-6 text-white font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 hover:bg-[#1C1C1C] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0A0A0A] shadow-xs"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 animate-spin border border-white border-t-transparent rounded-full" />
                SIGNING IN...
              </span>
            ) : (
              'SIGN IN'
            )}
          </button>
        </motion.div>

        <motion.div
          custom={4}
          variants={itemVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
          className="text-center pt-1"
        >
          <button
            type="button"
            onClick={() => setForgotPasswordOpen(!forgotPasswordOpen)}
            className="font-sans text-xs text-[#737373] hover:text-[#0A0A0A] transition-colors duration-150 underline-offset-4 hover:underline focus-visible:outline-none"
          >
            Forgot password?
          </button>
        </motion.div>

        {forgotPasswordOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 pb-1 border-t border-[#F0ECE1] text-left"
          >
            {forgotSent ? (
              <p className="text-xs text-[#525252] leading-relaxed py-2">
                If an account exists with that address, we have sent instructions to reset your password.
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-[11px] text-[#737373]">
                  Enter your email to receive a password reset link.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-10 flex-1 bg-white border border-[#D4D4D4] px-3 text-xs text-[#0A0A0A] focus:border-[#0A0A0A] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleForgotPasswordSubmit}
                    className="h-10 px-4 bg-[#0A0A0A] text-white text-[10px] uppercase tracking-wider font-semibold hover:bg-[#262626] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          custom={5}
          variants={itemVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
        >
          <AuthDivider text="OR" />
        </motion.div>

        <motion.div
          custom={6}
          variants={itemVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
        >
          <GoogleButton onClick={handleGoogleSignIn} disabled={isSubmitting} />
        </motion.div>

        <motion.div
          custom={7}
          variants={itemVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
          className="pt-5 text-center"
        >
          <p className="font-sans text-xs text-[#737373]">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold uppercase tracking-[0.12em] text-[#0A0A0A] hover:opacity-70 transition-opacity duration-150 inline-block ml-1 underline-offset-4 hover:underline"
            >
              CREATE ACCOUNT
            </Link>
          </p>
        </motion.div>
      </form>
    </AuthLayout>
  )
}