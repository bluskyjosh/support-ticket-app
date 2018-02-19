import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './utilities/auth-guard';
import { HomeComponent } from './components/home/home.component';
import { TicketsComponent} from './components/tickets/tickets.component';
import { UsersComponent} from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PrioritiesComponent} from './components/priorities/priorities.component';
import { StatusesComponent} from './components/statuses/statuses.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      {path : 'tickets', component: TicketsComponent, canActivate: [AuthGuard]},
      {path: 'tickets/:id', component: TicketComponent, canActivate: [AuthGuard]},
      {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
      {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
      {path: 'priorities', component: PrioritiesComponent, canActivate: [AuthGuard]},
      {path: 'statuses', component: StatusesComponent, canActivate: [AuthGuard]}
    ]
  },
  // Public Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: 'home'}

];

export const routing = RouterModule.forRoot(appRoutes);

