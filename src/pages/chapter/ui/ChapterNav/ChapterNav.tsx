import { Link } from "react-router-dom";
import { getChapterPath } from "@/shared/config";
import type { Chapter as ChapterListItem } from "@/shared/api";
import styles from "./ChapterNav.module.scss";

interface ChapterNavProps {
  prev: ChapterListItem | null;
  next: ChapterListItem | null;
  currentIndex: number;
  total: number;
  canGoNext?: boolean;
}

const formatChapterLabel = (chapter: ChapterListItem) =>
  chapter.isCompleted ? `${chapter.title} (пройдено)` : chapter.title;

export const ChapterNav = ({
  prev,
  next,
  currentIndex,
  total,
  canGoNext = true,
}: ChapterNavProps) => {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className={styles.root} aria-label="Навигация по главам">
      <div className={styles.row}>
        {prev ? (
          <Link to={getChapterPath(prev.slug)} className={styles.link}>
            ← {formatChapterLabel(prev)}
          </Link>
        ) : (
          <span />
        )}

        {total > 0 && currentIndex >= 0 && (
          <span className={styles.counter}>
            {currentIndex + 1} / {total}
          </span>
        )}

        {next ? (
          canGoNext ? (
            <Link to={getChapterPath(next.slug)} className={`${styles.link} ${styles.linkNext}`}>
              {formatChapterLabel(next)} →
            </Link>
          ) : (
            <span className={`${styles.linkDisabled} ${styles.linkNext}`} aria-disabled="true">
              {formatChapterLabel(next)} →
            </span>
          )
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
};
