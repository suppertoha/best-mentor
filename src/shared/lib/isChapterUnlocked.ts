export interface ChapterProgress {
  isCompleted: boolean;
  hasQuiz?: boolean;
}

const isChapterBlocking = (chapter: ChapterProgress) =>
  Boolean(chapter.hasQuiz) && !chapter.isCompleted;

export function isChapterUnlocked(
  chapters: ChapterProgress[],
  index: number,
  bypassLocks = false,
): boolean {
  if (bypassLocks || index <= 0) {
    return true;
  }

  return chapters.slice(0, index).every((chapter) => !isChapterBlocking(chapter));
}

export function getChapterLockState<T extends ChapterProgress>(
  chapters: T[],
  index: number,
  bypassLocks = false,
) {
  const isUnlocked = isChapterUnlocked(chapters, index, bypassLocks);

  if (isUnlocked || bypassLocks || index <= 0) {
    return { isUnlocked, blockingChapter: null };
  }

  const blockingChapter = chapters.slice(0, index).find(isChapterBlocking) ?? null;

  return { isUnlocked, blockingChapter };
}

export interface ChapterNavigationGate {
  hasQuiz: boolean;
  isCompleted: boolean;
}

export function canProceedToNextChapter(
  chapter: ChapterNavigationGate,
  isAdmin: boolean,
): boolean {
  return isAdmin || chapter.isCompleted || !chapter.hasQuiz;
}
