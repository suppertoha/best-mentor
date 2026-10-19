import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { ChapterQuiz } from "@/features/chapter-quiz";
import { isAdmin } from "@/entities/user";
import { chaptersService, sectionsService } from "@/shared/api";
import type { Chapter as ChapterListItem } from "@/shared/api";
import { getChapterQuizEditPath, getChapterPath, ROUTES } from "@/shared/config";
import { canProceedToNextChapter, getChapterLockState, getNextUncompletedChapter, notifySectionsProgressUpdated, sortBySortOrder } from "@/shared/lib";
import { Button, MarkdownContent } from "@/shared/ui";
import { getChapterNeighbors } from "../../lib/getChapterNeighbors";
import type { ChapterDetail } from "../../model/types";
import { ChapterNav } from "../ChapterNav";
import { bem } from "@/shared/lib/bem";
import styles from "./Chapter.module.scss";

const b = bem(styles, "chapter-page");

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
  const [isSectionProgressReady, setIsSectionProgressReady] = useState(false);
  const [sectionChaptersError, setSectionChaptersError] = useState<string | null>(null);
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

    setIsSectionProgressReady(false);
    setSectionChaptersError(null);

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

        setSectionChapters([]);
        setSectionChaptersError("Не удалось загрузить прогресс раздела");
      } finally {
        if (!controller.signal.aborted) {
          setIsSectionProgressReady(true);
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

  const navNext = useMemo(() => {
    if (!neighbors.next || !chapter) {
      return neighbors.next;
    }

    if (admin || neighbors.currentIndex < 0) {
      return neighbors.next;
    }

    if (!canProceedToNextChapter(chapter, admin)) {
      return neighbors.next;
    }

    const nextUncompleted = getNextUncompletedChapter(
      sectionChapters,
      neighbors.currentIndex,
    );

    if (
      nextUncompleted &&
      neighbors.next.isCompleted &&
      nextUncompleted.slug !== neighbors.next.slug
    ) {
      return nextUncompleted;
    }

    return neighbors.next;
  }, [admin, chapter, neighbors.currentIndex, neighbors.next, sectionChapters]);

  const handleContentSaved = (content: string) => {
    setChapter((current) => (current ? { ...current, content } : current));
    setIsEditing(false);
  };

  const lockState = useMemo(() => {
    if (!slug || sectionChapters.length === 0) {
      return { isUnlocked: true, blockingChapter: null, currentIndex: -1 };
    }

    const currentIndex = sectionChapters.findIndex((item) => item.slug === slug);

    if (currentIndex === -1) {
      return { isUnlocked: true, blockingChapter: null, currentIndex: -1 };
    }

    const { isUnlocked, blockingChapter } = getChapterLockState(sectionChapters, currentIndex);

    return { isUnlocked, blockingChapter, currentIndex };
  }, [sectionChapters, slug]);

  const handleCompletedChange = useCallback(
    (isCompleted: boolean) => {
      setChapter((current) => (current ? { ...current, isCompleted } : current));

      if (!slug) {
        return;
      }

      setSectionChapters((current) =>
        current.map((item) => (item.slug === slug ? { ...item, isCompleted } : item)),
      );

      if (isCompleted) {
        notifySectionsProgressUpdated();
      }
    },
    [slug],
  );

  if (!slug || isNotFound) {
    return <Navigate to={ROUTES.notFound} replace />;
  }

  if (isLoading || (!admin && chapter && !isSectionProgressReady)) {
    return <p className={b.el("status")}>Загрузка...</p>;
  }
  if (error) return <p className={b.el("error")}>{error}</p>;
  if (!chapter) return null;

  if (!admin && sectionChaptersError) {
    return (
      <article className={b.block()}>
        <div className={b.el("top")}>
          <Link to={ROUTES.sections} className={b.el("back-link")}>
            ← К разделам
          </Link>
        </div>
        <p className={b.el("error")}>{sectionChaptersError}</p>
      </article>
    );
  }

  if (!admin && !lockState.isUnlocked && lockState.blockingChapter) {
    return (
      <article className={b.block()}>
        <div className={b.el("top")}>
          <Link to={ROUTES.sections} className={b.el("back-link")}>
            ← К разделам
          </Link>
        </div>

        <div className={b.el("locked")}>
          <p className={b.el("section")}>{chapter.section.title}</p>
          <h1 className={b.el("locked-title")}>Глава заблокирована</h1>
          <p className={b.el("locked-text")}>
            Сначала пройдите главу «{lockState.blockingChapter.title}».
          </p>
          <Link
            to={getChapterPath(lockState.blockingChapter.slug)}
            className={b.el("locked-link")}
          >
            Перейти к главе «{lockState.blockingChapter.title}»
          </Link>
        </div>
      </article>
    );
  }

  const canGoNext = canProceedToNextChapter(chapter, admin);

  return (
    <article className={b.block()}>
      <div className={b.el("top")}>
        <Link to={ROUTES.sections} className={b.el("back-link")}>
          ← К разделам
        </Link>

        {admin && !isEditing && (
          <div className={b.el("admin-actions")}>
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

      <div className={b.el("hero")}>
        <p className={b.el("section")}>{chapter.section.title}</p>
        <h1 className={b.el("title")}>{chapter.title}</h1>

        {admin && isEditing ? (
          <Suspense fallback={<p className={b.el("status")}>Загрузка редактора...</p>}>
            <ChapterContentEditor
              chapterId={chapter.id}
              initialContent={chapter.content}
              onSaved={handleContentSaved}
              onCancel={() => setIsEditing(false)}
            />
          </Suspense>
        ) : (
          <>
            <MarkdownContent content={chapter.content} className={b.el("content")} />

            {chapter.hasQuiz && (
              <div className={b.el("quiz-section")}>
                <ChapterQuiz
                  chapterSlug={chapter.slug}
                  isCompleted={chapter.isCompleted}
                  onCompletedChange={handleCompletedChange}
                />
              </div>
            )}

            <ChapterNav
              prev={neighbors.prev}
              next={navNext}
              currentIndex={neighbors.currentIndex}
              total={neighbors.total}
              canGoNext={canGoNext}
            />
          </>
        )}
      </div>
    </article>
  );
};
