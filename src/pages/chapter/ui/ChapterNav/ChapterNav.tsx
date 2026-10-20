import { Link } from 'react-router-dom';
import { getChapterPath } from '@/shared/config';
import type { Chapter as ChapterListItem } from '@/shared/api';
import { bem } from '@/shared/lib/bem';
import styles from './ChapterNav.module.scss';

const b = bem(styles, 'chapter-nav');

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
    <nav className={b.block()} aria-label="Навигация по главам">
      <div className={b.el('row')}>
        {prev ? (
          <Link to={getChapterPath(prev.slug)} className={b.el('link')}>
            ← {formatChapterLabel(prev)}
          </Link>
        ) : (
          <span />
        )}

        {total > 0 && currentIndex >= 0 && (
          <span className={b.el('counter')}>
            {currentIndex + 1} / {total}
          </span>
        )}

        {next ? (
          canGoNext ? (
            <Link to={getChapterPath(next.slug)} className={`${b.el('link')} ${b.el('link-next')}`}>
              {formatChapterLabel(next)} →
            </Link>
          ) : (
            <span className={`${b.el('link-disabled')} ${b.el('link-next')}`} aria-disabled="true">
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
