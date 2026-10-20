export const formatAdminDate = (value?: string | null) => {
  if (!value) {
    return '—';
  }

  return new Date(value).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatAdminPercent = (value: number) => `${value}%`;

export const getAdminUserLabel = (
  firstName?: string | null,
  lastName?: string | null,
  email?: string,
) => {
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

  if (fullName) {
    return fullName;
  }

  return email ?? 'Студент';
};
