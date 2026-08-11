import type { Chapter } from "../../../model/types";
import styles from "./ChapterStatusBadges.module.scss";

interface ChapterStatusBadgesProps {
  chapter: Chapter;
}

export const ChapterStatusBadges = ({ chapter }: ChapterStatusBadgesProps) => (
  <div className={styles.root}>
    {chapter.hasQuiz && !chapter.isCompleted && (
      <span className={styles.quizBadge}>Тест</span>
    )}
    {chapter.isCompleted && <span className={styles.completedBadge}>Пройдено</span>}
  </div>
);
