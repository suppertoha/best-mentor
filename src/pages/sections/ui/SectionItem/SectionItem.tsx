import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import ArrowBottom from "@/shared/assets/icons/arrow-bottom.svg?react";
import PencilIcon from "@/shared/assets/icons/pencil.svg?react";
import TrashIcon from "@/shared/assets/icons/trash.svg?react";
import { getChapterLockState, getSectionProgress, sortBySortOrder } from "@/shared/lib";
import { bem } from "@/shared/lib/bem";
import { Button } from "@/shared/ui";
import { useDndSensors, useSortableItem, type SortableHandleProps } from "../../lib/useSortableItem";
import type { Chapter, Section } from "../../model/types";
import { DragHandle } from "./DragHandle";
import { SortableChapterRow } from "./SortableChapterRow";
import { ChapterStatusBadges } from "./ChapterStatusBadges";
import { ChapterTitleCell } from "./ChapterTitleCell";
import styles from "./SectionItem.module.scss";

const si = bem(styles, "section-item");

interface SectionItemProps {
  section: Section;
  sortable?: boolean;
  showAdminActions?: boolean;
  onEdit?: (section: Section) => void;
  onDelete?: (section: Section) => void;
  onAddChapter?: (section: Section) => void;
  onEditChapter?: (chapter: Chapter) => void;
  onDeleteChapter?: (chapter: Chapter) => void;
  onChaptersReorder?: (sectionId: number, chapters: Chapter[]) => void;
}

interface SectionItemViewProps extends SectionItemProps {
  dragHandleProps?: SortableHandleProps;
}

const SectionItemView = ({
  section,
  showAdminActions = false,
  dragHandleProps,
  onEdit,
  onDelete,
  onAddChapter,
  onEditChapter,
  onDeleteChapter,
  onChaptersReorder,
}: SectionItemViewProps) => {
  const chapters = sortBySortOrder(section.chapters);
  const chapterSensors = useDndSensors();
  const { completed: completedChapters, total: totalChapters } = getSectionProgress(chapters);
  const showProgress = !showAdminActions && totalChapters > 0;

  const handleChapterDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = chapters.findIndex((chapter) => chapter.id === active.id);
    const newIndex = chapters.findIndex((chapter) => chapter.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    onChaptersReorder?.(section.id, arrayMove(chapters, oldIndex, newIndex));
  };

  return (
    <details className={si.block()}>
      <summary className={si.el("head")}>
        <div className={si.el("head-main")}>
          {dragHandleProps && (
            <DragHandle
              className={si.el("drag-handle")}
              onClick={(event) => event.stopPropagation()}
              onPointerDown={(event) => event.stopPropagation()}
              {...dragHandleProps}
            />
          )}
          <p className={si.el("title")}>{section.title}</p>
          {showProgress && (
            <span
              className={
                completedChapters === totalChapters
                  ? si.el("progress-badge--completed")
                  : si.el("progress-badge")
              }
            >
              {completedChapters} / {totalChapters} пройдено
            </span>
          )}
        </div>

        <div
          className={si.el("head-actions")}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {showAdminActions && (
            <>
              <Button
                variant="ghost"
                className={si.el("edit-btn")}
                type="button"
                aria-label="Редактировать раздел"
                onClick={() => onEdit?.(section)}
              >
                <PencilIcon />
              </Button>
              <Button
                variant="ghost"
                className={si.el("delete-btn")}
                type="button"
                aria-label="Удалить раздел"
                onClick={() => onDelete?.(section)}
              >
                <TrashIcon />
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => onAddChapter?.(section)}
              >
                Добавить главу
              </Button>
            </>
          )}
          <ArrowBottom className={si.el("arrow")} />
        </div>
      </summary>

      <div className={si.el("body")}>
        <p className={si.el("description")}>{section.description}</p>

        {chapters.length > 0 && (
          <>
            {showAdminActions && onChaptersReorder ? (
              <DndContext
                sensors={chapterSensors}
                collisionDetection={closestCenter}
                onDragEnd={handleChapterDragEnd}
              >
                <SortableContext
                  items={chapters.map((chapter) => chapter.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className={si.el("chapters")}>
                    {chapters.map((chapter, index) => (
                      <SortableChapterRow
                        key={chapter.id}
                        chapter={chapter}
                        chapters={chapters}
                        chapterIndex={index}
                        bypassLocks
                        onEdit={onEditChapter}
                        onDelete={onDeleteChapter}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            ) : (
              <ul className={si.el("chapters")}>
                {chapters.map((chapter, index) => {
                  const { isUnlocked, blockingChapter } = getChapterLockState(chapters, index);
                  const lockHint = blockingChapter
                    ? `Сначала пройдите главу «${blockingChapter.title}»`
                    : undefined;

                  return (
                    <li key={chapter.id} className={si.el("chapter-row")}>
                      <div className={si.el("chapter-main")}>
                        <ChapterTitleCell
                          chapter={chapter}
                          isUnlocked={isUnlocked}
                          lockHint={lockHint}
                        />
                        <ChapterStatusBadges chapter={chapter} isUnlocked={isUnlocked} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </div>
    </details>
  );
};

const SortableSectionItem = (props: SectionItemProps) => {
  const { ref, style, handleProps } = useSortableItem(props.section.id);

  return (
    <li ref={ref} style={style} className={si.el("sortable-item")}>
      <SectionItemView {...props} dragHandleProps={handleProps} />
    </li>
  );
};

export const SectionItem = ({ sortable = false, ...props }: SectionItemProps) =>
  sortable ? <SortableSectionItem {...props} sortable /> : <SectionItemView {...props} />;
