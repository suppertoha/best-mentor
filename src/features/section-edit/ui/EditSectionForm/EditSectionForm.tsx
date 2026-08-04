import { type FormEvent, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { buildSectionSlug } from "@/features/section-create/lib/buildSectionSlug";
import { api } from "@/shared/api";
import type { EditableSection, UpdateSectionDto } from "../../model/types";
import styles from "./EditSectionForm.module.scss";

interface EditSectionFormProps {
  section: EditableSection;
  onSuccess: () => void;
}

export const EditSectionForm = ({ section, onSuccess }: EditSectionFormProps) => {
  const [title, setTitle] = useState(section.title);
  const [description, setDescription] = useState(section.description);
  const [slug, setSlug] = useState(section.slug);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(section.title);
    setDescription(section.description);
    setSlug(section.slug);
    setError(null);
  }, [section]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload: UpdateSectionDto = {
      title: title.trim(),
      description: description.trim(),
      slug: buildSectionSlug(title, slug),
    };

    try {
      await api.patch(`/sections/${section.id}`, payload);
      onSuccess();
    } catch (err) {
      if (isAxiosError(err)) {
        const message =
          typeof err.response?.data === "object" &&
          err.response.data !== null &&
          "message" in err.response.data &&
          typeof err.response.data.message === "string"
            ? err.response.data.message
            : err.message;
        setError(message);
      } else {
        setError("Не удалось обновить раздел");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`edit-section-title-${section.id}`}>
          Название
        </label>
        <input
          id={`edit-section-title-${section.id}`}
          className={styles.input}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`edit-section-description-${section.id}`}>
          Описание
        </label>
        <textarea
          id={`edit-section-description-${section.id}`}
          className={styles.textarea}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`edit-section-slug-${section.id}`}>
          Slug
        </label>
        <input
          id={`edit-section-slug-${section.id}`}
          className={styles.input}
          type="text"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          required
        />
      </div>

      <button className={styles.submit} type="submit" disabled={isLoading}>
        {isLoading ? "Сохранение..." : "Сохранить"}
      </button>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
};
