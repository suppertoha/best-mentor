export interface ChapterSection {
  id: number;
  title: string;
  slug: string;
}

export interface ChapterDetail {
  id: number;
  sectionId: number;
  title: string;
  slug: string;
  content: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  section: ChapterSection;
}
