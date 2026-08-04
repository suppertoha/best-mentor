import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import { api } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import type { ChapterDetail } from "../model/types";
import styles from "./Chapter.module.scss";

export const Chapter = () => {
  const { slug } = useParams();
  const [chapter, setChapter] = useState<ChapterDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchChapter = async (chapterSlug: string, signal: AbortSignal) => {
    try {
      const { data } = await api.get<ChapterDetail>(`/chapters/${chapterSlug}`, { signal });
      setChapter(data);
    } catch (err) {
      if (isAxiosError(err) && err.code === "ERR_CANCELED") {
        return;
      }

      if (isAxiosError(err) && err.response?.status === 404) {
        setIsNotFound(true);
        return;
      }

      if (isAxiosError(err)) {
        setError(err.message);
      } else {
        setError("Не удалось загрузить главу");
      }
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      setIsNotFound(true);
      return;
    }

    const controller = new AbortController();

    fetchChapter(slug, controller.signal);

    return () => {
      controller.abort();
    };
  }, [slug]);

  if (!slug || isNotFound) {
    return <Navigate to={ROUTES.notFound} replace />;
  }

  if (isLoading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!chapter) return null;

  return (
    <article className={styles.page}>
      <Link to={ROUTES.sections} className={styles.backLink}>
        ← К разделам
      </Link>

      <div className={styles.hero}>
        <p className={styles.section}>{chapter.section.title}</p>
        <h1 className={styles.title}>{chapter.title}</h1>
        <p className={styles.content}>{chapter.content}</p>
      </div>
    </article>
  );
};
