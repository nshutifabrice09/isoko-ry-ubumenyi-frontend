import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  isLoading = false;

  formData = {
    email: '',
    password: ''
  };

  errors = {
    email: '',
    password: '',
    general: ''
  };

  showPassword = false;

  validateForm(): boolean {
    let isValid = true;

    this.errors = {
      email: '',
      password: '',
      general: ''
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.formData.email.trim()) {
      this.errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(this.formData.email)) {
      this.errors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!this.formData.password) {
      this.errors.password = 'Password is required';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(): void {
    if (!this.validateForm()) return;

    this.isLoading = true;

    this.authService.login(this.formData.email, this.formData.password).subscribe({
      next: (response) => {
        if (response.role === 'TUTOR') {
          this.router.navigate(['/instructor-dashboard']);
        } else {
          this.router.navigate(['/student-dashboard']);
        }
      },
      error: (error) => {
        this.isLoading = false;

        if (error?.status === 401) {
          this.errors.general = 'Invalid email or password';
        } else if (error?.error?.message) {
          this.errors.general = error.error.message;
        } else {
          this.errors.general = 'Login failed. Please try again.';
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
