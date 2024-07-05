import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'view-group', component: ViewGroupComponent, canActivate: [authGuard] },
];
