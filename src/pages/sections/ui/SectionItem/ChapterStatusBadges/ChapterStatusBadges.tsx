import type { Chapter } from "../../../model/types";
import styles from "./ChapterStatusBadges.module.scss";

interface ChapterStatusBadgesProps {
  chapter: Chapter;
  isUnlocked?: boolean;
}

export const ChapterStatusBadges = ({
  chapter,
  isUnlocked = true,
}: ChapterStatusBadgesProps) => (
  <div className={styles.root}>
    {!isUnlocked && !chapter.isCompleted && (
      <span className={styles.lockedBadge}>Заблокировано</span>
    )}
    {isUnlocked && chapter.hasQuiz && !chapter.isCompleted && (
      <span className={styles.quizBadge}>Тест</span>
    )}
    {chapter.isCompleted && <span className={styles.completedBadge}>Пройдено</span>}
  </div>
);
