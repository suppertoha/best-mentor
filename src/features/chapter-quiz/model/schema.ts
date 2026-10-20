import { z } from 'zod';

const answerSchema = z
  .string({ message: 'Выберите вариант ответа' })
  .min(1, 'Выберите вариант ответа');

export const createQuizFormSchema = (questionIds: number[]) =>
  z
    .object({
      answers: z.record(z.string(), answerSchema),
    })
    .superRefine((values, ctx) => {
      questionIds.forEach((id) => {
        const key = String(id);

        if (!values.answers[key]) {
          ctx.addIssue({
            code: 'custom',
            message: 'Выберите вариант ответа',
            path: ['answers', key],
          });
        }
      });
    });

export type QuizFormValues = {
  answers: Record<string, string>;
};
