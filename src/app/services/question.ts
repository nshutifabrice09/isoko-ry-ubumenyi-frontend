import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, QuestionCreateDto, QuestionUpdateDto } from '../models/question.model';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  // Get all questions
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(ApiConfig.ENDPOINTS.QUESTIONS.BASE);
  }

  // Get question by ID
  getQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(ApiConfig.ENDPOINTS.QUESTIONS.BY_ID(id));
  }

  // Get questions by quiz
  getQuestionsByQuiz(quizId: string): Observable<Question[]> {
    return this.http.get<Question[]>(ApiConfig.ENDPOINTS.QUESTIONS.BY_QUIZ(quizId));
  }

  // Create question
  createQuestion(question: QuestionCreateDto): Observable<Question> {
    return this.http.post<Question>(ApiConfig.ENDPOINTS.QUESTIONS.BASE, question);
  }

  // Update question
  updateQuestion(id: string, question: QuestionUpdateDto): Observable<Question> {
    return this.http.put<Question>(ApiConfig.ENDPOINTS.QUESTIONS.BY_ID(id), question);
  }

  // Delete question
  deleteQuestion(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.ENDPOINTS.QUESTIONS.BY_ID(id));
  }

  // Bulk create questions
  bulkCreateQuestions(questions: QuestionCreateDto[]): Observable<Question[]> {
    return this.http.post<Question[]>(ApiConfig.ENDPOINTS.QUESTIONS.BULK, questions);
  }

  // Get question count by quiz
  getQuestionCountByQuiz(quizId: string): Observable<number> {
    return this.http.get<number>(`${ApiConfig.ENDPOINTS.QUESTIONS.BY_QUIZ(quizId)}/count`);
  }
}