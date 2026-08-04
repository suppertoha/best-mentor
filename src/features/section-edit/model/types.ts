export interface EditableSection {
  id: number;
  title: string;
  description: string;
  slug: string;
}

export interface UpdateSectionDto {
  title?: string;
  description?: string;
  slug?: string;
  sortOrder?: number;
}
