import { Course } from './course.model';
import { Question } from './question.model';

export interface Quiz {
  id: string;
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

export interface QuizSubmissionDto {
  id: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}

export interface QuizResultDto {
  id: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  results: {
    questionId: string;
    correct: boolean;
    correctOptionId: string;
    selectedOptionId: string;
  }[];
}