import { Link } from "react-router-dom";
import ArrowBottom from "@/shared/assets/icons/arrow-bottom.svg?react";
import { getChapterPath } from "@/shared/config";
import type { Chapter, Section } from "../model/types";
import styles from "./SectionItem.module.scss";

interface SectionItemProps {
  section: Section;
  showAdminActions?: boolean;
  onEdit?: (section: Section) => void;
  onDelete?: (section: Section) => void;
  onAddChapter?: (section: Section) => void;
  onEditChapter?: (chapter: Chapter) => void;
  onDeleteChapter?: (chapter: Chapter) => void;
}

export const SectionItem = ({
  section,
  showAdminActions = false,
  onEdit,
  onDelete,
  onAddChapter,
  onEditChapter,
  onDeleteChapter,
}: SectionItemProps) => {
  const chapters = [...section.chapters].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <details className={styles.root}>
      <summary className={styles.head}>
        <p className={styles.title}>{section.title}</p>
        <ArrowBottom />
      </summary>

      <div className={styles.block}>
        <p className={styles.text}>{section.description}</p>

        {showAdminActions && (
          <div className={styles.actions}>
            <button
              className={styles.editBtn}
              type="button"
              onClick={() => onEdit?.(section)}
            >
              Редактировать
            </button>
            <button
              className={styles.deleteBtn}
              type="button"
              onClick={() => onDelete?.(section)}
            >
              Удалить
            </button>
            <button
              className={styles.addChapterBtn}
              type="button"
              onClick={() => onAddChapter?.(section)}
            >
              Добавить главу
            </button>
          </div>
        )}

        {chapters.length > 0 && (
          <ul className={styles.chapters}>
            {chapters.map((chapter) => (
              <li key={chapter.id} className={styles.chapterRow}>
                <Link to={getChapterPath(chapter.slug)} className={styles.chapterTitle}>
                  {chapter.title}
                </Link>
                {showAdminActions && (
                  <div className={styles.chapterActions}>
                    <button
                      className={styles.chapterEditBtn}
                      type="button"
                      onClick={() => onEditChapter?.(chapter)}
                    >
                      Редактировать
                    </button>
                    <button
                      className={styles.chapterDeleteBtn}
                      type="button"
                      onClick={() => onDeleteChapter?.(chapter)}
                    >
                      Удалить
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
};
