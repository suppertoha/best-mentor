import { useState, useMemo } from "react";
import type { Chapter, Section } from "./types";
import { useQueryClient } from "@tanstack/react-query";
import { sectionsListQueryKey } from "@/shared/api/queryKeys";
import { chaptersService, sectionsService } from "@/shared/api";
import { showSuccessToast } from "@/shared/lib/toast";
import { useDndSensors } from "../lib/useSortableItem";
import { sortBySortOrder } from "@/shared/lib";
import { type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export const useSectionsAdmin = (sortedSections: Section[]) => {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [creatingChapterSectionId, setCreatingChapterSectionId] = useState<
    number | null
  >(null);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);

  const invalidateSectionsList = () => {
    void queryClient.invalidateQueries({ queryKey: sectionsListQueryKey });
  };

  const handleSectionCreated = () => {
    setIsCreateModalOpen(false);
    invalidateSectionsList();
  };

  const handleSectionUpdated = () => {
    setEditingSection(null);
    invalidateSectionsList();
  };

  const handleChapterCreated = () => {
    setCreatingChapterSectionId(null);
    invalidateSectionsList();
  };

  const handleChapterUpdated = () => {
    setEditingChapter(null);
    invalidateSectionsList();
  };

  const openCreateModal = () => setIsCreateModalOpen(true);

  const sensors = useDndSensors();

  const creatingChapterSectionChapters = useMemo(() => {
    if (creatingChapterSectionId === null) {
      return [];
    }

    const section = sortedSections.find(
      (item) => item.id === creatingChapterSectionId,
    );

    return sortBySortOrder(section?.chapters ?? []);
  }, [creatingChapterSectionId, sortedSections]);

  const handleDeleteSection = async (section: Section) => {
    const confirmed = window.confirm(`Удалить раздел «${section.title}»?`);
    if (!confirmed) return;

    try {
      await sectionsService.delete(section.id);
      showSuccessToast("Раздел удалён");
      invalidateSectionsList();
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
      invalidateSectionsList();
    } catch {
      // handled by API interceptor
    }
  };

  const handleSectionsReorder = async (reorderedSections: Section[]) => {
    const previousSections =
      queryClient.getQueryData<Section[]>(sectionsListQueryKey);

    queryClient.setQueryData(sectionsListQueryKey, reorderedSections);

    try {
      const data = await sectionsService.reorder(
        reorderedSections.map((section) => section.id),
      );
      queryClient.setQueryData(sectionsListQueryKey, data);
    } catch {
      if (previousSections) {
        queryClient.setQueryData(sectionsListQueryKey, previousSections);
      }
    }
  };

  const handleChaptersReorder = async (
    sectionId: number,
    reorderedChapters: Chapter[],
  ) => {
    const previousSections =
      queryClient.getQueryData<Section[]>(sectionsListQueryKey);
    const optimisticSections =
      previousSections?.map((section) =>
        section.id === sectionId
          ? { ...section, chapters: reorderedChapters }
          : section,
      ) ?? [];

    queryClient.setQueryData(sectionsListQueryKey, optimisticSections);

    try {
      const updatedSection = await chaptersService.reorder(
        sectionId,
        reorderedChapters.map((chapter) => chapter.id),
      );

      queryClient.setQueryData(
        sectionsListQueryKey,
        (old: Section[] | undefined) =>
          old?.map((section) =>
            section.id === sectionId ? updatedSection : section,
          ) ?? [],
      );
    } catch {
      if (previousSections) {
        queryClient.setQueryData(sectionsListQueryKey, previousSections);
      }
    }
  };

  const handleSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortedSections.findIndex(
      (section) => section.id === active.id,
    );
    const newIndex = sortedSections.findIndex(
      (section) => section.id === over.id,
    );
    if (oldIndex === -1 || newIndex === -1) return;

    void handleSectionsReorder(arrayMove(sortedSections, oldIndex, newIndex));
  };

  const closeCreateModal = () => setIsCreateModalOpen(false);
  const closeEditSection = () => setEditingSection(null);
  const closeEditChapter = () => setEditingChapter(null);
  const closeCreateChapter = () => setCreatingChapterSectionId(null);

  return {
    isCreateModalOpen,
    editingSection,
    creatingChapterSectionId,
    editingChapter,
    creatingChapterSectionChapters,
    sensors,
    openCreateModal,
    closeCreateModal,
    handleChapterCreated,
    handleSectionUpdated,
    handleSectionCreated,
    handleChapterUpdated,
    handleDeleteSection,
    handleDeleteChapter,
    handleChaptersReorder,
    handleSectionDragEnd,
    setEditingSection,
    setCreatingChapterSectionId,
    setEditingChapter,
    closeEditSection,
    closeCreateChapter,
    closeEditChapter,
  };
};
