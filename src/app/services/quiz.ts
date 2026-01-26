import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz, QuizCreateDto, QuizUpdateDto, QuizSubmissionDto, QuizResultDto } from '../models/quiz.model';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) {}

  // Get all quizzes
  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(ApiConfig.ENDPOINTS.QUIZZES.BASE);
  }

  // Get quiz by ID with questions
  getQuizById(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(ApiConfig.ENDPOINTS.QUIZZES.BY_ID(id));
  }

  // Get quizzes by course
  getQuizzesByCourse(courseId: string): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(ApiConfig.ENDPOINTS.QUIZZES.BY_COURSE(courseId));
  }

  // Create quiz
  createQuiz(quiz: QuizCreateDto): Observable<Quiz> {
    return this.http.post<Quiz>(ApiConfig.ENDPOINTS.QUIZZES.BASE, quiz);
  }

  // Update quiz
  updateQuiz(id: string, quiz: QuizUpdateDto): Observable<Quiz> {
    return this.http.put<Quiz>(ApiConfig.ENDPOINTS.QUIZZES.BY_ID(id), quiz);
  }

  // Delete quiz
  deleteQuiz(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.ENDPOINTS.QUIZZES.BY_ID(id));
  }

  // Submit quiz answers
  submitQuizAnswers(submission: QuizSubmissionDto): Observable<QuizResultDto> {
    return this.http.post<QuizResultDto>(
      ApiConfig.ENDPOINTS.QUIZZES.SUBMIT(submission.quizId), 
      { answers: submission.answers }
    );
  }

  // Get quiz count by course
  getQuizCountByCourse(courseId: string): Observable<number> {
    return this.http.get<number>(`${ApiConfig.ENDPOINTS.QUIZZES.BY_COURSE(courseId)}/count`);
  }
}