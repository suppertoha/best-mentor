import { z } from "zod";

const optionalText = (min: number, max: number, minMessage: string, maxMessage: string) =>
  z
    .string()
    .max(max, maxMessage)
    .refine((value) => value === "" || value.length >= min, minMessage);

export const profileSchema = z.object({
  firstName: optionalText(3, 50, "Минимум 3 символа", "Максимум 50 символов"),
  lastName: optionalText(3, 50, "Минимум 3 символа", "Максимум 50 символов"),
  bio: optionalText(10, 500, "Минимум 10 символов", "Максимум 500 символов"),
  githubUrl: optionalText(18, 255, "Минимум 18 символов", "Максимум 255 символов"),
  telegramUsername: optionalText(5, 32, "Минимум 5 символов", "Максимум 32 символов"),
  websiteUrl: optionalText(10, 2048, "Минимум 10 символов", "Максимум 2048 символов"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const emptyProfileValues: ProfileFormValues = {
  firstName: "",
  lastName: "",
  bio: "",
  githubUrl: "",
  telegramUsername: "",
  websiteUrl: "",
};

export const toProfileFormValues = (user: {
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  githubUrl: string | null;
  telegramUsername: string | null;
  websiteUrl: string | null;
}): ProfileFormValues => ({
  firstName: user.firstName ?? "",
  lastName: user.lastName ?? "",
  bio: user.bio ?? "",
  githubUrl: user.githubUrl ?? "",
  telegramUsername: user.telegramUsername ?? "",
  websiteUrl: user.websiteUrl ?? "",
});

export const toUpdateProfilePayload = (values: ProfileFormValues) => ({
  firstName: values.firstName || null,
  lastName: values.lastName || null,
  bio: values.bio || null,
  githubUrl: values.githubUrl || null,
  telegramUsername: values.telegramUsername || null,
  websiteUrl: values.websiteUrl || null,
});
