import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { isAdmin } from "@/entities/user";
import { adminService } from "@/shared/api";
import type { AdminUserDetailDto } from "@/shared/api";
import { getChapterPath, ROUTES } from "@/shared/config";
import { getAdminPath } from "../../lib/adminTabs";
import { formatAdminDate, formatAdminPercent, getAdminUserLabel } from "../../lib/formatAdmin";
import styles from "./AdminUserDetail.module.scss";

export const AdminUserDetail = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user.user);
  const admin = isAdmin(user);

  const [student, setStudent] = useState<AdminUserDetailDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userId = Number(id);

  useEffect(() => {
    if (!admin || !Number.isFinite(userId)) {
      setIsLoading(false);
      if (!Number.isFinite(userId)) {
        setIsNotFound(true);
      }
      return;
    }

    const controller = new AbortController();

    const fetchStudent = async () => {
      try {
        const data = await adminService.getUserById(userId, controller.signal);
        setStudent(data);
      } catch (err) {
        if (isAxiosError(err) && err.code === "ERR_CANCELED") {
          return;
        }

        if (isAxiosError(err) && err.response?.status === 403) {
          setAccessDenied(true);
          return;
        }

        if (isAxiosError(err) && err.response?.status === 404) {
          setIsNotFound(true);
          return;
        }

        setError("Не удалось загрузить данные студента");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void fetchStudent();

    return () => {
      controller.abort();
    };
  }, [admin, userId]);

  if (!admin) {
    return <Navigate to={ROUTES.sections} replace />;
  }

  if (isNotFound) {
    return <Navigate to={ROUTES.notFound} replace />;
  }

  if (accessDenied) {
    return <p className={styles.error}>Нет доступа к админ-панели</p>;
  }

  if (isLoading) {
    return <p className={styles.status}>Загрузка...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!student) {
    return null;
  }

  return (
    <div className={styles.page}>
      <Link to={getAdminPath("students")} className={styles.backLink}>
        ← К списку студентов
      </Link>

      <section className={styles.hero}>
        <p className={styles.role}>{student.role === "ADMIN" ? "Админ" : "Студент"}</p>
        <h1 className={styles.title}>
          {getAdminUserLabel(student.firstName, student.lastName, student.email)}
        </h1>
        <p className={styles.email}>{student.email}</p>

        {(student.githubUrl || student.telegramUsername || student.websiteUrl) && (
          <div className={styles.links}>
            {student.githubUrl && (
              <a
                href={student.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.profileLink}
              >
                GitHub
              </a>
            )}
            {student.telegramUsername && (
              <a
                href={`https://t.me/${student.telegramUsername.replace(/^@/, "")}`}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.profileLink}
              >
                Telegram
              </a>
            )}
            {student.websiteUrl && (
              <a
                href={student.websiteUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.profileLink}
              >
                Сайт
              </a>
            )}
          </div>
        )}

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Прогресс</span>
            <span className={styles.statValue}>{formatAdminPercent(student.completionPercent)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Главы</span>
            <span className={styles.statValue}>
              {student.completedChapters} / {student.totalQuizChapters}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Регистрация</span>
            <span className={styles.statValue}>{formatAdminDate(student.createdAt)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Последняя активность</span>
            <span className={styles.statValue}>{formatAdminDate(student.lastActivityAt)}</span>
          </div>
        </div>

        {student.bio && <p className={styles.bio}>{student.bio}</p>}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Прогресс по разделам</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Раздел</th>
                <th>Главы</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {student.sectionProgress.length === 0 ? (
                <tr>
                  <td colSpan={3} className={styles.emptyCell}>
                    Прогресс пока не начат
                  </td>
                </tr>
              ) : (
                student.sectionProgress.map((item) => (
                  <tr key={item.sectionId}>
                    <td>{item.sectionTitle}</td>
                    <td>
                      {item.completedChapters} / {item.totalQuizChapters}
                    </td>
                    <td>{formatAdminPercent(item.completionPercent)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Недавние прохождения</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Раздел</th>
                <th>Глава</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {student.recentCompletions.length === 0 ? (
                <tr>
                  <td colSpan={3} className={styles.emptyCell}>
                    Пока нет завершённых глав
                  </td>
                </tr>
              ) : (
                student.recentCompletions.map((item) => (
                  <tr key={`${item.chapterId}-${item.completedAt}`}>
                    <td>{item.sectionTitle}</td>
                    <td>
                      <Link to={getChapterPath(item.chapterSlug)} className={styles.chapterLink}>
                        {item.chapterTitle}
                      </Link>
                    </td>
                    <td>{formatAdminDate(item.completedAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
