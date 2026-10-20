import { api } from '../client';
import type {
  PutQuizDto,
  QuizAdmin,
  QuizStudent,
  QuizSubmitResult,
  SubmitQuizDto,
} from '../dto/quiz.dto';

export const quizService = {
  async getByChapterSlug(slug: string, signal?: AbortSignal) {
    const { data } = await api.get<QuizStudent>(`/chapters/${slug}/quiz`, {
      signal,
      errorMessage: 'Не удалось загрузить тест',
    });
    return data;
  },

  async submit(slug: string, payload: SubmitQuizDto) {
    const { data } = await api.post<QuizSubmitResult>(`/chapters/${slug}/quiz/submit`, payload, {
      errorMessage: 'Не удалось отправить ответы',
    });
    return data;
  },

  async getAdmin(chapterId: number, signal?: AbortSignal) {
    const { data } = await api.get<QuizAdmin>(`/chapters/${chapterId}/quiz`, {
      signal,
      errorMessage: 'Не удалось загрузить тест',
    });
    return data;
  },

  async putAdmin(chapterId: number, payload: PutQuizDto) {
    await api.put(`/chapters/${chapterId}/quiz`, payload, {
      errorMessage: 'Не удалось сохранить тест',
    });
  },

  async deleteAdmin(chapterId: number) {
    await api.delete(`/chapters/${chapterId}/quiz`, {
      errorMessage: 'Не удалось удалить тест',
    });
  },
};
