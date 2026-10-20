import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { bem } from '@/shared/lib/bem';
import styles from './Button.module.scss';

const b = bem(styles, 'button');

export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'ghost';
export type ButtonSize = 'sm' | 'md';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  showLoader?: boolean;
  loadingText?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

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
  const isDisabled = disabled || isLoading;
  const label = isLoading && loadingText ? loadingText : children;
  const loaderTone = variant === 'secondary' || variant === 'link' ? 'secondary' : 'primary';

  return (
    <button
      {...props}
      type={type}
      className={clsx(
        b.block(),
        b.mod(variant),
        size === 'sm' && b.mod('sm'),
        fullWidth && b.mod('full'),
        className,
      )}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
    >
      {showLoader && isLoading && (
        <span className={clsx(b.el('loader'), b.el(`loader--${loaderTone}`))} aria-hidden />
      )}
      {label}
    </button>
  );
}
