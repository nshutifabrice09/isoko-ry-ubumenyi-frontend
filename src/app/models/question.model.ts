export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  OPEN_ENDED = 'OPEN_ENDED'
}

export interface Question {
  id: string; // UUID
  text: string;
  type: QuestionType;
  options: string[]; // Empty for OPEN_ENDED
  correctAnswer: string;
  quizId: string; // UUID
}

export interface QuestionCreateDto {
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  quizId: string;
}

export interface QuestionUpdateDto {
  text?: string;
  type?: QuestionType;
  options?: string[];
  correctAnswer?: string;
}