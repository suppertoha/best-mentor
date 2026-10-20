import { z } from 'zod';

export const createSectionSchema = z.object({
  title: z.string().trim().min(1, 'Введите название'),
  description: z.string().trim().min(1, 'Введите описание'),
  slug: z.string().trim(),
});

export type CreateSectionFormValues = z.infer<typeof createSectionSchema>;

export const editSectionSchema = createSectionSchema.extend({
  slug: z.string().trim().min(1, 'Введите slug'),
});

export type EditSectionFormValues = z.infer<typeof editSectionSchema>;
