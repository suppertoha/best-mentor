import { useMemo } from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useAppSelector } from "@/app/store/hooks";
import { isAdmin } from "@/entities/user";
import { sortBySortOrder } from "@/shared/lib";
import { Button, ConfirmDialog } from "@/shared/ui";
import { useSectionsQuery } from "../../model/useSectionsQuery";
import { SectionItem } from "../SectionItem";
import { SectionsAdminModals } from "../SectionsAdminModals";
import { useSectionsAdmin } from "../../model/useSectionsAdmin";
import { bem } from "@/shared/lib/bem";
import styles from "./Sections.module.scss";

const b = bem(styles, "sections-page");

export const Sections = () => {
  const user = useAppSelector((state) => state.user.user);
  const admin = isAdmin(user);
  const { data: sections = [], isLoading, error } = useSectionsQuery();

  const sortedSections = useMemo(() => sortBySortOrder(sections), [sections]);

  const sectionsAdmin = useSectionsAdmin(sortedSections);

  if (isLoading) return <p className={b.el("status")}>Загрузка...</p>;
  if (error) return <p className={b.el("error")}>{error.message}</p>;

  return (
    <div className={b.block()}>
      <div className={b.el("top")}>
        <h1 className={b.el("heading")}>Разделы</h1>
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
            <ul className={b.el("list")}>
              {sortedSections.map((section) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  sortable
                  showAdminActions
                  onEdit={sectionsAdmin.setEditingSection}
                  onDelete={sectionsAdmin.requestDeleteSection}
                  onAddChapter={(section)=>sectionsAdmin.setCreatingChapterSectionId(section.id)}
                  onEditChapter={sectionsAdmin.setEditingChapter}
                  onDeleteChapter={sectionsAdmin.requestDeleteChapter}
                  onChaptersReorder={sectionsAdmin.handleChaptersReorder}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      ) : (
        <ul className={b.el("list")}>
          {sortedSections.map((section) => (
            <li key={section.id}>
              <SectionItem section={section} />
            </li>
          ))}
        </ul>
      )}

      {sectionsAdmin.deleteConfirmDialog && (
        <ConfirmDialog
          isOpen
          title={sectionsAdmin.deleteConfirmDialog.title}
          message={sectionsAdmin.deleteConfirmDialog.message}
          onConfirm={() => void sectionsAdmin.confirmDelete()}
          onClose={sectionsAdmin.cancelDelete}
          isLoading={sectionsAdmin.isDeleteLoading}
        />
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
