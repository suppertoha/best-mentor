import type { Chapter } from "./chapters.dto";

export interface Section {
  id: number;
  title: string;
  slug: string;
  description: string;
  sortOrder?: number;
  chapters: Chapter[];
}

export interface EditableSection {
  id: number;
  title: string;
  description: string;
  slug: string;
}

export interface CreateSectionDto {
  title: string;
  description: string;
  slug?: string;
  sortOrder?: number;
}

export interface UpdateSectionDto {
  title?: string;
  description?: string;
  slug?: string;
  sortOrder?: number;
}

export type { ReorderDto } from "./chapters.dto";
