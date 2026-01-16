import { User } from './user.model';
import { Lesson } from './lesson.model';

export interface Course {
  id: string; // UUID
  title: string;
  description: string;
  instructor: User;
  lessons: Lesson[];
}

export interface CourseCreateDto {
  title: string;
  description: string;
  instructorId: string; // UUID
}

export interface CourseUpdateDto {
  title?: string;
  description?: string;
  instructorId?: string;
}

export interface CourseListDto {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  lessonsCount: number;
}