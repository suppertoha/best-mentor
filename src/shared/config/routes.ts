export const ROUTES = {
  main: "/",
  login: "/login",
  notFound: "/404",
  questionDetail: (id: number | string) => `/main/${id}`,
} as const;