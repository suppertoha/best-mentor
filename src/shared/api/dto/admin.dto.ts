export interface AdminStatsOverviewDto {
  totalStudents: number;
  totalAdmins: number;
  activeStudents: number;
  inactiveStudents: number;
  totalQuizChapters: number;
  totalCompletions: number;
  averageCompletionPercent: number;
  signupsLast7Days: number;
  signupsLast30Days: number;
  completionsLast7Days: number;
  completionsLast30Days: number;
}

export interface AdminChapterStatsItemDto {
  chapterId: number;
  chapterTitle: string;
  chapterSlug: string;
  sectionId: number;
  sectionTitle: string;
  completionCount: number;
  totalStudents: number;
  completionRate: number;
}

export interface AdminChapterStatsDto {
  items: AdminChapterStatsItemDto[];
}

export interface AdminUserStatsItemDto {
  id: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt: string;
  completedChapters: number;
  totalQuizChapters: number;
  completionPercent: number;
  lastActivityAt?: string | null;
}

export interface AdminUsersPageDto {
  items: AdminUserStatsItemDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminSectionProgressDto {
  sectionId: number;
  sectionTitle: string;
  completedChapters: number;
  totalQuizChapters: number;
  completionPercent: number;
}

export interface AdminRecentCompletionDto {
  chapterId: number;
  chapterTitle: string;
  chapterSlug: string;
  sectionTitle: string;
  completedAt: string;
}

export interface AdminUserDetailDto {
  id: number;
  email: string;
  role: "STUDENT" | "ADMIN";
  firstName?: string | null;
  lastName?: string | null;
  bio?: string | null;
  githubUrl?: string | null;
  telegramUsername?: string | null;
  websiteUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  completedChapters: number;
  totalQuizChapters: number;
  completionPercent: number;
  lastActivityAt?: string | null;
  firstCompletionAt?: string | null;
  sectionProgress: AdminSectionProgressDto[];
  recentCompletions: AdminRecentCompletionDto[];
}

export type AdminUsersSortBy =
  | "createdAt"
  | "completedChapters"
  | "lastActivityAt"
  | "completionPercent";

export type AdminUsersSortOrder = "asc" | "desc";

export interface GetAdminUsersParams {
  page?: number;
  limit?: number;
  sortBy?: AdminUsersSortBy;
  sortOrder?: AdminUsersSortOrder;
}
