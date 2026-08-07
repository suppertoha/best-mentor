import { api } from "../client";
import type {
  ChapterDetail,
  CreateChapterDto,
  ReorderDto,
  UpdateChapterDto,
} from "../dto/chapters.dto";
import type { Section } from "../dto/sections.dto";

export const chaptersService = {
  async getBySlug(slug: string, signal?: AbortSignal) {
    const { data } = await api.get<ChapterDetail>(`/chapters/${slug}`, {
      signal,
      errorMessage: "Не удалось загрузить главу",
    });
    return data;
  },

  async create(sectionId: number, payload: CreateChapterDto) {
    const { data } = await api.post(`/sections/${sectionId}/chapters`, payload, {
      errorMessage: "Не удалось создать главу",
    });
    return data;
  },

  async update(id: number, payload: UpdateChapterDto) {
    await api.patch(`/chapters/${id}`, payload, {
      errorMessage: "Не удалось обновить главу",
    });
  },

  async delete(id: number) {
    await api.delete(`/chapters/${id}`, {
      errorMessage: "Не удалось удалить главу",
    });
  },

  async reorder(sectionId: number, ids: number[]) {
    const { data } = await api.patch<Section>(
      `/sections/${sectionId}/chapters/reorder`,
      { ids } satisfies ReorderDto,
      { errorMessage: "Не удалось изменить порядок глав" },
    );
    return data;
  },
};
