import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { bem } from "@/shared/lib/bem";
import { Button } from "../button";
import styles from "./Modal.module.scss";

const b = bem(styles, "modal");

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={b.el("overlay")} onClick={onClose} role="presentation">
      <div
        className={b.el("panel")}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={b.el("header")}>
          {title ? <h2 className={b.el("title")}>{title}</h2> : <span />}
          <Button
            variant="ghost"
            className={b.el("close")}
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </Button>
        </div>
        <div className={b.el("body")}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};
