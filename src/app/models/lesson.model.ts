import { UUID } from "crypto";

export interface Lesson {
  id: UUID
  title: string;
  content: string;
  fileUrl: string;
  courseId: string; // UUID
}

export interface LessonCreateDto {
  title: string;
  content: string;
  fileUrl?: string;
  courseId: string;
}

export interface LessonUpdateDto {
  title?: string;
  content?: string;
  fileUrl?: string;
}