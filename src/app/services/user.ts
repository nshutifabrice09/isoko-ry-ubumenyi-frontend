import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  // Get user profile
  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Update user profile
  updateUserProfile(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, userData);
  }

  // Get all users (admin only)
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}