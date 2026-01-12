import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  formData= {
    fullName: '',
    email: '',
    password: '',
    confirmPasswrd: '',
    role: 'Student' 
  };

  errors = {
     fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  showPassword = false;
  showConfirmPassword = false;

  validateForm(): boolean {
    let isValid = true;

    this.errors = {
       fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if(!this.formData.fullName.trim()) {
      this.errors.fullName = 'Full name is required!';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!this.formData.email.trim()) {
      this.errors.email = 'Email is requiered!';
      isValid = false;
    }
    else if(!emailRegex.test(this.formData.email)) {
      this.errors.email = 'Please enter a valid email';
      isValid = false;
    };

    if(!this.formData.password) {
      this.errors.password = 'Password is required!';
      isValid = false;
    }else if(this.formData.password.length <6) {
      this.errors.password = 'Password must be at least 6 characters!';
      isValid = false;
      }
    
      if(!this.formData.confirmPasswrd) {
        this.errors.confirmPassword = 'Comfirm password!';
        isValid = false;
      }else if(this.formData.password !== this.formData.confirmPasswrd) {
        this.errors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }

      return isValid;
  }
onSubmit() {
  if(this.validateForm()) {
    console.log('Form submitted:', this.formData);
    //ToDo: Send data to my backend API
    alert("Registration successful!")
  }
}

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

toggleConfirmPasswordVisibility() {
  this.showConfirmPassword = !this.showConfirmPassword;
}

}
