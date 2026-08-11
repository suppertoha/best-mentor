import type { Chapter as ChapterListItem } from "@/shared/api";

export const getChapterNeighbors = (
  chapters: ChapterListItem[],
  currentSlug: string,
) => {
  const index = chapters.findIndex((chapter) => chapter.slug === currentSlug);

  if (index === -1) {
    return { prev: null, next: null, currentIndex: -1, total: chapters.length };
  }

  return {
    prev: chapters[index - 1] ?? null,
    next: chapters[index + 1] ?? null,
    currentIndex: index,
    total: chapters.length,
  };
};
