import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  isLoading = false;

  formData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student'
  };

  errors = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  };

  showPassword = false;
  showConfirmPassword = false;

  validateForm(): boolean {
    let isValid = true;

    this.errors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: ''
    };

    if (!this.formData.fullName.trim()) {
      this.errors.fullName = 'Full name is required!';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.formData.email.trim()) {
      this.errors.email = 'Email is required!';
      isValid = false;
    } else if (!emailRegex.test(this.formData.email)) {
      this.errors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!this.formData.password) {
      this.errors.password = 'Password is required!';
      isValid = false;
    } else if (this.formData.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters!';
      isValid = false;
    }

    if (!this.formData.confirmPassword) {
      this.errors.confirmPassword = 'Confirm password!';
      isValid = false;
    } else if (this.formData.password !== this.formData.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(): void {
    if (!this.validateForm()) return;

    this.isLoading = true;

    const userData = {
      name: this.formData.fullName,
      email: this.formData.email,
      password: this.formData.password,
      role: this.formData.role.toUpperCase()
    };

    this.auth.register(userData).subscribe({
      next: () => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;

        if (error?.status === 409) {
          this.errors.general = 'This email is already registered.';
        } else if (error?.error?.message) {
          this.errors.general = error.error.message;
        } else {
          this.errors.general = 'Registration failed. Please try again later.';
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loginWithGoogle(): void {
    this.auth.loginWithGoogle();
  }

  loginWithFacebook(): void {
    this.auth.loginWithFacebook();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
