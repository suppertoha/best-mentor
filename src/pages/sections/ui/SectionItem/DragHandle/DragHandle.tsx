import type { HTMLAttributes } from "react";
import clsx from "clsx";
import GripIcon from "@/shared/assets/icons/grip.svg?react";
import { Button } from "@/shared/ui";
import styles from "./DragHandle.module.scss";

type DragHandleProps = HTMLAttributes<HTMLButtonElement>;

export const DragHandle = ({ className, ...props }: DragHandleProps) => (
  <Button
    variant="ghost"
    type="button"
    className={clsx(styles.handle, className)}
    aria-label="Переместить"
    {...props}
  >
    <GripIcon aria-hidden />
  </Button>
);
