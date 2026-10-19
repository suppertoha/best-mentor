import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizService } from "@/shared/api";
import { showSuccessToast } from "@/shared/lib/toast";
import { Button, ConfirmDialog, Input } from "@/shared/ui";
import {
  createEmptyQuestion,
  createEmptyQuizValues,
  mapAdminQuizToFormValues,
  normalizeQuestionOptions,
  quizEditorSchema,
  type QuizEditorFormValues,
} from "../../model/schema";
import { bem } from "@/shared/lib/bem";
import styles from "./ChapterQuizEditor.module.scss";

const b = bem(styles, "chapter-quiz-editor");

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, getValues, watch, control, formState } =
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

  const updateQuestionOptions = (
    questionIndex: number,
    nextOptions: QuizEditorFormValues["questions"][number]["options"],
  ) => {
    setValue(`questions.${questionIndex}.options`, normalizeQuestionOptions(nextOptions), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleCorrectOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = getValues(`questions.${questionIndex}.options`);

    updateQuestionOptions(
      questionIndex,
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
          options: normalizeQuestionOptions(question.options),
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

  const handleDeleteClick = () => {
    if (!hasQuiz) {
      onCancel();
      return;
    }

    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);

    try {
      await quizService.deleteAdmin(chapterId);
      showSuccessToast("Тест удалён");
      setIsDeleteDialogOpen(false);
      onSaved(false);
    } catch {
      // handled by API interceptor
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <p className={b.el("status")}>Загрузка теста...</p>;
  }

  if (loadError) {
    return <p className={b.el("error")}>{loadError}</p>;
  }

  return (
    <form className={b.block()} onSubmit={handleSubmit(onSubmit)}>
      <div className={b.el("questions-list")}>
        {fields.map((field, questionIndex) => {
          const options = questions[questionIndex]?.options ?? [];
          const correctOptionIndex = options.findIndex((option) => option.isCorrect);

          return (
            <section key={field.id} className={b.el("question-card")}>
              <div className={b.el("question-header")}>
                <h2 className={b.el("question-title")}>Вопрос {questionIndex + 1}</h2>

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

              <div className={b.el("options-block")}>
                <p className={b.el("options-title")}>Варианты ответа (отметь правильный)</p>

                {options.map((_, optionIndex) => (
                  <div key={`option-${questionIndex}-${optionIndex}`} className={b.el("option-row")}>
                    <label className={b.el("correct-label")}>
                      <input
                        type="radio"
                        name={`correct-option-${questionIndex}`}
                        value={optionIndex}
                        checked={correctOptionIndex === optionIndex}
                        onChange={() => handleCorrectOption(questionIndex, optionIndex)}
                      />
                      <span>Сделать правильным</span>
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

                    <input
                      type="hidden"
                      {...register(`questions.${questionIndex}.options.${optionIndex}.isCorrect`)}
                    />

                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={b.el("remove-option-btn")}
                        onClick={() => {
                          const nextOptions = options
                            .filter((_, index) => index !== optionIndex)
                            .map((item) => ({ ...item }));

                          updateQuestionOptions(questionIndex, nextOptions);
                        }}
                      >
                        Удалить
                      </Button>
                    )}
                  </div>
                ))}

                {formState.errors.questions?.[questionIndex]?.options?.message && (
                  <p className={b.el("error")} role="alert">
                    {formState.errors.questions[questionIndex]?.options?.message}
                  </p>
                )}

                {options.length < 4 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      updateQuestionOptions(questionIndex, [
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
        <p className={b.el("error")} role="alert">
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

      <div className={b.el("actions")}>
        {hasQuiz && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleDeleteClick}
            isLoading={isDeleting}
            loadingText="Удаление..."
          >
            Удалить тест
          </Button>
        )}

        <div className={b.el("actions-right")}>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit" isLoading={isSaving} loadingText="Сохранение...">
            Сохранить тест
          </Button>
        </div>
      </div>
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Удалить тест?"
        message="Прогресс студентов по этой главе будет сброшен."
        onConfirm={() => void handleDeleteConfirm()}
        onClose={() => {
          if (!isDeleting) setIsDeleteDialogOpen(false);
        }}
        isLoading={isDeleting}
      />
    </form>
  );
};
