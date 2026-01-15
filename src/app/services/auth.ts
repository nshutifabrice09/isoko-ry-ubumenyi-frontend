import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:8080/api/auth'; // Spring Boot backend
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
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Login
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
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

  // OAuth Login - Google
  loginWithGoogle(): void {
    if (typeof window !== 'undefined') {
      window.location.href = `${this.apiUrl}/oauth2/authorize/google`;
    }
  }

  // OAuth Login - Facebook
  loginWithFacebook(): void {
    if (typeof window !== 'undefined') {
      window.location.href = `${this.apiUrl}/oauth2/authorize/facebook`;
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
}
