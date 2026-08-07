import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chaptersService } from "@/shared/api";
import { showSuccessToast } from "@/shared/lib/toast";
import { FormFields, type FormFieldConfig } from "@/shared/ui/form-fields";
import { Button } from "@/shared/ui";
import { buildChapterSlug } from "../../lib/buildChapterSlug";
import type { CreateChapterDto } from "../../model/types";
import {
  createChapterSchema,
  type CreateChapterFormValues,
} from "../../model/schema";
import styles from "./CreateChapterForm.module.scss";

const fields = [
  {
    name: "title",
    id: "chapter-title",
    label: "Название",
    kind: "input",
    type: "text",
    placeholder: "Введение",
  },
  {
    name: "content",
    id: "chapter-content",
    label: "Содержание",
    kind: "textarea",
    placeholder: "Текст главы",
  },
  {
    name: "slug",
    id: "chapter-slug",
    label: "Slug (необязательно)",
    kind: "input",
    type: "text",
    placeholder: "html-introduction",
  },
] satisfies ReadonlyArray<FormFieldConfig<CreateChapterFormValues>>;

interface CreateChapterFormProps {
  sectionId: number;
  onSuccess: () => void;
}

export const CreateChapterForm = ({ sectionId, onSuccess }: CreateChapterFormProps) => {
  const { control, handleSubmit, reset } = useForm<CreateChapterFormValues>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: "",
      content: "",
      slug: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: CreateChapterFormValues) => {
    setIsLoading(true);

    const payload: CreateChapterDto = {
      title: values.title.trim(),
      content: values.content.trim(),
      slug: buildChapterSlug(values.title, values.slug),
    };

    try {
      await chaptersService.create(sectionId, payload);
      showSuccessToast("Глава создана");
      reset();
      onSuccess();
    } catch {
      // handled by API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormFields fields={fields} control={control} />
      <p className={styles.hint}>Если slug пустой — сгенерируется из названия</p>
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        showLoader
        loadingText="Сохранение..."
      >
        Создать главу
      </Button>
    </form>
  );
};
