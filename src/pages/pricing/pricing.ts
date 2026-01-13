import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing {
  billingCycle: 'monthly' | 'annual' = 'monthly';

  plans = [
    {
      name: 'Free',
      description: 'Perfect for trying out our platform',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { text: 'Access to 5 free courses', included: true },
        { text: 'Basic learning materials', included: true },
        { text: 'Community forum access', included: true },
        { text: 'Email support', included: false },
        { text: 'Certificates', included: false },
        { text: 'Live sessions', included: false }
      ],
      color: 'gray',
      popular: false
    },
    {
      name: 'Student',
      description: 'Best for individual learners',
      monthlyPrice: 5000,
      annualPrice: 50000,
      features: [
        { text: 'Access to ALL courses', included: true },
        { text: 'Download materials', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Certificates of completion', included: true },
        { text: 'Monthly live Q&A sessions', included: true },
        { text: 'Progress tracking', included: true }
      ],
      color: 'blue',
      popular: true
    },
    {
      name: 'Premium',
      description: 'For serious learners',
      monthlyPrice: 10000,
      annualPrice: 100000,
      features: [
        { text: 'Everything in Student plan', included: true },
        { text: 'One-on-one tutoring (2hrs/month)', included: true },
        { text: '24/7 priority support', included: true },
        { text: 'Exclusive masterclasses', included: true },
        { text: 'Career guidance', included: true },
        { text: 'Early access to new courses', included: true }
      ],
      color: 'purple',
      popular: false
    }
  ];

  faqs = [
    {
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Mobile Money (MTN, Airtel), credit/debit cards, and bank transfers.'
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'Yes, we offer a 7-day money-back guarantee if you\'re not satisfied with our service.'
    },
    {
      question: 'Do you offer discounts for schools?',
      answer: 'Yes, we have special institutional pricing. Please contact us for more information.'
    }
  ];

  toggleBilling() {
    this.billingCycle = this.billingCycle === 'monthly' ? 'annual' : 'monthly';
  }

  getPrice(plan: any): number {
    return this.billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
  }

  getSavings(plan: any): number {
    if (plan.monthlyPrice === 0) return 0;
    return (plan.monthlyPrice * 12) - plan.annualPrice;
  }
}
