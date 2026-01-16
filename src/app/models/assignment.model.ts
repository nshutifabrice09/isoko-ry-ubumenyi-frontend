import { Course } from './course.model';

export interface Assignment {
  id: string; // UUID
  title: string;
  description: string;
  dueDate: string; // ISO 8601 date string
  course: Course;
}

export interface AssignmentCreateDto {
  title: string;
  description: string;
  dueDate: string; // ISO 8601 format
  courseId: string;
}

export interface AssignmentUpdateDto {
  title?: string;
  description?: string;
  dueDate?: string;
}