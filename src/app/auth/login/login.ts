import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formData = {
    email: '',
    password: ''
  };

  errors = {
    email: '',
    password: ''
  };

  showPassword = false;
  
  validateForm(): boolean {
    let isValid = true;
    this.errors = {
    email: '',
    password: ''
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

  onSubmit() {
    if (this.validateForm()) {
      console.log('Login submitted:', this.formData);
      // TODO: Send credentials to your backend API
      alert('Login successful! (This is a demo)');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
