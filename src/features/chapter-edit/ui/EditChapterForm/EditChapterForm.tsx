import { type FormEvent, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { buildChapterSlug } from "@/features/chapter-create/lib/buildChapterSlug";
import { api } from "@/shared/api";
import type { EditableChapter, UpdateChapterDto } from "../../model/types";
import styles from "./EditChapterForm.module.scss";

interface ChapterDetailResponse {
  id: number;
  title: string;
  slug: string;
  content: string;
}

interface EditChapterFormProps {
  chapter: EditableChapter;
  onSuccess: () => void;
}

export const EditChapterForm = ({ chapter, onSuccess }: EditChapterFormProps) => {
  const [title, setTitle] = useState(chapter.title);
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState(chapter.slug);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchChapter = async () => {
      setIsFetching(true);
      setError(null);

      try {
        const { data } = await api.get<ChapterDetailResponse>(`/chapters/${chapter.slug}`, {
          signal: controller.signal,
        });
        setTitle(data.title);
        setContent(data.content);
        setSlug(data.slug);
      } catch (err) {
        if (isAxiosError(err) && err.code === "ERR_CANCELED") {
          return;
        }

        if (isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("Не удалось загрузить главу");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsFetching(false);
        }
      }
    };

    void fetchChapter();

    return () => {
      controller.abort();
    };
  }, [chapter.slug]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload: UpdateChapterDto = {
      title: title.trim(),
      content: content.trim(),
      slug: buildChapterSlug(title, slug),
    };

    try {
      await api.patch(`/chapters/${chapter.id}`, payload);
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
        setError("Не удалось обновить главу");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <p className={styles.status}>Загрузка...</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`edit-chapter-title-${chapter.id}`}>
          Название
        </label>
        <input
          id={`edit-chapter-title-${chapter.id}`}
          className={styles.input}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`edit-chapter-content-${chapter.id}`}>
          Содержание
        </label>
        <textarea
          id={`edit-chapter-content-${chapter.id}`}
          className={styles.textarea}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`edit-chapter-slug-${chapter.id}`}>
          Slug
        </label>
        <input
          id={`edit-chapter-slug-${chapter.id}`}
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
