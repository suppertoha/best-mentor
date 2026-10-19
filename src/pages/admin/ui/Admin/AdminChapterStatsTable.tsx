import { Link } from "react-router-dom";
import type { AdminChapterStatsItemDto } from "@/shared/api";
import { getChapterPath } from "@/shared/config";
import { formatAdminPercent } from "../../lib/formatAdmin";
import { bem } from "@/shared/lib/bem";
import styles from "./Admin.module.scss";

const b = bem(styles, "admin-page");

type AdminChapterStatsTableProps = {
  items: AdminChapterStatsItemDto[];
  emptyMessage?: string;
};

export const AdminChapterStatsTable = ({
  items,
  emptyMessage = "Пока нет данных по главам",
}: AdminChapterStatsTableProps) => (
  <div className={b.el("table-wrap")}>
    <table className={b.el("table")}>
      <thead>
        <tr>
          <th>Раздел</th>
          <th>Глава</th>
          <th>Прошли</th>
          <th>Студентов</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan={5} className={b.el("empty-cell")}>
              {emptyMessage}
            </td>
          </tr>
        ) : (
          items.map((item) => (
            <tr key={item.chapterId}>
              <td>{item.sectionTitle}</td>
              <td>
                <Link to={getChapterPath(item.chapterSlug)} className={b.el("chapter-link")}>
                  {item.chapterTitle}
                </Link>
              </td>
              <td>{item.completionCount}</td>
              <td>{item.totalStudents}</td>
              <td>{formatAdminPercent(item.completionRate)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
