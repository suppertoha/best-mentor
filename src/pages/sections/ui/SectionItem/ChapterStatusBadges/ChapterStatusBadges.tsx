import { bem } from '@/shared/lib/bem';
import type { Chapter } from '../../../model/types';
import styles from './ChapterStatusBadges.module.scss';

const b = bem(styles, 'chapter-status-badges');

interface ChapterStatusBadgesProps {
  chapter: Chapter;
  isUnlocked: boolean;
}

export const ChapterStatusBadges = ({ chapter, isUnlocked }: ChapterStatusBadgesProps) => (
  <div className={b.block()}>
    {!isUnlocked && <span className={b.el('badge--locked')}>Заблокировано</span>}
    {chapter.hasQuiz && isUnlocked && <span className={b.el('badge--quiz')}>Тест</span>}
    {chapter.isCompleted && <span className={b.el('badge--completed')}>Пройдено</span>}
  </div>
);
