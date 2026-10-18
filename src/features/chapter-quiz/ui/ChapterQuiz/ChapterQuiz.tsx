import { useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizService } from "@/shared/api";
import type { QuizQuestionStudent } from "@/shared/api";
import { showSuccessToast } from "@/shared/lib/toast";
import { Button } from "@/shared/ui";
import { createQuizFormSchema, type QuizFormValues } from "../../model/schema";
import styles from "./ChapterQuiz.module.scss";

interface ChapterQuizProps {
  chapterSlug: string;
  isCompleted: boolean;
  onCompletedChange: (isCompleted: boolean) => void;
}

export const ChapterQuiz = ({
  chapterSlug,
  isCompleted,
  onCompletedChange,
}: ChapterQuizProps) => {
  const [questions, setQuestions] = useState<QuizQuestionStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questionIds = useMemo(
    () => questions.map((question) => question.id),
    [questions],
  );

  const schema = useMemo(
    () => createQuizFormSchema(questionIds),
    [questionIds],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { answers: {} },
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuiz = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const data = await quizService.getByChapterSlug(
          chapterSlug,
          controller.signal,
        );
        setQuestions(data.questions);
        reset({ answers: {} });
      } catch (err) {
        if (isAxiosError(err) && err.code === "ERR_CANCELED") {
          return;
        }

        if (isAxiosError(err) && err.response?.status === 404) {
          setQuestions([]);
          return;
        }

        setLoadError("Не удалось загрузить тест");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchQuiz();

    return () => {
      controller.abort();
    };
  }, [chapterSlug, reset]);

  const onSubmit = async (values: QuizFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const answers = Object.entries(values.answers).map(([questionId, optionId]) => ({
      questionId: Number(questionId),
      optionId: Number(optionId),
    }));

    try {
      const result = await quizService.submit(chapterSlug, { answers });

      if (result.passed) {
        showSuccessToast("Тест пройден! Глава засчитана.");
        onCompletedChange(result.isCompleted);
        setSubmitError(null);
        return;
      }

      onCompletedChange(result.isCompleted);
      setSubmitError("Есть ошибки. Проверь ответы и попробуй снова.");
      reset({ answers: {} });
    } catch {
      // handled by API interceptor
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className={styles.status}>Загрузка теста...</p>;
  }

  if (loadError) {
    return <p className={styles.error}>{loadError}</p>;
  }

  if (questions.length === 0) {
    return (
      <section className={styles.root}>
        <div className={styles.header}>
          <h2 className={styles.title}>Проверь себя</h2>
          {isCompleted && (
            <span className={styles.completedBadge}>Глава пройдена</span>
          )}
        </div>
        <p className={styles.empty}>Тест для этой главы ещё не настроен.</p>
      </section>
    );
  }

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>Проверь себя</h2>
        {isCompleted && (
          <span className={styles.completedBadge}>Глава пройдена</span>
        )}
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {questions.map((question, index) => {
          const fieldError = errors.answers?.[String(question.id)];

          return (
            <fieldset key={question.id} className={styles.question}>
              <legend className={styles.questionTitle}>
                {index + 1}. {question.text}
              </legend>

              <div className={styles.options}>
                {question.options.map((option) => (
                  <label key={option.id} className={styles.option}>
                    <input
                      type="radio"
                      value={option.id}
                      className={styles.radio}
                      {...register(`answers.${question.id}`)}
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>

              {fieldError && (
                <p className={styles.fieldError} role="alert">
                  {fieldError.message}
                </p>
              )}
            </fieldset>
          );
        })}

        {errors.answers?.message && (
          <p className={styles.submitError} role="alert">
            {String(errors.answers.message)}
          </p>
        )}

        {submitError && (
          <p className={styles.submitError} role="alert">
            {submitError}
          </p>
        )}

        <Button
          type="submit"
          isLoading={isSubmitting}
          showLoader
          loadingText="Проверка..."
        >
          Отправить на проверку
        </Button>
      </form>
    </section>
  );
};
