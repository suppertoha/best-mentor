import { lazy, Suspense, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { isAdmin } from "@/entities/user";
import { chaptersService } from "@/shared/api";
import type { ChapterDetail } from "@/shared/api";
import { getChapterPath, ROUTES } from "@/shared/config";
import { bem } from "@/shared/lib/bem";
import styles from "./ChapterQuizEdit.module.scss";

const b = bem(styles, "chapter-quiz-edit-page");

const ChapterQuizEditor = lazy(() =>
  import("@/features/chapter-quiz-edit/ui/ChapterQuizEditor").then((module) => ({
    default: module.ChapterQuizEditor,
  })),
);

export const ChapterQuizEdit = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const admin = isAdmin(user);

  const [chapter, setChapter] = useState<ChapterDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      setIsNotFound(true);
      return;
    }

    const controller = new AbortController();

    const fetchChapter = async () => {
      try {
        const data = await chaptersService.getBySlug(slug, controller.signal);
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
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchChapter();

    return () => {
      controller.abort();
    };
  }, [slug]);

  const handleClose = () => {
    if (slug) {
      navigate(getChapterPath(slug));
    }
  };

  if (!slug || isNotFound) {
    return <Navigate to={ROUTES.notFound} replace />;
  }

  if (isLoading) {
    return <p className={b.el("status")}>Загрузка...</p>;
  }

  if (error) {
    return <p className={b.el("error")}>{error}</p>;
  }

  if (!chapter) {
    return null;
  }

  if (!admin) {
    return <Navigate to={getChapterPath(chapter.slug)} replace />;
  }

  return (
    <article className={b.block()}>
      <Link to={getChapterPath(chapter.slug)} className={b.el("back-link")}>
        ← К главе
      </Link>

      <div className={b.el("hero")}>
        <p className={b.el("section")}>{chapter.section.title}</p>
        <h1 className={b.el("title")}>
          {chapter.hasQuiz ? "Редактирование теста" : "Создание теста"}
        </h1>
        <p className={b.el("subtitle")}>{chapter.title}</p>

        <Suspense fallback={<p className={b.el("status")}>Загрузка редактора теста...</p>}>
          <ChapterQuizEditor
            chapterId={chapter.id}
            hasQuiz={chapter.hasQuiz}
            onSaved={handleClose}
            onCancel={handleClose}
          />
        </Suspense>
      </div>
    </article>
  );
};
