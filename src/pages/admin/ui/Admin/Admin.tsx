import { useCallback, useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { isAdmin } from "@/entities/user";
import { adminService } from "@/shared/api";
import type {
  AdminChapterStatsItemDto,
  AdminStatsOverviewDto,
  AdminUserStatsItemDto,
  AdminUsersSortBy,
  AdminUsersSortOrder,
} from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { Button } from "@/shared/ui";
import {
  ADMIN_TAB_PARAM,
  ADMIN_TABS,
  ADMIN_TOP_CHAPTERS_LIMIT,
  type AdminTab,
  isAdminTab,
} from "../../lib/adminTabs";
import { formatAdminPercent } from "../../lib/formatAdmin";
import { AdminChapterStatsTable } from "./AdminChapterStatsTable";
import { AdminStudentsTable } from "./AdminStudentsTable";
import { bem } from "@/shared/lib/bem";
import styles from "./Admin.module.scss";

const b = bem(styles, "admin-page");

const USERS_LIMIT = 10;

type FetchOptions = {
  silent?: boolean;
};

export const Admin = () => {
  const user = useAppSelector((state) => state.user.user);
  const admin = isAdmin(user);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = useMemo<AdminTab>(() => {
    const tab = searchParams.get(ADMIN_TAB_PARAM);
    return isAdminTab(tab) ? tab : "overview";
  }, [searchParams]);

  const [overview, setOverview] = useState<AdminStatsOverviewDto | null>(null);
  const [chapterStats, setChapterStats] = useState<AdminChapterStatsItemDto[]>([]);
  const [users, setUsers] = useState<AdminUserStatsItemDto[]>([]);
  const [usersPage, setUsersPage] = useState(1);
  const [usersTotalPages, setUsersTotalPages] = useState(1);
  const [usersTotal, setUsersTotal] = useState(0);
  const [sortBy, setSortBy] = useState<AdminUsersSortBy>("createdAt");
  const [sortOrder, setSortOrder] = useState<AdminUsersSortOrder>("desc");

  const [isOverviewLoading, setIsOverviewLoading] = useState(true);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);

  const topChapters = useMemo(
    () => chapterStats.slice(0, ADMIN_TOP_CHAPTERS_LIMIT),
    [chapterStats],
  );

  const setActiveTab = (tab: AdminTab) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(ADMIN_TAB_PARAM, tab);
        return next;
      },
      { replace: true },
    );
  };

  const handleApiError = (err: unknown) => {
    if (isAxiosError(err) && err.code === "ERR_CANCELED") {
      return true;
    }

    if (isAxiosError(err) && err.response?.status === 403) {
      setAccessDenied(true);
      return true;
    }

    return false;
  };

  const fetchOverviewData = useCallback(async (signal?: AbortSignal, options?: FetchOptions) => {
    try {
      setError(null);
      setAccessDenied(false);

      if (!options?.silent) {
        setIsOverviewLoading(true);
      }

      const [overviewData, chaptersData] = await Promise.all([
        adminService.getStatsOverview(signal),
        adminService.getChapterStats(signal),
      ]);

      setOverview(overviewData);
      setChapterStats(chaptersData.items);
    } catch (err) {
      if (handleApiError(err)) {
        return;
      }

      setError("Не удалось загрузить данные админки");
    } finally {
      if (!signal?.aborted && !options?.silent) {
        setIsOverviewLoading(false);
      }
    }
  }, []);

  const fetchUsersData = useCallback(
    async (page: number, signal?: AbortSignal, options?: FetchOptions) => {
      try {
        setError(null);
        setAccessDenied(false);

        if (!options?.silent) {
          setIsUsersLoading(true);
        }

        const usersData = await adminService.getUsers(
          { page, limit: USERS_LIMIT, sortBy, sortOrder },
          signal,
        );

        setUsers(usersData.items);
        setUsersPage(usersData.page);
        setUsersTotalPages(usersData.totalPages);
        setUsersTotal(usersData.total);
      } catch (err) {
        if (handleApiError(err)) {
          return;
        }

        setError("Не удалось загрузить список студентов");
      } finally {
        if (!signal?.aborted && !options?.silent) {
          setIsUsersLoading(false);
        }
      }
    },
    [sortBy, sortOrder],
  );

  useEffect(() => {
    if (!admin) {
      return;
    }

    const controller = new AbortController();

    void fetchOverviewData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [admin, fetchOverviewData]);

  useEffect(() => {
    if (!admin || activeTab !== "students") {
      return;
    }

    const controller = new AbortController();

    void fetchUsersData(usersPage, controller.signal);

    return () => {
      controller.abort();
    };
  }, [admin, activeTab, fetchUsersData, usersPage]);

  const handleColumnSort = (column: AdminUsersSortBy) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }

    setUsersPage(1);
  };

  const handleRefresh = async () => {
    const controller = new AbortController();

    setIsRefreshing(true);

    try {
      await fetchOverviewData(controller.signal, { silent: true });

      if (activeTab === "students") {
        await fetchUsersData(usersPage, controller.signal, { silent: true });
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsRefreshing(false);
      }
    }
  };

  if (!admin) {
    return <Navigate to={ROUTES.sections} replace />;
  }

  if (accessDenied) {
    return <p className={b.el("error")}>Нет доступа к админ-панели</p>;
  }

  if (isOverviewLoading && !overview) {
    return <p className={b.el("status")}>Загрузка...</p>;
  }

  if (error && !overview) {
    return <p className={b.el("error")}>{error}</p>;
  }

  if (!overview) {
    return null;
  }

  return (
    <div className={b.block()}>
      <div className={b.el("top")}>
        <div>
          <Link to={ROUTES.sections} className={b.el("back-link")}>
            ← К разделам
          </Link>
          <h1 className={b.el("title")}>Админ-панель</h1>
          <p className={b.el("subtitle")}>Статистика платформы и прогресс студентов</p>
        </div>
        <div className={b.el("top-actions")}>
          <Button
            variant="secondary"
            size="sm"
            type="button"
            isLoading={isRefreshing}
            loadingText="Обновление..."
            onClick={() => void handleRefresh()}
          >
            Обновить
          </Button>
        </div>
      </div>

      <div className={b.el("tabs")} role="tablist" aria-label="Разделы админ-панели">
        {ADMIN_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? b.el("tab--active") : b.el("tab")}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === "students" && overview.totalStudents > 0 && (
              <span className={b.el("tab-count")}>{overview.totalStudents}</span>
            )}
            {tab.id === "chapters" && chapterStats.length > 0 && (
              <span className={b.el("tab-count")}>{chapterStats.length}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className={b.el("tab-panel")} role="tabpanel">
          <section className={b.el("section")}>
            <h2 className={b.el("section-title")}>Общая сводка</h2>
            <div className={b.el("cards")}>
              <article className={b.el("card")}>
                <p className={b.el("card-label")}>Студентов</p>
                <p className={b.el("card-value")}>{overview.totalStudents}</p>
                <p className={b.el("card-hint")}>
                  активных {overview.activeStudents} · неактивных {overview.inactiveStudents}
                </p>
              </article>
              <article className={b.el("card")}>
                <p className={b.el("card-label")}>Средний прогресс</p>
                <p className={b.el("card-value")}>
                  {formatAdminPercent(overview.averageCompletionPercent)}
                </p>
                <p className={b.el("card-hint")}>глав с тестом: {overview.totalQuizChapters}</p>
              </article>
              <article className={b.el("card")}>
                <p className={b.el("card-label")}>Завершений тестов</p>
                <p className={b.el("card-value")}>{overview.totalCompletions}</p>
                <p className={b.el("card-hint")}>
                  за 7 дн. {overview.completionsLast7Days} · за 30 дн.{" "}
                  {overview.completionsLast30Days}
                </p>
              </article>
              <article className={b.el("card")}>
                <p className={b.el("card-label")}>Регистрации</p>
                <p className={b.el("card-value")}>{overview.signupsLast30Days}</p>
                <p className={b.el("card-hint")}>
                  за 30 дн. · за 7 дн. {overview.signupsLast7Days}
                </p>
              </article>
            </div>
          </section>

          <section className={b.el("section")}>
            <div className={b.el("section-header")}>
              <h2 className={b.el("section-title")}>Проблемные главы</h2>
              {chapterStats.length > ADMIN_TOP_CHAPTERS_LIMIT && (
                <Button
                  variant="link"
                  size="sm"
                  type="button"
                  onClick={() => setActiveTab("chapters")}
                >
                  Все главы ({chapterStats.length})
                </Button>
              )}
            </div>
            <p className={b.el("section-description")}>
              Топ-{ADMIN_TOP_CHAPTERS_LIMIT} глав с самым низким процентом прохождения
            </p>
            <AdminChapterStatsTable items={topChapters} />
          </section>
        </div>
      )}

      {activeTab === "chapters" && (
        <div className={b.el("tab-panel")} role="tabpanel">
          <section className={b.el("section")}>
            <div className={b.el("section-header")}>
              <h2 className={b.el("section-title")}>Статистика по главам</h2>
              <p className={b.el("section-meta")}>Всего: {chapterStats.length}</p>
            </div>
            <p className={b.el("section-description")}>
              Отсортировано по возрастанию процента прохождения
            </p>
            <AdminChapterStatsTable items={chapterStats} />
          </section>
        </div>
      )}

      {activeTab === "students" && (
        <div className={b.el("tab-panel")} role="tabpanel">
          <section className={b.el("section")}>
            <div className={b.el("section-header")}>
              <h2 className={b.el("section-title")}>Студенты</h2>
              <p className={b.el("section-meta")}>Всего: {usersTotal}</p>
            </div>
            <p className={b.el("section-description")}>
              Нажми на заголовок колонки, чтобы отсортировать
            </p>

            {error && <p className={b.el("inline-error")}>{error}</p>}

            {isUsersLoading && users.length === 0 ? (
              <p className={b.el("status")}>Загрузка студентов...</p>
            ) : (
              <AdminStudentsTable
                users={users}
                sortBy={sortBy}
                sortOrder={sortOrder}
                usersPage={usersPage}
                usersTotalPages={usersTotalPages}
                isLoading={isUsersLoading}
                onSort={handleColumnSort}
                onPageChange={setUsersPage}
              />
            )}
          </section>
        </div>
      )}
    </div>
  );
};
