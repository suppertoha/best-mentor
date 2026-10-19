import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chaptersService } from "@/shared/api";
import { getChapterPath } from "@/shared/config";
import { getNextSortOrder, sortBySortOrder } from "@/shared/lib";
import { showSuccessToast } from "@/shared/lib/toast";
import { FormFields, type FormFieldConfig } from "@/shared/ui/form-fields";
import { Button } from "@/shared/ui";
import { buildChapterSlug } from "../../lib/buildChapterSlug";
import type { Chapter } from "@/shared/api";
import type { CreateChapterDto } from "../../model/types";
import {
  createChapterSchema,
  type CreateChapterFormValues,
} from "../../model/schema";
import { bem } from "@/shared/lib/bem";
import styles from "./CreateChapterForm.module.scss";

const b = bem(styles, "create-chapter-form");

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
  existingChapters?: Chapter[];
  onSuccess: () => void;
}

export const CreateChapterForm = ({
  sectionId,
  existingChapters = [],
  onSuccess,
}: CreateChapterFormProps) => {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<CreateChapterFormValues>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: CreateChapterFormValues) => {
    setIsLoading(true);

    const title = values.title.trim();
    const slug = buildChapterSlug(title, values.slug);

    const sortedChapters = sortBySortOrder(existingChapters);

    const payload: CreateChapterDto = {
      title,
      content: `# ${title}\n\n`,
      slug,
      sortOrder: getNextSortOrder(sortedChapters),
    };

    try {
      const data = await chaptersService.create(sectionId, payload);

      if (sortedChapters.length > 0) {
        await chaptersService.reorder(sectionId, [
          ...sortedChapters.map((chapter) => chapter.id),
          data.id,
        ]);
      }
      showSuccessToast("Глава создана");
      reset();
      onSuccess();
      navigate(getChapterPath(data.slug ?? slug), { state: { edit: true } });
    } catch {
      // handled by API interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={b.block()} onSubmit={handleSubmit(onSubmit)}>
      <FormFields fields={fields} control={control} />
      <p className={b.el("hint")}>
        Содержание редактируется на странице главы. Если slug пустой — сгенерируется из названия
      </p>
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        showLoader
        loadingText="Создание..."
      >
        Создать главу
      </Button>
    </form>
  );
};
