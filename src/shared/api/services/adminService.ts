import { api } from "../client";
import type {
  AdminChapterStatsDto,
  AdminStatsOverviewDto,
  AdminUserDetailDto,
  AdminUsersPageDto,
  GetAdminUsersParams,
} from "../dto/admin.dto";

export const adminService = {
  async getStatsOverview(signal?: AbortSignal) {
    const { data } = await api.get<AdminStatsOverviewDto>("/admin/stats/overview", {
      signal,
      errorMessage: "Не удалось загрузить сводку",
    });
    return data;
  },

  async getChapterStats(signal?: AbortSignal) {
    const { data } = await api.get<AdminChapterStatsDto>("/admin/stats/chapters", {
      signal,
      errorMessage: "Не удалось загрузить статистику по главам",
    });
    return data;
  },

  async getUsers(params: GetAdminUsersParams = {}, signal?: AbortSignal) {
    const { data } = await api.get<AdminUsersPageDto>("/admin/users", {
      signal,
      params,
      errorMessage: "Не удалось загрузить список студентов",
    });
    return data;
  },

  async getUserById(id: number, signal?: AbortSignal) {
    const { data } = await api.get<AdminUserDetailDto>(`/admin/users/${id}`, {
      signal,
      errorMessage: "Не удалось загрузить данные студента",
    });
    return data;
  },
};
