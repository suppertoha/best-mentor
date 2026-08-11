import { api } from "../client";
import type {
  CreateSectionDto,
  ReorderDto,
  Section,
  UpdateSectionDto,
} from "../dto/sections.dto";

export const sectionsService = {
  async getAll(signal?: AbortSignal) {
    const { data } = await api.get<Section[]>("/sections", {
      signal,
      errorMessage: "Не удалось загрузить разделы",
    });
    return data;
  },

  async getBySlug(slug: string, signal?: AbortSignal) {
    const { data } = await api.get<Section>(`/sections/${slug}`, {
      signal,
      errorMessage: "Не удалось загрузить раздел",
    });
    return data;
  },

  async create(payload: CreateSectionDto) {
    const { data } = await api.post<Section>("/sections", payload, {
      errorMessage: "Не удалось создать раздел",
    });
    return data;
  },

  async update(id: number, payload: UpdateSectionDto) {
    const { data } = await api.patch<Section>(`/sections/${id}`, payload, {
      errorMessage: "Не удалось обновить раздел",
    });
    return data;
  },

  async delete(id: number) {
    await api.delete(`/sections/${id}`, {
      errorMessage: "Не удалось удалить раздел",
    });
  },

  async reorder(ids: number[]) {
    const { data } = await api.patch<Section[]>(
      "/sections/reorder",
      { ids } satisfies ReorderDto,
      { errorMessage: "Не удалось изменить порядок разделов" },
    );
    return data;
  },
};
