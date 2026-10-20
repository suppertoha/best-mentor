import { bem } from '@/shared/lib/bem';
import { Button } from '../button';
import { Modal } from '../modal';
import styles from './ConfirmDialog.module.scss';

const b = bem(styles, 'confirm-dialog');

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Удалить',
  cancelLabel = 'Отмена',
  onConfirm,
  onClose,
  isLoading = false,
}: ConfirmDialogProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <p className={b.el('message')}>{message}</p>
    <div className={b.el('actions')}>
      <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
        {cancelLabel}
      </Button>
      <Button
        type="button"
        onClick={onConfirm}
        isLoading={isLoading}
        showLoader
        loadingText="Удаление..."
      >
        {confirmLabel}
      </Button>
    </div>
  </Modal>
);
