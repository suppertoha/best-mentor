import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildChapterSlug } from "@/features/chapter-create/lib/buildChapterSlug";
import {
  editChapterMetaSchema,
  type EditChapterMetaFormValues,
} from "@/features/chapter-create/model/schema";
import { chaptersService } from "@/shared/api";
import { showSuccessToast } from "@/shared/lib/toast";
import { FormFields, type FormFieldConfig } from "@/shared/ui/form-fields";
import { Button } from "@/shared/ui";
import type { EditableChapter, UpdateChapterDto } from "../../model/types";
import { bem } from "@/shared/lib/bem";
import styles from "./EditChapterForm.module.scss";

const b = bem(styles, "edit-chapter-form");

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
          name: "slug",
          id: `edit-chapter-slug-${chapter.id}`,
          label: "Slug",
          kind: "input",
          type: "text",
        },
      ] satisfies ReadonlyArray<FormFieldConfig<EditChapterMetaFormValues>>,
    [chapter.id]
  );

  const { control, handleSubmit } = useForm<EditChapterMetaFormValues>({
    resolver: zodResolver(editChapterMetaSchema),
    defaultValues: {
      title: chapter.title,
      slug: chapter.slug,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: EditChapterMetaFormValues) => {
    setIsLoading(true);

    const payload: UpdateChapterDto = {
      title: values.title.trim(),
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

  return (
    <form className={b.block()} onSubmit={handleSubmit(onSubmit)}>
      <FormFields fields={fields} control={control} />
      <p className={b.el("hint")}>Содержание редактируется на странице главы</p>
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
