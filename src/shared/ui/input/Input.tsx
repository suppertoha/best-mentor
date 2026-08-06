import { forwardRef } from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";
import type { InputProps } from "./types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, className, ...rest }, ref) => {
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={clsx(styles.input, error && styles.inputError, className)}
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

Input.displayName = "Input";
