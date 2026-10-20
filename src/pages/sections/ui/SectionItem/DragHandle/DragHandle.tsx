import type { HTMLAttributes } from 'react';
import clsx from 'clsx';
import GripIcon from '@/shared/assets/icons/grip.svg?react';
import { bem } from '@/shared/lib/bem';
import { Button } from '@/shared/ui';
import styles from './DragHandle.module.scss';

const b = bem(styles, 'drag-handle');

type DragHandleProps = HTMLAttributes<HTMLButtonElement>;

export const DragHandle = ({ className, ...props }: DragHandleProps) => (
  <Button
    variant="ghost"
    type="button"
    className={clsx(b.block(), className)}
    aria-label="Переместить"
    {...props}
  >
    <GripIcon aria-hidden />
  </Button>
);
