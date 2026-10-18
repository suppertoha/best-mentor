import PencilIcon from "@/shared/assets/icons/pencil.svg?react";
import TrashIcon from "@/shared/assets/icons/trash.svg?react";
import { getChapterLockState } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { useSortableItem } from "../../../lib/useSortableItem";
import type { Chapter } from "../../../model/types";
import { DragHandle } from "../DragHandle";
import { ChapterStatusBadges } from "../ChapterStatusBadges";
import { ChapterTitleCell } from "../ChapterTitleCell";
import styles from "../SectionItem.module.scss";

interface SortableChapterRowProps {
  chapter: Chapter;
  chapters: Chapter[];
  chapterIndex: number;
  bypassLocks?: boolean;
  onEdit?: (chapter: Chapter) => void;
  onDelete?: (chapter: Chapter) => void;
}

export const SortableChapterRow = ({
  chapter,
  chapters,
  chapterIndex,
  bypassLocks = false,
  onEdit,
  onDelete,
}: SortableChapterRowProps) => {
  const { ref, style, handleProps } = useSortableItem(chapter.id);
  const { isUnlocked } = getChapterLockState(chapters, chapterIndex, bypassLocks);

  return (
    <li ref={ref} style={style} className={styles.chapterRow}>
      <div className={styles.chapterMain}>
        <DragHandle
          className={styles.chapterDragHandle}
          onClick={(event) => event.stopPropagation()}
          {...handleProps}
        />
        <ChapterTitleCell
          chapter={chapter}
          isUnlocked={isUnlocked}
          bypassLocks={bypassLocks}
        />
        <ChapterStatusBadges chapter={chapter} isUnlocked={isUnlocked} />
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
