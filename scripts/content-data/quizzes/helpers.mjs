/** @param {[string, string, string[]]} entry */
export const q = (text, correct, wrongs) => ({ text, correct, wrongs });

/** @param {ReturnType<typeof q>[]} entries */
export const quiz = (entries) => ({
  questions: entries.map(({ text, correct, wrongs }) => ({
    text,
    options: [
      { text: correct, isCorrect: true },
      ...wrongs.map((wrong) => ({ text: wrong, isCorrect: false })),
    ],
  })),
});
