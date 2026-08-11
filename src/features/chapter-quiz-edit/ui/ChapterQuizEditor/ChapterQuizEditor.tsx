import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizService } from "@/shared/api";
import { showSuccessToast } from "@/shared/lib/toast";
import { Button, Input } from "@/shared/ui";
import {
  createEmptyQuestion,
  createEmptyQuizValues,
  mapAdminQuizToFormValues,
  quizEditorSchema,
  type QuizEditorFormValues,
} from "../../model/schema";
import styles from "./ChapterQuizEditor.module.scss";

interface ChapterQuizEditorProps {
  chapterId: number;
  hasQuiz: boolean;
  onSaved: (hasQuiz: boolean) => void;
  onCancel: () => void;
}

export const ChapterQuizEditor = ({
  chapterId,
  hasQuiz,
  onSaved,
  onCancel,
}: ChapterQuizEditorProps) => {
  const [isLoading, setIsLoading] = useState(hasQuiz);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, control, formState } =
    useForm<QuizEditorFormValues>({
      resolver: zodResolver(quizEditorSchema),
      defaultValues: createEmptyQuizValues(),
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const questions = watch("questions");

  useEffect(() => {
    if (!hasQuiz) {
      reset(createEmptyQuizValues());
      setLoadError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchQuiz = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const data = await quizService.getAdmin(chapterId, controller.signal);
        reset(mapAdminQuizToFormValues(data.questions));
      } catch (err) {
        if (isAxiosError(err) && err.code === "ERR_CANCELED") {
          return;
        }

        if (isAxiosError(err) && err.response?.status === 404) {
          reset(createEmptyQuizValues());
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
  }, [chapterId, hasQuiz, reset]);

  const handleCorrectOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = questions[questionIndex]?.options ?? [];

    setValue(
      `questions.${questionIndex}.options`,
      currentOptions.map((option, index) => ({
        ...option,
        isCorrect: index === optionIndex,
      })),
    );
  };

  const onSubmit = async (values: QuizEditorFormValues) => {
    setIsSaving(true);

    try {
      await quizService.putAdmin(chapterId, {
        questions: values.questions.map((question) => ({
          text: question.text,
          options: question.options,
        })),
      });
      showSuccessToast("Тест сохранён");
      onSaved(true);
    } catch {
      // handled by API interceptor
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!hasQuiz) {
      onCancel();
      return;
    }

    const confirmed = window.confirm(
      "Удалить тест? Прогресс студентов по этой главе будет сброшен.",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await quizService.deleteAdmin(chapterId);
      showSuccessToast("Тест удалён");
      onSaved(false);
    } catch {
      // handled by API interceptor
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <p className={styles.status}>Загрузка теста...</p>;
  }

  if (loadError) {
    return <p className={styles.error}>{loadError}</p>;
  }

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.questionsList}>
        {fields.map((field, questionIndex) => {
          const options = questions[questionIndex]?.options ?? [];

          return (
            <section key={field.id} className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <h2 className={styles.questionTitle}>Вопрос {questionIndex + 1}</h2>

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(questionIndex)}
                  >
                    Удалить вопрос
                  </Button>
                )}
              </div>

              <Input
                id={`quiz-question-${questionIndex}`}
                label="Текст вопроса"
                {...register(`questions.${questionIndex}.text`)}
                error={formState.errors.questions?.[questionIndex]?.text?.message}
              />

              <div className={styles.optionsBlock}>
                <p className={styles.optionsTitle}>Варианты ответа (отметь правильный)</p>

                {options.map((option, optionIndex) => (
                  <div key={`option-${questionIndex}-${optionIndex}`} className={styles.optionRow}>
                    <label className={styles.correctLabel}>
                      <input
                        type="radio"
                        name={`correct-option-${questionIndex}`}
                        checked={option.isCorrect}
                        onChange={() => handleCorrectOption(questionIndex, optionIndex)}
                      />
                      <span>Верный</span>
                    </label>

                    <Input
                      id={`quiz-option-${questionIndex}-${optionIndex}`}
                      label={`Вариант ${optionIndex + 1}`}
                      {...register(`questions.${questionIndex}.options.${optionIndex}.text`)}
                      error={
                        formState.errors.questions?.[questionIndex]?.options?.[optionIndex]?.text
                          ?.message
                      }
                    />

                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={styles.removeOptionBtn}
                        onClick={() => {
                          const nextOptions = options
                            .filter((_, index) => index !== optionIndex)
                            .map((item) => ({ ...item }));

                          if (!nextOptions.some((item) => item.isCorrect) && nextOptions[0]) {
                            nextOptions[0] = { ...nextOptions[0], isCorrect: true };
                          }

                          setValue(`questions.${questionIndex}.options`, nextOptions);
                        }}
                      >
                        Удалить
                      </Button>
                    )}
                  </div>
                ))}

                {formState.errors.questions?.[questionIndex]?.options?.message && (
                  <p className={styles.error} role="alert">
                    {formState.errors.questions[questionIndex]?.options?.message}
                  </p>
                )}

                {options.length < 4 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setValue(`questions.${questionIndex}.options`, [
                        ...options,
                        { text: "", isCorrect: false },
                      ]);
                    }}
                  >
                    + Вариант
                  </Button>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {formState.errors.questions?.message && (
        <p className={styles.error} role="alert">
          {formState.errors.questions.message}
        </p>
      )}

      <Button
        type="button"
        variant="secondary"
        onClick={() => append(createEmptyQuestion())}
      >
        + Вопрос
      </Button>

      <div className={styles.actions}>
        {hasQuiz && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleDelete}
            isLoading={isDeleting}
            loadingText="Удаление..."
          >
            Удалить тест
          </Button>
        )}

        <div className={styles.actionsRight}>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit" isLoading={isSaving} loadingText="Сохранение...">
            Сохранить тест
          </Button>
        </div>
      </div>
    </form>
  );
};
