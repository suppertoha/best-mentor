export interface EditableChapter {
  id: number;
  title: string;
  slug: string;
}

export interface UpdateChapterDto {
  title?: string;
  content?: string;
  slug?: string;
  sortOrder?: number;
}
