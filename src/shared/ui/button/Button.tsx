import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from "clsx";
import styles from './Button.module.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'ghost'
export type ButtonSize = 'sm' | 'md'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  showLoader?: boolean
  loadingText?: string
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children?: ReactNode
}

export function Button({
  isLoading = false,
  showLoader = false,
  loadingText,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading
  const label = isLoading && loadingText ? loadingText : children

  return (
    <button
      {...props}
      type={type}
      className={clsx(
        styles.root,
        styles[variant],
        size === 'sm' && styles.sm,
        fullWidth && styles.fullWidth,
        className,
      )}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
    >
      {showLoader && isLoading && (
        <span className={styles.loader} aria-hidden />
      )}
      {label}
    </button>
  )
}
