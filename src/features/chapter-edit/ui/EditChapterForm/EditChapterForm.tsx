import { useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildChapterSlug } from "@/features/chapter-create/lib/buildChapterSlug";
import {
  editChapterSchema,
  type EditChapterFormValues,
} from "@/features/chapter-create/model/schema";
import { chaptersService } from "@/shared/api";
import { showSuccessToast } from "@/shared/lib/toast";
import { FormFields, type FormFieldConfig } from "@/shared/ui/form-fields";
import { Button } from "@/shared/ui";
import type { EditableChapter, UpdateChapterDto } from "../../model/types";
import styles from "./EditChapterForm.module.scss";

interface EditChapterFormProps {
  chapter: EditableChapter;
  onSuccess: () => void;
}

export const EditChapterForm = ({ chapter, onSuccess }: EditChapterFormProps) => {
  const fields = useMemo(
    () =>
      [
        {
          name: "title",
          id: `edit-chapter-title-${chapter.id}`,
          label: "Название",
          kind: "input",
          type: "text",
        },
        {
          name: "content",
          id: `edit-chapter-content-${chapter.id}`,
          label: "Содержание",
          kind: "textarea",
        },
        {
          name: "slug",
          id: `edit-chapter-slug-${chapter.id}`,
          label: "Slug",
          kind: "input",
          type: "text",
        },
      ] satisfies ReadonlyArray<FormFieldConfig<EditChapterFormValues>>,
    [chapter.id]
  );

  const { control, handleSubmit, reset } = useForm<EditChapterFormValues>({
    resolver: zodResolver(editChapterSchema),
    defaultValues: {
      title: chapter.title,
      content: "",
      slug: chapter.slug,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchChapter = async () => {
      setIsFetching(true);

      try {
        const data = await chaptersService.getBySlug(chapter.slug, controller.signal);
        reset({
          title: data.title,
          content: data.content,
          slug: data.slug,
        });
      } catch (err) {
        if (isAxiosError(err) && err.code === "ERR_CANCELED") {
          return;
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsFetching(false);
        }
      }
    };

    fetchChapter();

    return () => {
      controller.abort();
    };
  }, [chapter.slug, reset]);

  const onSubmit = async (values: EditChapterFormValues) => {
    setIsLoading(true);

    const payload: UpdateChapterDto = {
      title: values.title.trim(),
      content: values.content.trim(),
      slug: buildChapterSlug(values.title, values.slug),
    };

    try {
      await chaptersService.update(chapter.id, payload);
      showSuccessToast("Глава обновлена");
      onSuccess();
    } catch {
      // handled by API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <p className={styles.status}>Загрузка...</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormFields fields={fields} control={control} />
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        showLoader
        loadingText="Сохранение..."
      >
        Сохранить
      </Button>
    </form>
  );
};
