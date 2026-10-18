import { Link } from "react-router-dom";
import { getChapterPath } from "@/shared/config";
import type { Chapter } from "../../../model/types";
import styles from "../SectionItem.module.scss";

interface ChapterTitleCellProps {
  chapter: Chapter;
  isUnlocked: boolean;
  bypassLocks?: boolean;
  lockHint?: string;
}

export const ChapterTitleCell = ({
  chapter,
  isUnlocked,
  bypassLocks = false,
  lockHint,
}: ChapterTitleCellProps) => {
  const canNavigate = bypassLocks || isUnlocked;

  if (canNavigate) {
    return (
      <Link to={getChapterPath(chapter.slug)} className={styles.chapterTitle}>
        {chapter.title}
      </Link>
    );
  }

  return (
    <span
      className={styles.chapterTitleLocked}
      aria-disabled="true"
      title={lockHint}
    >
      {chapter.title}
    </span>
  );
};
