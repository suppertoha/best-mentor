export const ROUTES = {
  main: "/",
  sections: "/sections",
  chapter: "/chapters/:slug",
  chapterQuizEdit: "/chapters/:slug/quiz/edit",
  login: "/login",
  register: "/register",
  profile: "/profile",
  notFound: "/not-found",
} as const;

export const getChapterPath = (slug: string) => `/chapters/${slug}`;

export const getChapterQuizEditPath = (slug: string) => `/chapters/${slug}/quiz/edit`;
