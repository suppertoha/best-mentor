import { forwardRef } from "react";
import clsx from "clsx";
import styles from "./Textarea.module.scss";
import type { TextareaProps } from "./types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, error, className, ...rest }, ref) => {
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <textarea
          ref={ref}
          id={id}
          className={clsx(styles.textarea, error && styles.textareaError, className)}
          {...rest}
        />
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
