import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './utilities/auth-guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},

  // Public Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: 'home'}

];

export const routing = RouterModule.forRoot(appRoutes);

