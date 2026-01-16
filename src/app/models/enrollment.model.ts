import { User } from './user.model';
import { Course } from './course.model';


export interface Enrollment {
  id: string;
  user: User;
  course: Course;
  progress: number; // 0.0 to 100.0
}

export interface EnrollmentCreateDto {
  userId: string;
  courseId: string;
}

export interface EnrollmentUpdateDto {
  progress?: number;
}