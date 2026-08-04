import { type FormEvent, useState } from "react";
import { isAxiosError } from "axios";
import { api } from "@/shared/api";
import { buildChapterSlug } from "../../lib/buildChapterSlug";
import type { CreateChapterDto } from "../../model/types";
import styles from "./CreateChapterForm.module.scss";

interface CreateChapterFormProps {
  sectionId: number;
  onSuccess: () => void;
}

export const CreateChapterForm = ({ sectionId, onSuccess }: CreateChapterFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload: CreateChapterDto = {
      title: title.trim(),
      content: content.trim(),
      slug: buildChapterSlug(title, slug),
    };

    try {
      await api.post(`/sections/${sectionId}/chapters`, payload);
      setTitle("");
      setContent("");
      setSlug("");
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
        setError("Не удалось создать главу");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="chapter-title">
          Название
        </label>
        <input
          id="chapter-title"
          className={styles.input}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Введение"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="chapter-content">
          Содержание
        </label>
        <textarea
          id="chapter-content"
          className={styles.textarea}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Текст главы"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="chapter-slug">
          Slug (необязательно)
        </label>
        <input
          id="chapter-slug"
          className={styles.input}
          type="text"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder="html-introduction"
        />
        <p className={styles.hint}>Если пусто — сгенерируется из названия</p>
      </div>

      <button className={styles.submit} type="submit" disabled={isLoading}>
        {isLoading ? "Сохранение..." : "Создать главу"}
      </button>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
};
