export const buildSectionSlug = (title: string, slug: string): string => {
  const trimmedSlug = slug.trim();
  if (trimmedSlug) return trimmedSlug;

  const fromTitle = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return fromTitle || `section-${Date.now()}`;
};
