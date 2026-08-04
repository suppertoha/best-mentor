import { type FormEvent, useState } from "react";
import { isAxiosError } from "axios";
import { api } from "@/shared/api";
import { buildSectionSlug } from "../../lib/buildSectionSlug";
import type { CreateSectionDto } from "../../model/types";
import styles from "./CreateSectionForm.module.scss";

interface CreateSectionFormProps {
  onSuccess: () => void;
}

export const CreateSectionForm = ({ onSuccess }: CreateSectionFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload: CreateSectionDto = {
      title: title.trim(),
      description: description.trim(),
      slug: buildSectionSlug(title, slug),
    };

    try {
      await api.post("/sections", payload);
      setTitle("");
      setDescription("");
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
        setError("Не удалось создать раздел");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="section-title">
          Название
        </label>
        <input
          id="section-title"
          className={styles.input}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="HTML"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="section-description">
          Описание
        </label>
        <textarea
          id="section-description"
          className={styles.textarea}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Основы разметки веб-страниц"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="section-slug">
          Slug (необязательно)
        </label>
        <input
          id="section-slug"
          className={styles.input}
          type="text"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder="html"
        />
        <p className={styles.hint}>Если пусто — сгенерируется из названия</p>
      </div>

      <button className={styles.submit} type="submit" disabled={isLoading}>
        {isLoading ? "Сохранение..." : "Создать раздел"}
      </button>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
};
