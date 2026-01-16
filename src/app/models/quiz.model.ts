import { Course } from './course.model';
import { Question } from './question.model';

export interface Quiz {
  id: string; // UUID
  title: string;
  course: Course;
  questions: Question[];
}

export interface QuizCreateDto {
  title: string;
  courseId: string;
}

export interface QuizUpdateDto {
  title?: string;
}