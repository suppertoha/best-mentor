export interface Chapter {
  id: number;
  title: string;
  slug: string;
  sortOrder: number;
}

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

export interface EditableChapter {
  id: number;
  title: string;
  slug: string;
}

export interface CreateChapterDto {
  title: string;
  content: string;
  slug?: string;
  sortOrder?: number;
}

export interface UpdateChapterDto {
  title?: string;
  content?: string;
  slug?: string;
  sortOrder?: number;
}

export interface ReorderDto {
  ids: number[];
}
