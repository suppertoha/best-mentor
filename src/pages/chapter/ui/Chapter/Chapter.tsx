import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { ChapterQuiz } from "@/features/chapter-quiz";
import { isAdmin } from "@/entities/user";
import { chaptersService, sectionsService } from "@/shared/api";
import type { Chapter as ChapterListItem } from "@/shared/api";
import { getChapterQuizEditPath, ROUTES } from "@/shared/config";
import { sortBySortOrder } from "@/shared/lib";
import { Button, MarkdownContent } from "@/shared/ui";
import { getChapterNeighbors } from "../../lib/getChapterNeighbors";
import type { ChapterDetail } from "../../model/types";
import { ChapterNav } from "../ChapterNav";
import styles from "./Chapter.module.scss";

const ChapterContentEditor = lazy(() =>
  import("@/features/chapter-edit/ui/ChapterContentEditor").then((module) => ({
    default: module.ChapterContentEditor,
  })),
);

type ChapterLocationState = {
  edit?: boolean;
};

export const Chapter = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const admin = isAdmin(user);

  const [chapter, setChapter] = useState<ChapterDetail | null>(null);
  const [sectionChapters, setSectionChapters] = useState<ChapterListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(() =>
    Boolean((location.state as ChapterLocationState | null)?.edit),
  );
  const fetchChapter = async (chapterSlug: string, signal: AbortSignal) => {
    try {
      const data = await chaptersService.getBySlug(chapterSlug, signal);
      setChapter(data);
    } catch (err) {
      if (isAxiosError(err) && err.code === "ERR_CANCELED") {
        return;
      }

      if (isAxiosError(err) && err.response?.status === 404) {
        setIsNotFound(true);
        return;
      }

      setError("Не удалось загрузить главу");
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

  useEffect(() => {
    if (!chapter?.section.slug) {
      return;
    }

    const controller = new AbortController();

    const fetchSectionChapters = async () => {
      try {
        const section = await sectionsService.getBySlug(
          chapter.section.slug,
          controller.signal,
        );
        setSectionChapters(sortBySortOrder(section.chapters ?? []));
      } catch (err) {
        if (isAxiosError(err) && err.code === "ERR_CANCELED") {
          return;
        }
      }
    };

    fetchSectionChapters();

    return () => {
      controller.abort();
    };
  }, [chapter?.section.slug]);

  const neighbors = useMemo(() => {
    if (!slug) {
      return { prev: null, next: null, currentIndex: -1, total: 0 };
    }

    return getChapterNeighbors(sectionChapters, slug);
  }, [sectionChapters, slug]);

  const handleContentSaved = (content: string) => {
    setChapter((current) => (current ? { ...current, content } : current));
    setIsEditing(false);
  };

  const handleCompletedChange = useCallback((isCompleted: boolean) => {
    setChapter((current) => (current ? { ...current, isCompleted } : current));
  }, []);

  if (!slug || isNotFound) {
    return <Navigate to={ROUTES.notFound} replace />;
  }

  if (isLoading) return <p className={styles.status}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!chapter) return null;

  return (
    <article className={styles.page}>
      <div className={styles.top}>
        <Link to={ROUTES.sections} className={styles.backLink}>
          ← К разделам
        </Link>

        {admin && !isEditing && (
          <div className={styles.adminActions}>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => navigate(getChapterQuizEditPath(chapter.slug))}
            >
              {chapter.hasQuiz ? "Редактировать тест" : "Добавить тест"}
            </Button>
            <Button type="button" size="sm" onClick={() => setIsEditing(true)}>
              Редактировать
            </Button>
          </div>
        )}
      </div>

      <div className={styles.hero}>
        <p className={styles.section}>{chapter.section.title}</p>
        <h1 className={styles.title}>{chapter.title}</h1>

        {admin && isEditing ? (
          <Suspense fallback={<p className={styles.status}>Загрузка редактора...</p>}>
            <ChapterContentEditor
              chapterId={chapter.id}
              initialContent={chapter.content}
              onSaved={handleContentSaved}
              onCancel={() => setIsEditing(false)}
            />
          </Suspense>
        ) : (
          <>
            <MarkdownContent content={chapter.content} className={styles.content} />

            {chapter.hasQuiz && (
              <div className={styles.quizSection}>
                <ChapterQuiz
                  chapterSlug={chapter.slug}
                  isCompleted={chapter.isCompleted}
                  onCompletedChange={handleCompletedChange}
                />
              </div>
            )}

            <ChapterNav
              prev={neighbors.prev}
              next={neighbors.next}
              currentIndex={neighbors.currentIndex}
              total={neighbors.total}
            />
          </>
        )}
      </div>
    </article>
  );
};
