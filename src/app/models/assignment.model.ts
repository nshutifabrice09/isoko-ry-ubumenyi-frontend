import { Course } from './course.model';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date; // ISO 8601 date string
  course: Course;
}

export interface AssignmentCreateDto {
  title: string;
  description: string;
  dueDate: Date; // ISO 8601 format
  courseId: string;
}

export interface AssignmentUpdateDto {
  title?: string;
  description?: string;
  dueDate?: Date;
}