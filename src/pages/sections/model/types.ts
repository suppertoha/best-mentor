export interface Chapter {
  id: number;
  title: string;
  slug: string;
  sortOrder: number;
}

export interface Section {
  id: number;
  title: string;
  slug: string;
  description: string;
  sortOrder?: number;
  chapters: Chapter[];
}
