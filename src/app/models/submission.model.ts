import { User } from './user.model';
import { Assignment } from './assignment.model';

export interface Submission {
  id: string; // UUID
  student: User;
  assignment: Assignment;
  fileUrl: string;
  grade: number | null;
  submittedAt: string; // ISO 8601 date string
}

export interface SubmissionCreateDto {
  studentId: string;
  assignmentId: string;
  fileUrl: string;
}

export interface SubmissionUpdateDto {
  grade?: number;
  fileUrl?: string;
}