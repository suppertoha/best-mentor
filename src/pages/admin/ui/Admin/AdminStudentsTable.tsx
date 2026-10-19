import { Link } from "react-router-dom";
import type { AdminUserStatsItemDto, AdminUsersSortBy, AdminUsersSortOrder } from "@/shared/api";
import { getAdminUserPath } from "@/shared/config";
import { Button } from "@/shared/ui";
import { formatAdminDate, formatAdminPercent, getAdminUserLabel } from "../../lib/formatAdmin";
import { bem } from "@/shared/lib/bem";
import styles from "./Admin.module.scss";

const b = bem(styles, "admin-page");

type AdminStudentsTableProps = {
  users: AdminUserStatsItemDto[];
  sortBy: AdminUsersSortBy;
  sortOrder: AdminUsersSortOrder;
  usersPage: number;
  usersTotalPages: number;
  isLoading: boolean;
  onSort: (column: AdminUsersSortBy) => void;
  onPageChange: (page: number) => void;
};

const SORTABLE_COLUMNS: { key: AdminUsersSortBy; label: string }[] = [
  { key: "completionPercent", label: "Прогресс" },
  { key: "completedChapters", label: "Главы" },
  { key: "createdAt", label: "Регистрация" },
  { key: "lastActivityAt", label: "Активность" },
];

const getSortIndicator = (
  column: AdminUsersSortBy,
  sortBy: AdminUsersSortBy,
  sortOrder: AdminUsersSortOrder,
) => {
  if (sortBy !== column) {
    return null;
  }

  return sortOrder === "asc" ? " ↑" : " ↓";
};

export const AdminStudentsTable = ({
  users,
  sortBy,
  sortOrder,
  usersPage,
  usersTotalPages,
  isLoading,
  onSort,
  onPageChange,
}: AdminStudentsTableProps) => (
  <>
    <div className={b.el("table-wrap")}>
      <table className={b.el("table")}>
        <thead>
          <tr>
            <th>Студент</th>
            <th>Email</th>
            {SORTABLE_COLUMNS.map((column) => (
              <th key={column.key}>
                <button
                  type="button"
                  className={b.el("sortable-header")}
                  onClick={() => onSort(column.key)}
                  aria-sort={
                    sortBy === column.key
                      ? sortOrder === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  {column.label}
                  {getSortIndicator(column.key, sortBy, sortOrder)}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className={b.el("empty-cell")}>
                Студентов пока нет
              </td>
            </tr>
          ) : (
            users.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link to={getAdminUserPath(item.id)} className={b.el("user-link")}>
                    {getAdminUserLabel(item.firstName, item.lastName, item.email)}
                  </Link>
                </td>
                <td>{item.email}</td>
                <td>{formatAdminPercent(item.completionPercent)}</td>
                <td>
                  {item.completedChapters} / {item.totalQuizChapters}
                </td>
                <td>{formatAdminDate(item.createdAt)}</td>
                <td>{formatAdminDate(item.lastActivityAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {usersTotalPages > 1 && (
      <div className={b.el("pagination")}>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          disabled={usersPage <= 1 || isLoading}
          onClick={() => onPageChange(Math.max(1, usersPage - 1))}
        >
          Назад
        </Button>
        <span className={b.el("pagination-meta")}>
          Страница {usersPage} из {usersTotalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          disabled={usersPage >= usersTotalPages || isLoading}
          onClick={() => onPageChange(Math.min(usersTotalPages, usersPage + 1))}
        >
          Вперёд
        </Button>
      </div>
    )}
  </>
);
