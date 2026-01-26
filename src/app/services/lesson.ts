import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson, LessonCreateDto, LessonUpdateDto } from '../models/lesson.model';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  constructor(private http: HttpClient) {}

  // Get all lessons for a course
  getLessonsByCourse(courseId: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(ApiConfig.ENDPOINTS.LESSONS.BY_COURSE(courseId));
  }

  // Get lesson by ID
  getLessonById(id: string): Observable<Lesson> {
    return this.http.get<Lesson>(ApiConfig.ENDPOINTS.LESSONS.BY_ID(id));
  }

  // Create lesson
  createLesson(lesson: LessonCreateDto): Observable<Lesson> {
    return this.http.post<Lesson>(ApiConfig.ENDPOINTS.LESSONS.BASE, lesson);
  }

  // Update lesson
  updateLesson(id: string, lesson: LessonUpdateDto): Observable<Lesson> {
    return this.http.put<Lesson>(ApiConfig.ENDPOINTS.LESSONS.BY_ID(id), lesson);
  }

  // Delete lesson
  deleteLesson(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.ENDPOINTS.LESSONS.BY_ID(id));
  }

  // Upload lesson file
  uploadLessonFile(lessonId: string, file: File): Observable<{fileUrl: string}> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{fileUrl: string}>(ApiConfig.ENDPOINTS.LESSONS.UPLOAD(lessonId), formData);
  }

  // Delete lesson file
  deleteLessonFile(lessonId: string): Observable<void> {
    return this.http.delete<void>(`${ApiConfig.ENDPOINTS.LESSONS.BY_ID(lessonId)}/file`);
  }

  // Get lesson count by course
  getLessonCountByCourse(courseId: string): Observable<number> {
    return this.http.get<number>(`${ApiConfig.ENDPOINTS.LESSONS.BY_COURSE(courseId)}/count`);
  }
}