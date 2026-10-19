import PencilIcon from "@/shared/assets/icons/pencil.svg?react";
import TrashIcon from "@/shared/assets/icons/trash.svg?react";
import { getChapterLockState } from "@/shared/lib";
import { bem } from "@/shared/lib/bem";
import { Button } from "@/shared/ui";
import { useSortableItem } from "../../../lib/useSortableItem";
import type { Chapter } from "../../../model/types";
import { DragHandle } from "../DragHandle";
import { ChapterStatusBadges } from "../ChapterStatusBadges";
import { ChapterTitleCell } from "../ChapterTitleCell";
import styles from "../SectionItem.module.scss";

const si = bem(styles, "section-item");

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
    <li ref={ref} style={style} className={si.el("chapter-row")}>
      <div className={si.el("chapter-main")}>
        <DragHandle
          className={si.el("chapter-drag-handle")}
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
      <div className={si.el("chapter-actions")}>
        <Button
          variant="ghost"
          className={si.el("chapter-edit-btn")}
          type="button"
          aria-label={`Редактировать главу «${chapter.title}»`}
          onClick={() => onEdit?.(chapter)}
        >
          <PencilIcon />
        </Button>
        <Button
          variant="ghost"
          className={si.el("chapter-delete-btn")}
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
