import { Link } from "react-router-dom";
import type { AdminUserStatsItemDto, AdminUsersSortBy, AdminUsersSortOrder } from "@/shared/api";
import { getAdminUserPath } from "@/shared/config";
import { Button } from "@/shared/ui";
import { formatAdminDate, formatAdminPercent, getAdminUserLabel } from "../../lib/formatAdmin";
import styles from "./Admin.module.scss";

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
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Студент</th>
            <th>Email</th>
            {SORTABLE_COLUMNS.map((column) => (
              <th key={column.key}>
                <button
                  type="button"
                  className={styles.sortableHeader}
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
              <td colSpan={6} className={styles.emptyCell}>
                Студентов пока нет
              </td>
            </tr>
          ) : (
            users.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link to={getAdminUserPath(item.id)} className={styles.userLink}>
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
      <div className={styles.pagination}>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          disabled={usersPage <= 1 || isLoading}
          onClick={() => onPageChange(Math.max(1, usersPage - 1))}
        >
          Назад
        </Button>
        <span className={styles.paginationMeta}>
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
