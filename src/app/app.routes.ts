import { Routes } from '@angular/router';
import { IsokoLandingPageComponent } from './isoko-landing-page/isoko-landing-page';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';

export const routes: Routes = [
    { path: '', component: IsokoLandingPageComponent},
    { path: 'register', component: Register},
    { path: 'login', component: Login},
    { path: '**', redirectTo: ''}
];
