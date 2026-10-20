import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildSectionSlug } from '@/features/section-create/lib/buildSectionSlug';
import {
  editSectionSchema,
  type EditSectionFormValues,
} from '@/features/section-create/model/schema';
import { sectionsService } from '@/shared/api';
import { showSuccessToast } from '@/shared/lib/toast';
import { FormFields, type FormFieldConfig } from '@/shared/ui/form-fields';
import { Button } from '@/shared/ui';
import type { EditableSection, UpdateSectionDto } from '../../model/types';
import { bem } from '@/shared/lib/bem';
import styles from './EditSectionForm.module.scss';

const b = bem(styles, 'edit-section-form');

interface EditSectionFormProps {
  section: EditableSection;
  onSuccess: () => void;
}

export const EditSectionForm = ({ section, onSuccess }: EditSectionFormProps) => {
  const fields = useMemo(
    () =>
      [
        {
          name: 'title',
          id: `edit-section-title-${section.id}`,
          label: 'Название',
          kind: 'input',
          type: 'text',
        },
        {
          name: 'description',
          id: `edit-section-description-${section.id}`,
          label: 'Описание',
          kind: 'textarea',
        },
        {
          name: 'slug',
          id: `edit-section-slug-${section.id}`,
          label: 'Slug',
          kind: 'input',
          type: 'text',
        },
      ] satisfies ReadonlyArray<FormFieldConfig<EditSectionFormValues>>,
    [section.id],
  );

  const { control, handleSubmit, reset } = useForm<EditSectionFormValues>({
    resolver: zodResolver(editSectionSchema),
    defaultValues: {
      title: section.title,
      description: section.description,
      slug: section.slug,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    reset({
      title: section.title,
      description: section.description,
      slug: section.slug,
    });
  }, [section, reset]);

  const onSubmit = async (values: EditSectionFormValues) => {
    setIsLoading(true);

    const payload: UpdateSectionDto = {
      title: values.title.trim(),
      description: values.description.trim(),
      slug: buildSectionSlug(values.title, values.slug),
    };

    try {
      await sectionsService.update(section.id, payload);
      showSuccessToast('Раздел обновлён');
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
      <Button type="submit" fullWidth isLoading={isLoading} showLoader loadingText="Сохранение...">
        Сохранить
      </Button>
    </form>
  );
};
