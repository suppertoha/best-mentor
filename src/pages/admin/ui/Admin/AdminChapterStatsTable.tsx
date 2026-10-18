import { Link } from "react-router-dom";
import type { AdminChapterStatsItemDto } from "@/shared/api";
import { getChapterPath } from "@/shared/config";
import { formatAdminPercent } from "../../lib/formatAdmin";
import styles from "./Admin.module.scss";

type AdminChapterStatsTableProps = {
  items: AdminChapterStatsItemDto[];
  emptyMessage?: string;
};

export const AdminChapterStatsTable = ({
  items,
  emptyMessage = "Пока нет данных по главам",
}: AdminChapterStatsTableProps) => (
  <div className={styles.tableWrap}>
    <table className={styles.table}>
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
            <td colSpan={5} className={styles.emptyCell}>
              {emptyMessage}
            </td>
          </tr>
        ) : (
          items.map((item) => (
            <tr key={item.chapterId}>
              <td>{item.sectionTitle}</td>
              <td>
                <Link to={getChapterPath(item.chapterSlug)} className={styles.chapterLink}>
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
