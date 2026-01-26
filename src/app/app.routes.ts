import { Routes } from '@angular/router';
import { IsokoLandingPageComponent } from './isoko-landing-page/isoko-landing-page';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Course } from '../pages/course/course';
import { About } from '../pages/about/about';
import { Instructors } from '../pages/instructors/instructors';
import { Contact } from '../pages/contact/contact';
import { PrivacyPolicy } from '../pages/privacy-policy/privacy-policy';
import { TermsOfService } from '../pages/terms-of-service/terms-of-service';
import { Pricing } from '../pages/pricing/pricing';

export const routes: Routes = [
    { path: '', component: IsokoLandingPageComponent},
    { path: 'register', component: Register},
    { path: 'login', component: Login},
    { path: 'course', component: Course},
    { path: 'about', component: About},
    { path: 'instructors', component: Instructors},
    { path: 'contact', component: Contact},
    { path: 'privacy-policy', component: PrivacyPolicy},
    { path: 'terms-of-service', component: TermsOfService},
    { path: 'pricing', component: Pricing},
    { path: '**', redirectTo: ''}

    
];

