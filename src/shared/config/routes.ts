export const ROUTES = {
  main: "/",
  sections: "/sections",
  login: "/login",
  notFound: "/404",
  questionDetail: (id: number | string) => `/main/${id}`,
} as const;
