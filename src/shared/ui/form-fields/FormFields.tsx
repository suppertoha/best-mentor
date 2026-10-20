import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import type { HTMLInputTypeAttribute } from 'react';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { bem } from '@/shared/lib/bem';
import styles from './FormFields.module.scss';

const b = bem(styles, 'form-field');

export type FormFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  id: string;
  label: string;
  kind: 'input' | 'textarea';
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  hint?: string;
  autoComplete?: string;
  rows?: number;
};

interface FormFieldsProps<T extends FieldValues> {
  fields: ReadonlyArray<FormFieldConfig<T>>;
  control: Control<T>;
}

export const FormFields = <T extends FieldValues>({ fields, control }: FormFieldsProps<T>) => (
  <>
    {fields.map(({ name, kind, type, rows, hint, ...inputProps }) => (
      <Controller
        key={String(name)}
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div className={b.block()}>
            {kind === 'textarea' ? (
              <Textarea {...field} {...inputProps} rows={rows} error={fieldState.error?.message} />
            ) : (
              <Input
                {...field}
                {...inputProps}
                type={type ?? 'text'}
                error={fieldState.error?.message}
              />
            )}
            {hint && !fieldState.error && <p className={b.el('hint')}>{hint}</p>}
          </div>
        )}
      />
    ))}
  </>
);
