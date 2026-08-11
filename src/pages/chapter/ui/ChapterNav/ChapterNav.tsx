import { Link } from "react-router-dom";
import { getChapterPath } from "@/shared/config";
import type { Chapter as ChapterListItem } from "@/shared/api";
import styles from "./ChapterNav.module.scss";

interface ChapterNavProps {
  prev: ChapterListItem | null;
  next: ChapterListItem | null;
  currentIndex: number;
  total: number;
}

export const ChapterNav = ({ prev, next, currentIndex, total }: ChapterNavProps) => {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className={styles.root} aria-label="Навигация по главам">
      {prev ? (
        <Link to={getChapterPath(prev.slug)} className={styles.link}>
          ← {prev.title}
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
        <Link to={getChapterPath(next.slug)} className={`${styles.link} ${styles.linkNext}`}>
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
};
