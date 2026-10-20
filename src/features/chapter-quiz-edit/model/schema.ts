import { z } from 'zod';

const optionSchema = z.object({
  text: z.string().trim().min(1, 'Введите текст варианта'),
  isCorrect: z.boolean(),
});

const questionSchema = z
  .object({
    text: z.string().trim().min(1, 'Введите текст вопроса'),
    options: z.array(optionSchema).min(2, 'Минимум 2 варианта').max(4),
  })
  .superRefine((question, ctx) => {
    const correctCount = question.options.filter((option) => option.isCorrect).length;

    if (correctCount !== 1) {
      ctx.addIssue({
        code: 'custom',
        message: 'Отметь ровно один правильный вариант',
        path: ['options'],
      });
    }
  });

export const quizEditorSchema = z.object({
  questions: z.array(questionSchema).min(1, 'Добавьте хотя бы один вопрос'),
});

export type QuizEditorFormValues = z.infer<typeof quizEditorSchema>;

type QuizOptionInput = {
  text: string;
  isCorrect: boolean;
};

export const normalizeQuestionOptions = (
  options: QuizOptionInput[],
): QuizEditorFormValues['questions'][number]['options'] => {
  if (options.length === 0) {
    return [
      { text: '', isCorrect: true },
      { text: '', isCorrect: false },
    ];
  }

  const correctIndex = options.findIndex((option) => option.isCorrect);

  return options.map((option, index) => ({
    text: option.text,
    isCorrect: index === (correctIndex === -1 ? 0 : correctIndex),
  }));
};

export const createEmptyQuestion = () => ({
  text: '',
  options: normalizeQuestionOptions([
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
  ]),
});

export const createEmptyQuizValues = (): QuizEditorFormValues => ({
  questions: [createEmptyQuestion()],
});

export const mapAdminQuizToFormValues = (
  questions: Array<{ text: string; options: Array<{ text: string; isCorrect: boolean }> }>,
): QuizEditorFormValues => {
  if (questions.length === 0) {
    return createEmptyQuizValues();
  }

  return {
    questions: questions.map((question) => ({
      text: question.text,
      options: normalizeQuestionOptions(question.options),
    })),
  };
};
