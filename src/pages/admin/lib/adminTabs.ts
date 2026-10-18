export type AdminTab = "overview" | "chapters" | "students";

export const ADMIN_TAB_PARAM = "tab";

export const ADMIN_TABS: { id: AdminTab; label: string }[] = [
  { id: "overview", label: "Обзор" },
  { id: "chapters", label: "Главы" },
  { id: "students", label: "Студенты" },
];

export const ADMIN_TOP_CHAPTERS_LIMIT = 10;

export const isAdminTab = (value: string | null): value is AdminTab =>
  value === "overview" || value === "chapters" || value === "students";

export const getAdminPath = (tab: AdminTab = "overview") =>
  tab === "overview" ? "/admin" : `/admin?${ADMIN_TAB_PARAM}=${tab}`;
