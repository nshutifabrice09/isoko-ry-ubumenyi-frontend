import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserCreateDto, UserUpdateDto, Role } from '../models/user.model';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(ApiConfig.ENDPOINTS.USERS.BASE);
  }

  // Get user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(ApiConfig.ENDPOINTS.USERS.BY_ID(id));
  }

  // Get users by role
  getUsersByRole(role: Role): Observable<User[]> {
    return this.http.get<User[]>(ApiConfig.ENDPOINTS.USERS.BY_ROLE(role));
  }

  // Create user
  createUser(user: UserCreateDto): Observable<User> {
    return this.http.post<User>(ApiConfig.ENDPOINTS.USERS.BASE, user);
  }

  // Update user
  updateUser(id: string, user: UserUpdateDto): Observable<User> {
    return this.http.put<User>(ApiConfig.ENDPOINTS.USERS.BY_ID(id), user);
  }

  // Delete user
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.ENDPOINTS.USERS.BY_ID(id));
  }

  // Get current user profile
  getCurrentUserProfile(): Observable<User> {
    return this.http.get<User>(ApiConfig.ENDPOINTS.USERS.PROFILE);
  }

  // Update current user profile
  updateCurrentUserProfile(user: UserUpdateDto): Observable<User> {
    return this.http.put<User>(ApiConfig.ENDPOINTS.USERS.PROFILE, user);
  }

  // Get all students
  getAllStudents(): Observable<User[]> {
    return this.getUsersByRole(Role.STUDENT);
  }

  // Get all instructors
  getAllInstructors(): Observable<User[]> {
    return this.getUsersByRole(Role.INSTRUCTOR);
  }

  // Get all admins
  getAllAdmins(): Observable<User[]> {
    return this.getUsersByRole(Role.ADMIN);
  }

  // Search users
  searchUsers(searchTerm: string): Observable<User[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<User[]>(`${ApiConfig.ENDPOINTS.USERS.BASE}/search`, { params });
  }

  // Get user count
  getUserCount(): Observable<number> {
    return this.http.get<number>(`${ApiConfig.ENDPOINTS.USERS.BASE}/count`);
  }
}