export interface SectionProgressChapter {
  isCompleted: boolean;
  hasQuiz?: boolean;
}

export function getSectionProgress(chapters: SectionProgressChapter[]) {
  const chaptersWithQuiz = chapters.filter((chapter) => chapter.hasQuiz);
  const total = chaptersWithQuiz.length;
  const completed = chaptersWithQuiz.filter((chapter) => chapter.isCompleted).length;

  return { completed, total };
}
