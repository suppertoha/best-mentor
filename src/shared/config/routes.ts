export const ROUTES = {
  main: "/",
  sections: "/sections",
  chapter: "/chapters/:slug",
  login: "/login",
  register: "/register",
  notFound: "/not-found",
} as const;

export const getChapterPath = (slug: string) => `/chapters/${slug}`;
