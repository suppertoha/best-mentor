import { Link } from "react-router-dom";
import ArrowBottom from "@/shared/assets/icons/arrow-bottom.svg?react";
import PencilIcon from "@/shared/assets/icons/pencil.svg?react";
import TrashIcon from "@/shared/assets/icons/trash.svg?react";
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

        <div
          className={styles.headActions}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {showAdminActions && (
            <>
              <button
                className={styles.editBtn}
                type="button"
                aria-label="Редактировать раздел"
                onClick={() => onEdit?.(section)}
              >
                <PencilIcon />
              </button>
              <button
                className={styles.deleteBtn}
                type="button"
                aria-label="Удалить раздел"
                onClick={() => onDelete?.(section)}
              >
                <TrashIcon />
              </button>
              <button
                className={styles.addChapterBtn}
                type="button"
                onClick={() => onAddChapter?.(section)}
              >
                Добавить главу
              </button>
            </>
          )}
          <ArrowBottom className={styles.arrow} />
        </div>
      </summary>

      <div className={styles.block}>
        <p className={styles.text}>{section.description}</p>

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
                      aria-label={`Редактировать главу «${chapter.title}»`}
                      onClick={() => onEditChapter?.(chapter)}
                    >
                      <PencilIcon />
                    </button>
                    <button
                      className={styles.chapterDeleteBtn}
                      type="button"
                      aria-label={`Удалить главу «${chapter.title}»`}
                      onClick={() => onDeleteChapter?.(chapter)}
                    >
                      <TrashIcon />
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
