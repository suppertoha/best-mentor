type Sortable = { sortOrder?: number };

export const sortBySortOrder = <T extends Sortable>(items: T[]): T[] =>
  [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
