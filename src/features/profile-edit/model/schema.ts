import { z } from 'zod';

const GITHUB_PROFILE_URL = /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/?$/;

const optionalText = (min: number, max: number, minMessage: string, maxMessage: string) =>
  z
    .string()
    .max(max, maxMessage)
    .refine((value) => value === '' || value.length >= min, minMessage);

const optionalUrl = (min: number, max: number) =>
  z
    .string()
    .max(max, `Максимум ${max} символов`)
    .refine((value) => {
      if (value === '') return true;
      if (value.length < min) return false;
      try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
      } catch {
        return false;
      }
    }, `Укажите полный URL с https:// (минимум ${min} символов)`);

const normalizeTelegramUsername = (value: string) => value.trim().replace(/^@/, '');

export const profileSchema = z.object({
  firstName: optionalText(3, 50, 'Минимум 3 символа', 'Максимум 50 символов'),
  lastName: optionalText(3, 50, 'Минимум 3 символа', 'Максимум 50 символов'),
  bio: optionalText(10, 500, 'Минимум 10 символов', 'Максимум 500 символов'),
  githubUrl: z
    .string()
    .max(255, 'Максимум 255 символов')
    .refine(
      (value) => value === '' || GITHUB_PROFILE_URL.test(value),
      'Нужен URL вида https://github.com/username',
    ),
  telegramUsername: z
    .string()
    .max(32, 'Максимум 32 символов')
    .refine((value) => {
      if (value === '') return true;
      const username = normalizeTelegramUsername(value);
      return username.length >= 5 && /^[a-zA-Z0-9_]+$/.test(username);
    }, 'Только латиница, цифры и _ (без @)'),
  websiteUrl: optionalUrl(10, 2048),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const emptyProfileValues: ProfileFormValues = {
  firstName: '',
  lastName: '',
  bio: '',
  githubUrl: '',
  telegramUsername: '',
  websiteUrl: '',
};

export const toProfileFormValues = (user: {
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  githubUrl: string | null;
  telegramUsername: string | null;
  websiteUrl: string | null;
}): ProfileFormValues => ({
  firstName: user.firstName ?? '',
  lastName: user.lastName ?? '',
  bio: user.bio ?? '',
  githubUrl: user.githubUrl ?? '',
  telegramUsername: user.telegramUsername ?? '',
  websiteUrl: user.websiteUrl ?? '',
});

export const toUpdateProfilePayload = (values: ProfileFormValues) => {
  const telegram = normalizeTelegramUsername(values.telegramUsername);

  return {
    firstName: values.firstName || null,
    lastName: values.lastName || null,
    bio: values.bio || null,
    githubUrl: values.githubUrl || null,
    telegramUsername: telegram || null,
    websiteUrl: values.websiteUrl || null,
  };
};
