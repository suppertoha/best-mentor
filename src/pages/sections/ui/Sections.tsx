import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useAppSelector } from "@/app/store/hooks";
import { isAdmin } from "@/entities/user";
import { CreateChapterForm } from "@/features/chapter-create";
import { EditChapterForm } from "@/features/chapter-edit";
import { CreateSectionForm } from "@/features/section-create";
import { EditSectionForm } from "@/features/section-edit";
import { api } from "@/shared/api";
import { Modal } from "@/shared/ui";
import type { Chapter, Section } from "../model/types";
import { SectionItem } from "./SectionItem";
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

  const fetchSections = useCallback(async (signal?: AbortSignal) => {
    try {
      const { data } = await api.get<Section[]>("/sections", { signal });
      setSections(data);
      setError(null);
    } catch (err) {
      if (isAxiosError(err) && err.code === "ERR_CANCELED") {
        return;
      }

      if (isAxiosError(err)) {
        setError(err.message);
      } else {
        setError("Не удалось загрузить разделы");
      }
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
    void fetchSections();
  };

  const handleSectionUpdated = () => {
    setEditingSection(null);
    void fetchSections();
  };

  const handleChapterCreated = () => {
    setCreatingChapterSectionId(null);
    void fetchSections();
  };

  const handleChapterUpdated = () => {
    setEditingChapter(null);
    void fetchSections();
  };

  const handleDeleteSection = async (section: Section) => {
    const confirmed = window.confirm(`Удалить раздел «${section.title}»?`);
    if (!confirmed) return;

    try {
      await api.delete(`/sections/${section.id}`);
      void fetchSections();
    } catch (err) {
      if (isAxiosError(err)) {
        const message =
          typeof err.response?.data === "object" &&
          err.response.data !== null &&
          "message" in err.response.data &&
          typeof err.response.data.message === "string"
            ? err.response.data.message
            : err.message;
        window.alert(message);
      } else {
        window.alert("Не удалось удалить раздел");
      }
    }
  };

  const handleDeleteChapter = async (chapter: Chapter) => {
    const confirmed = window.confirm(`Удалить главу «${chapter.title}»?`);
    if (!confirmed) return;

    try {
      await api.delete(`/chapters/${chapter.id}`);
      void fetchSections();
    } catch (err) {
      if (isAxiosError(err)) {
        const message =
          typeof err.response?.data === "object" &&
          err.response.data !== null &&
          "message" in err.response.data &&
          typeof err.response.data.message === "string"
            ? err.response.data.message
            : err.message;
        window.alert(message);
      } else {
        window.alert("Не удалось удалить главу");
      }
    }
  };

  if (isLoading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <h2 className={styles.heading}>Разделы</h2>
        {admin && (
          <button
            className={styles.addBtn}
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Добавить раздел
          </button>
        )}
      </div>

      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id}>
            <SectionItem
              section={section}
              showAdminActions={admin}
              onEdit={setEditingSection}
              onDelete={handleDeleteSection}
              onAddChapter={(item) => setCreatingChapterSectionId(item.id)}
              onEditChapter={setEditingChapter}
              onDeleteChapter={handleDeleteChapter}
            />
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Добавить раздел"
      >
        <CreateSectionForm onSuccess={handleSectionCreated} />
      </Modal>

      <Modal
        isOpen={editingSection !== null}
        onClose={() => setEditingSection(null)}
        title="Редактировать раздел"
      >
        {editingSection && (
          <EditSectionForm
            key={editingSection.id}
            section={editingSection}
            onSuccess={handleSectionUpdated}
          />
        )}
      </Modal>

      <Modal
        isOpen={creatingChapterSectionId !== null}
        onClose={() => setCreatingChapterSectionId(null)}
        title="Добавить главу"
      >
        {creatingChapterSectionId !== null && (
          <CreateChapterForm
            key={creatingChapterSectionId}
            sectionId={creatingChapterSectionId}
            onSuccess={handleChapterCreated}
          />
        )}
      </Modal>

      <Modal
        isOpen={editingChapter !== null}
        onClose={() => setEditingChapter(null)}
        title="Редактировать главу"
      >
        {editingChapter && (
          <EditChapterForm
            key={editingChapter.id}
            chapter={editingChapter}
            onSuccess={handleChapterUpdated}
          />
        )}
      </Modal>
    </div>
  );
};
