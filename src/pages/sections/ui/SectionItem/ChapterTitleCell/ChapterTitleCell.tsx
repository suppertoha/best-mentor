import { Link } from 'react-router-dom';
import { getChapterPath } from '@/shared/config';
import { bem } from '@/shared/lib/bem';
import type { Chapter } from '../../../model/types';
import styles from '../SectionItem.module.scss';

const si = bem(styles, 'section-item');

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
      <Link to={getChapterPath(chapter.slug)} className={si.el('chapter-title')}>
        {chapter.title}
      </Link>
    );
  }

  return (
    <span className={si.el('chapter-title--locked')} aria-disabled="true" title={lockHint}>
      {chapter.title}
    </span>
  );
};
