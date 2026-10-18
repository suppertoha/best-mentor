import { useMemo } from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useAppSelector } from "@/app/store/hooks";
import { isAdmin } from "@/entities/user";
import { sortBySortOrder } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { useSectionsQuery } from "../../model/useSectionsQuery";
import { SectionItem } from "../SectionItem";
import { SectionsAdminModals } from "../SectionsAdminModals";
import { useSectionsAdmin } from "../../model/useSectionsAdmin";
import styles from "./Sections.module.scss";

export const Sections = () => {
  const user = useAppSelector((state) => state.user.user);
  const admin = isAdmin(user);
  const { data: sections = [], isLoading, error } = useSectionsQuery();

  const sortedSections = useMemo(() => sortBySortOrder(sections), [sections]);

	const sectionsAdmin = useSectionsAdmin(sortedSections)



  if (isLoading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error.message}</p>;

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <h2 className={styles.heading}>Разделы</h2>
        {admin && (
          <Button
            type="button"
            size="sm"
            onClick={sectionsAdmin.openCreateModal}
          >
            Добавить раздел
          </Button>
        )}
      </div>

      {admin ? (
        <DndContext
          sensors={sectionsAdmin.sensors}
          collisionDetection={closestCenter}
          onDragEnd={sectionsAdmin.handleSectionDragEnd}
        >
          <SortableContext
            items={sortedSections.map((section) => section.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className={styles.list}>
              {sortedSections.map((section) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  sortable
                  showAdminActions
                  onEdit={sectionsAdmin.setEditingSection}
                  onDelete={sectionsAdmin.handleDeleteSection}
                  onAddChapter={(section)=>sectionsAdmin.setCreatingChapterSectionId(section.id)}
                  onEditChapter={sectionsAdmin.setEditingChapter}
                  onDeleteChapter={sectionsAdmin.handleDeleteChapter}
                  onChaptersReorder={sectionsAdmin.handleChaptersReorder}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      ) : (
        <ul className={styles.list}>
          {sortedSections.map((section) => (
            <li key={section.id}>
              <SectionItem section={section} />
            </li>
          ))}
        </ul>
      )}

      {admin && (
        <SectionsAdminModals
          isCreateSectionOpen={sectionsAdmin.isCreateModalOpen}
          onCloseCreateSection={sectionsAdmin.closeCreateModal}
          onSectionCreated={sectionsAdmin.handleSectionCreated}
          editingSection={sectionsAdmin.editingSection}
          onCloseEditSection={sectionsAdmin.closeEditSection}
          onSectionUpdated={sectionsAdmin.handleSectionUpdated}
          creatingChapterSectionId={sectionsAdmin.creatingChapterSectionId}
          creatingChapterSectionChapters={sectionsAdmin.creatingChapterSectionChapters}
          onCloseCreateChapter={sectionsAdmin.closeCreateChapter}
          onChapterCreated={sectionsAdmin.handleChapterCreated}
          editingChapter={sectionsAdmin.editingChapter}
          onCloseEditChapter={sectionsAdmin.closeEditChapter}
          onChapterUpdated={sectionsAdmin.handleChapterUpdated}
        />
      )}
    </div>
  );
};
