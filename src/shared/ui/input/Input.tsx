import { forwardRef } from 'react';
import clsx from 'clsx';
import { bem } from '@/shared/lib/bem';
import styles from './Input.module.scss';
import type { InputProps } from './types';

const b = bem(styles, 'input');

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, className, ...rest }, ref) => {
    return (
      <div className={b.block()}>
        <label className={b.el('label')} htmlFor={id}>
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={clsx(b.el('field'), error && b.el('field--error'), className)}
          {...rest}
        />
        {error && (
          <p className={b.el('error')} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
