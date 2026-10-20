import { forwardRef } from 'react';
import clsx from 'clsx';
import { bem } from '@/shared/lib/bem';
import styles from './Textarea.module.scss';
import type { TextareaProps } from './types.ts';

const b = bem(styles, 'textarea');

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, error, className, ...rest }, ref) => {
    return (
      <div className={b.block()}>
        <label className={b.el('label')} htmlFor={id}>
          {label}
        </label>
        <textarea
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

Textarea.displayName = 'Textarea';
