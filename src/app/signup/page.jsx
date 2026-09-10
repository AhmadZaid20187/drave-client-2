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

export default function SignUpPage() {
  const shouldReduce = useReducedMotion()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Please enter a password'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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

    if (name === 'password' && errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }))
    }
  }

  // ---- This is the only function that actually changed ----
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatusMessage(null)

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    const { data, error } = await authClient.signUp.email({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    })

    setIsSubmitting(false)

    if (error) {
      setStatusMessage({
        type: 'error',
        text: error.message || 'Something went wrong. Please try again.',
      })
      return
    }

    setStatusMessage({
      type: 'success',
      text: 'Account created successfully. Welcome to the DRAVE inner circle.',
    })

    // Better Auth signs the user in automatically on signup by default,
    // so you can redirect straight to your app
    router.push('/')
  }

  // ---- This one only if Google OAuth is already configured server-side ----
  const handleGoogleSignUp = async () => {
    setStatusMessage({
      type: 'info',
      text: 'Connecting with Google authentication...',
    })

    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    })
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: custom * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="CREATE YOUR ACCOUNT"
        subtitle="Join DRAVE and stay connected to every drop."
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
            label="FULL NAME"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            autoComplete="name"
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
          <AuthInput
            label="EMAIL"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
            inputMode="email"
            enterKeyHint="next"
            required
            disabled={isSubmitting}
          />
        </motion.div>

        <motion.div
          custom={3}
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
            autoComplete="new-password"
            enterKeyHint="next"
            required
            disabled={isSubmitting}
          />
        </motion.div>

        <motion.div
          custom={4}
          variants={itemVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
        >
          <PasswordInput
            label="CONFIRM PASSWORD"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            autoComplete="new-password"
            enterKeyHint="done"
            required
            disabled={isSubmitting}
          />
        </motion.div>

        <motion.div
          custom={5}
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
                CREATING ACCOUNT...
              </span>
            ) : (
              'CREATE ACCOUNT'
            )}
          </button>
        </motion.div>

        <motion.div
          custom={6}
          variants={itemVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
        >
          <AuthDivider text="OR" />
        </motion.div>

        <motion.div
          custom={7}
          variants={itemVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
        >
          <GoogleButton onClick={handleGoogleSignUp} disabled={isSubmitting} />
        </motion.div>

        <motion.div
          custom={8}
          variants={itemVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
          className="pt-5 text-center"
        >
          <p className="font-sans text-xs text-[#737373]">
            Already have an account?{' '}
            <Link
              href="/signin"
              className="font-semibold uppercase tracking-[0.12em] text-[#0A0A0A] hover:opacity-70 transition-opacity duration-150 inline-block ml-1 underline-offset-4 hover:underline"
            >
              SIGN IN
            </Link>
          </p>
        </motion.div>
      </form>
    </AuthLayout>
  )
}