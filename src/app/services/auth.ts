import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    // Safe initialization for server-side / Node
    let storedUser = null;
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('currentUser');
      storedUser = saved ? JSON.parse(saved) : null;
    }

    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // Register new user
  register(userData: any): Observable<any> {
    return this.http.post(ApiConfig.ENDPOINTS.AUTH.REGISTER, userData);
  }

  // Login
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(ApiConfig.ENDPOINTS.AUTH.LOGIN, { email, password })
      .pipe(
        tap((response) => {
          if (response && response.token && typeof window !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
        })
      );
  }

  // Logout
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  // Get JWT token
  getToken(): string | null {
    const user = this.currentUserValue;
    return user ? user.token : null;
  }

  // Get current user role
  getUserRole(): string | null {
    const user = this.currentUserValue;
    return user ? user.role : null;
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  // Check if user is instructor
  isInstructor(): boolean {
    return this.hasRole('INSTRUCTOR');
  }

  // Check if user is student
  isStudent(): boolean {
    return this.hasRole('STUDENT');
  }

  // OAuth Login - Google
  loginWithGoogle(): void {
    if (typeof window !== 'undefined') {
      window.location.href = `${ApiConfig.ENDPOINTS.AUTH.BASE}/oauth2/authorize/google`;
    }
  }

  // OAuth Login - Facebook
  loginWithFacebook(): void {
    if (typeof window !== 'undefined') {
      window.location.href = `${ApiConfig.ENDPOINTS.AUTH.BASE}/oauth2/authorize/facebook`;
    }
  }

  // Handle OAuth callback
  handleOAuthCallback(token: string, user: any): void {
    const userData = { token, ...user };
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(userData));
    }
    this.currentUserSubject.next(userData);
  }

  // Refresh token
  refreshToken(): Observable<any> {
    return this.http.post<any>(ApiConfig.ENDPOINTS.AUTH.REFRESH, {})
      .pipe(
        tap((response) => {
          if (response && response.token && typeof window !== 'undefined') {
            const currentUser = this.currentUserValue;
            const updatedUser = { ...currentUser, token: response.token };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            this.currentUserSubject.next(updatedUser);
          }
        })
      );
  }

  // Get current user ID
  getCurrentUserId(): string | null {
    const user = this.currentUserValue;
    return user ? user.userId || user.id : null;
  }

  // Update current user in storage
  updateCurrentUser(userData: any): void {
    if (typeof window !== 'undefined') {
      const updatedUser = { ...this.currentUserValue, ...userData };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      this.currentUserSubject.next(updatedUser);
    }
  }
}