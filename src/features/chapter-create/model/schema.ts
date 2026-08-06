import { z } from "zod";

export const createChapterSchema = z.object({
  title: z.string().trim().min(1, "Введите название"),
  content: z.string().trim().min(1, "Введите содержание"),
  slug: z.string().trim(),
});

export type CreateChapterFormValues = z.infer<typeof createChapterSchema>;

export const editChapterSchema = createChapterSchema.extend({
  slug: z.string().trim().min(1, "Введите slug"),
});

export type EditChapterFormValues = z.infer<typeof editChapterSchema>;
