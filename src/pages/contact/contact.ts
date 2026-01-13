import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  errors = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  contactInfo = [
    {
      icon: 'geo-alt',
      title: 'Visit Us',
      details: ['KG 123 St, Kigali', 'Rwanda']
    },
    {
      icon: 'telephone',
      title: 'Call Us',
      details: ['+250 788 123 456', '+250 788 654 321']
    },
    {
      icon: 'envelope',
      title: 'Email Us',
      details: ['info@isokoryubumenyi.rw', 'support@isokoryubumenyi.rw']
    },
    {
      icon: 'clock',
      title: 'Working Hours',
      details: ['Mon - Fri: 8AM - 5PM', 'Sat: 9AM - 2PM']
    }
  ];

  faqs = [
    {
      question: 'How do I enroll in a course?',
      answer: 'Simply create an account, browse our courses, and click "Enroll Now" on any course that interests you.'
    },
    {
      question: 'Are the courses aligned with REB curriculum?',
      answer: 'Yes, all our courses are designed to align with the Rwanda Education Board (REB) national curriculum.'
    },
    {
      question: 'Can I access courses on my mobile phone?',
      answer: 'Absolutely! Our platform is fully responsive and works seamlessly on all devices.'
    },
    {
      question: 'Do you offer certificates?',
      answer: 'Yes, you receive a certificate of completion for each course you successfully finish.'
    }
  ];

  validateForm(): boolean {
    let isValid = true;
    this.errors = { name: '', email: '', subject: '', message: '' };

    if (!this.formData.name.trim()) {
      this.errors.name = 'Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.formData.email.trim()) {
      this.errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(this.formData.email)) {
      this.errors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!this.formData.subject.trim()) {
      this.errors.subject = 'Subject is required';
      isValid = false;
    }

    if (!this.formData.message.trim()) {
      this.errors.message = 'Message is required';
      isValid = false;
    }

    return isValid;
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Form submitted:', this.formData);
      alert('Thank you for contacting us! We\'ll get back to you soon.');
      this.formData = { name: '', email: '', subject: '', message: '' };
    }
  }
}
