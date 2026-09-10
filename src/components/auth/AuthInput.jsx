'use client'

import React from 'react'

export default function AuthInput({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  autoComplete,
  inputMode,
  enterKeyHint,
  disabled = false,
  rightElement = null,
}) {
  const hasError = Boolean(error)

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={id}
          className="block font-sans text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#0A0A0A]/85 mb-1.5"
        >
          {label} {required && <span className="text-[#A3A3A3]">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          enterKeyHint={enterKeyHint}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={`h-12 w-full bg-white px-4 text-sm font-sans text-[#0A0A0A] placeholder:text-[#A3A3A3] placeholder:font-light transition-colors duration-200 outline-none ${
            rightElement ? 'pr-11' : ''
          } ${
            hasError
              ? 'border border-[#DC2626] focus:border-[#DC2626]'
              : 'border border-[#D4D4D4] focus:border-[#0A0A0A]'
          } disabled:bg-[#F5F5F5] disabled:cursor-not-allowed`}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>

      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 font-sans text-xs text-[#DC2626] tracking-wide"
        >
          {error}
        </p>
      )}
    </div>
  )
}
