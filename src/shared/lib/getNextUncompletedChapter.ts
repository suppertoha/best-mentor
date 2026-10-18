export interface ChapterCompletion {
  slug: string;
  isCompleted: boolean;
  hasQuiz?: boolean;
}

export function getNextUncompletedChapter<T extends ChapterCompletion>(
  chapters: T[],
  fromIndex: number,
): T | null {
  for (let index = fromIndex + 1; index < chapters.length; index += 1) {
    const chapter = chapters[index];

    if (!chapter?.hasQuiz || chapter.isCompleted) {
      continue;
    }

    return chapter;
  }

  return null;
}
