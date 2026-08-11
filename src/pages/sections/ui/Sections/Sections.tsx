import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { isAxiosError } from "axios";
import { useAppSelector } from "@/app/store/hooks";
import { showSuccessToast } from "@/shared/lib/toast";
import { isAdmin } from "@/entities/user";
import { chaptersService, sectionsService } from "@/shared/api";
import { Button } from "@/shared/ui";
import { useDndSensors } from "../../lib/useSortableItem";
import { sortBySortOrder } from "@/shared/lib";
import type { Chapter, Section } from "../../model/types";
import { SectionItem } from "../SectionItem";
import { SectionsAdminModals } from "../SectionsAdminModals";
import styles from "./Sections.module.scss";

export const Sections = () => {
  const user = useAppSelector((state) => state.user.user);
  const admin = isAdmin(user);
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [creatingChapterSectionId, setCreatingChapterSectionId] = useState<number | null>(null);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);

  const sortedSections = useMemo(() => sortBySortOrder(sections), [sections]);

  const sensors = useDndSensors();

  const fetchSections = useCallback(async (signal?: AbortSignal) => {
    try {
      const data = await sectionsService.getAll(signal);
      setSections(data);
      setError(null);
    } catch (err) {
      if (isAxiosError(err) && err.code === "ERR_CANCELED") {
        return;
      }

      setError("Не удалось загрузить разделы");
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchSections(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchSections]);

  const handleSectionCreated = () => {
    setIsCreateModalOpen(false);
    fetchSections();
  };

  const handleSectionUpdated = () => {
    setEditingSection(null);
    fetchSections();
  };

  const handleChapterCreated = () => {
    setCreatingChapterSectionId(null);
    fetchSections();
  };

  const handleChapterUpdated = () => {
    setEditingChapter(null);
    fetchSections();
  };

  const handleDeleteSection = async (section: Section) => {
    const confirmed = window.confirm(`Удалить раздел «${section.title}»?`);
    if (!confirmed) return;

    try {
      await sectionsService.delete(section.id);
      showSuccessToast("Раздел удалён");
      fetchSections();
    } catch {
      // handled by API interceptor
    }
  };

  const handleDeleteChapter = async (chapter: Chapter) => {
    const confirmed = window.confirm(`Удалить главу «${chapter.title}»?`);
    if (!confirmed) return;

    try {
      await chaptersService.delete(chapter.id);
      showSuccessToast("Глава удалена");
      void fetchSections();
    } catch {
      // handled by API interceptor
    }
  };

  const handleSectionsReorder = async (reorderedSections: Section[]) => {
    const previousSections = sections;
    setSections(reorderedSections);

    try {
      const data = await sectionsService.reorder(reorderedSections.map((section) => section.id));
      setSections(data);
    } catch {
      setSections(previousSections);
    }
  };

  const handleChaptersReorder = async (sectionId: number, reorderedChapters: Chapter[]) => {
    const previousSections = sections;
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId ? { ...section, chapters: reorderedChapters } : section,
      ),
    );

    try {
      const data = await chaptersService.reorder(
        sectionId,
        reorderedChapters.map((chapter) => chapter.id),
      );
      setSections((current) => current.map((section) => (section.id === sectionId ? data : section)));
    } catch {
      setSections(previousSections);
    }
  };

  const handleSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortedSections.findIndex((section) => section.id === active.id);
    const newIndex = sortedSections.findIndex((section) => section.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    void handleSectionsReorder(arrayMove(sortedSections, oldIndex, newIndex));
  };

  if (isLoading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <h2 className={styles.heading}>Разделы</h2>
        {admin && (
          <Button
            type="button"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Добавить раздел
          </Button>
        )}
      </div>

      {admin ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleSectionDragEnd}
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
                  onEdit={setEditingSection}
                  onDelete={handleDeleteSection}
                  onAddChapter={(item) => setCreatingChapterSectionId(item.id)}
                  onEditChapter={setEditingChapter}
                  onDeleteChapter={handleDeleteChapter}
                  onChaptersReorder={handleChaptersReorder}
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
          isCreateSectionOpen={isCreateModalOpen}
          onCloseCreateSection={() => setIsCreateModalOpen(false)}
          onSectionCreated={handleSectionCreated}
          editingSection={editingSection}
          onCloseEditSection={() => setEditingSection(null)}
          onSectionUpdated={handleSectionUpdated}
          creatingChapterSectionId={creatingChapterSectionId}
          onCloseCreateChapter={() => setCreatingChapterSectionId(null)}
          onChapterCreated={handleChapterCreated}
          editingChapter={editingChapter}
          onCloseEditChapter={() => setEditingChapter(null)}
          onChapterUpdated={handleChapterUpdated}
        />
      )}
    </div>
  );
};
