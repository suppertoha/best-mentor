export const ROUTES = {
  main: "/",
  notFound: "/404",
  questionDetail: (id: number | string) => `/main/${id}`,
} as const;