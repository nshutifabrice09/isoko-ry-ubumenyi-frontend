import { Routes } from '@angular/router';
import { IsokoLandingPageComponent } from './isoko-landing-page/isoko-landing-page';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Courses } from '../pages/courses/courses';
import { About } from '../pages/about/about';
import { Instructors } from '../pages/instructors/instructors';
import { Contact } from '../pages/contact/contact';

export const routes: Routes = [
    { path: '', component: IsokoLandingPageComponent},
    { path: 'register', component: Register},
    { path: 'login', component: Login},
    { path: 'courses', component: Courses},
    { path: 'about', component: About},
    { path: 'instructors', component: Instructors},
    { path: 'contact', component: Contact},
    { path: '**', redirectTo: ''}
];
