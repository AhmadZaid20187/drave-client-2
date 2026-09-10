'use client'

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import AuthInput from './AuthInput'

export default function PasswordInput({
  label = 'PASSWORD',
  id = 'password',
  name = 'password',
  value,
  onChange,
  onBlur,
  placeholder = 'Enter your password',
  error,
  required = false,
  autoComplete = 'current-password',
  enterKeyHint,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const eyeButton = (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      disabled={disabled}
      tabIndex={0}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      className="p-1 text-[#737373] hover:text-[#0A0A0A] transition-colors duration-150 focus-visible:outline-none"
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <Eye className="h-4 w-4" strokeWidth={1.5} />
      )}
    </button>
  )

  return (
    <AuthInput
      label={label}
      id={id}
      name={name}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      error={error}
      required={required}
      autoComplete={autoComplete}
      enterKeyHint={enterKeyHint}
      disabled={disabled}
      rightElement={eyeButton}
    />
  )
}
