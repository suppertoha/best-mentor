import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { chaptersService } from '@/shared/api';
import { showSuccessToast } from '@/shared/lib/toast';
import { Button } from '@/shared/ui';
import { bem } from '@/shared/lib/bem';
import styles from './ChapterContentEditor.module.scss';

const b = bem(styles, 'chapter-content-editor');

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface ChapterContentEditorProps {
  chapterId: number;
  initialContent: string;
  onSaved: (content: string) => void;
  onCancel: () => void;
}

export const ChapterContentEditor = ({
  chapterId,
  initialContent,
  onSaved,
  onCancel,
}: ChapterContentEditorProps) => {
  const [draft, setDraft] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await chaptersService.update(chapterId, { content: draft.trim() });
      showSuccessToast('Содержание сохранено');
      onSaved(draft.trim());
    } catch {
      // handled by API interceptor
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={b.block()}>
      <div className={b.el('toolbar')}>
        <Button type="button" variant="secondary" size="sm" onClick={onCancel} disabled={isSaving}>
          Отмена
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={handleSave}
          isLoading={isSaving}
          showLoader
          loadingText="Сохранение..."
        >
          Сохранить
        </Button>
      </div>

      <div className={b.el('editor')} data-color-mode="light">
        <MDEditor
          value={draft}
          onChange={(value) => setDraft(value ?? '')}
          preview="live"
          height={480}
          visibleDragbar={false}
        />
      </div>
    </div>
  );
};
