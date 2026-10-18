type Sortable = { sortOrder?: number };

export const getNextSortOrder = (items: Sortable[]): number => {
  if (items.length === 0) {
    return 0;
  }

  return Math.max(...items.map((item) => item.sortOrder ?? 0)) + 1;
};
