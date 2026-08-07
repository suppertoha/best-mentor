import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sectionsService } from "@/shared/api";
import { showSuccessToast } from "@/shared/lib/toast";
import { FormFields, type FormFieldConfig } from "@/shared/ui/form-fields";
import { Button } from "@/shared/ui";
import { buildSectionSlug } from "../../lib/buildSectionSlug";
import type { CreateSectionDto } from "../../model/types";
import {
  createSectionSchema,
  type CreateSectionFormValues,
} from "../../model/schema";
import styles from "./CreateSectionForm.module.scss";

const fields = [
  {
    name: "title",
    id: "section-title",
    label: "Название",
    kind: "input",
    type: "text",
    placeholder: "HTML",
  },
  {
    name: "description",
    id: "section-description",
    label: "Описание",
    kind: "textarea",
    placeholder: "Основы разметки веб-страниц",
  },
  {
    name: "slug",
    id: "section-slug",
    label: "Slug (необязательно)",
    kind: "input",
    type: "text",
    placeholder: "html",
  },
] satisfies ReadonlyArray<FormFieldConfig<CreateSectionFormValues>>;

interface CreateSectionFormProps {
  onSuccess: () => void;
}

export const CreateSectionForm = ({ onSuccess }: CreateSectionFormProps) => {
  const { control, handleSubmit, reset } = useForm<CreateSectionFormValues>({
    resolver: zodResolver(createSectionSchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: CreateSectionFormValues) => {
    setIsLoading(true);

    const payload: CreateSectionDto = {
      title: values.title.trim(),
      description: values.description.trim(),
      slug: buildSectionSlug(values.title, values.slug),
    };

    try {
      await sectionsService.create(payload);
      showSuccessToast("Раздел создан");
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
        Создать раздел
      </Button>
    </form>
  );
};
