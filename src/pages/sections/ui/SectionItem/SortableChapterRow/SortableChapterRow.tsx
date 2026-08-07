import { Link } from "react-router-dom";
import PencilIcon from "@/shared/assets/icons/pencil.svg?react";
import TrashIcon from "@/shared/assets/icons/trash.svg?react";
import { getChapterPath } from "@/shared/config";
import { Button } from "@/shared/ui";
import { useSortableItem } from "../../../lib/useSortableItem";
import type { Chapter } from "../../../model/types";
import { DragHandle } from "../DragHandle";
import styles from "../SectionItem.module.scss";

interface SortableChapterRowProps {
  chapter: Chapter;
  onEdit?: (chapter: Chapter) => void;
  onDelete?: (chapter: Chapter) => void;
}

export const SortableChapterRow = ({ chapter, onEdit, onDelete }: SortableChapterRowProps) => {
  const { ref, style, handleProps } = useSortableItem(chapter.id);

  return (
    <li ref={ref} style={style} className={styles.chapterRow}>
      <div className={styles.chapterMain}>
        <DragHandle
          className={styles.chapterDragHandle}
          onClick={(event) => event.stopPropagation()}
          {...handleProps}
        />
        <Link to={getChapterPath(chapter.slug)} className={styles.chapterTitle}>
          {chapter.title}
        </Link>
      </div>
      <div className={styles.chapterActions}>
        <Button
          variant="ghost"
          className={styles.chapterEditBtn}
          type="button"
          aria-label={`Редактировать главу «${chapter.title}»`}
          onClick={() => onEdit?.(chapter)}
        >
          <PencilIcon />
        </Button>
        <Button
          variant="ghost"
          className={styles.chapterDeleteBtn}
          type="button"
          aria-label={`Удалить главу «${chapter.title}»`}
          onClick={() => onDelete?.(chapter)}
        >
          <TrashIcon />
        </Button>
      </div>
    </li>
  );
};
