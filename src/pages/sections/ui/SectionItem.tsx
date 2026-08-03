import ArrowBottom from "@/shared/assets/icons/arrow-bottom.svg?react";
import type { Section } from "../model/types";
import styles from "./SectionItem.module.scss";

interface SectionItemProps {
  section: Section;
}

export const SectionItem = ({ section }: SectionItemProps) => {
  const chapters = [...section.chapters].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <details className={styles.root}>
      <summary className={styles.head}>
        <p className={styles.title}>{section.title}</p>
        <ArrowBottom />
      </summary>

      <div className={styles.block}>
        <p className={styles.text}>{section.description}</p>

        {chapters.length > 0 && (
          <ul className={styles.chapters}>
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <span className={styles.chapterTitle}>{chapter.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
};
