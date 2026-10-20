import { z } from 'zod';

export const createChapterSchema = z.object({
  title: z.string().trim().min(1, 'Введите название'),
  slug: z.string().trim(),
});

export type CreateChapterFormValues = z.infer<typeof createChapterSchema>;

export const editChapterMetaSchema = z.object({
  title: z.string().trim().min(1, 'Введите название'),
  slug: z.string().trim().min(1, 'Введите slug'),
});

export type EditChapterMetaFormValues = z.infer<typeof editChapterMetaSchema>;
