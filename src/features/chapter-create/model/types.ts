export interface CreateChapterDto {
  title: string;
  content: string;
  slug?: string;
  sortOrder?: number;
}
