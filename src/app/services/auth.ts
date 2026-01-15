import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:8080/api/auth'; // Your Spring Boot backend URL
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
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
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          // Store user details and jwt token in local storage
          if (response && response.token) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
        })
      );
  }

  // Logout
  logout() {
    localStorage.removeItem('currentUser');
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
    window.location.href = `${this.apiUrl}/oauth2/authorize/google`;
  }

  // OAuth Login - Facebook
  loginWithFacebook(): void {
    window.location.href = `${this.apiUrl}/oauth2/authorize/facebook`;
  }

  // Handle OAuth callback
  handleOAuthCallback(token: string, user: any): void {
    const userData = { token, ...user };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    this.currentUserSubject.next(userData);
  }
}
