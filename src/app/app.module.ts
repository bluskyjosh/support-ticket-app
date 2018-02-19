import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule} from 'ngx-color-picker';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule  } from '@swimlane/ngx-datatable';
import { routing } from './app.routing';
import { ToastrModule } from 'ngx-toastr';



import {AlertMessageService} from './services/alert-message.service';
import {AuthGuard} from './utilities/auth-guard';
import {AuthService} from './services/auth.service';
import {CategoryService} from './services/category.service';
import {CommentService} from './services/comment.service';
import {PriorityService} from './services/priority.service';
import {StatusService} from './services/status.service';
import {TicketService} from './services/ticket.service';
import {UserService} from './services/user.service';

import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { UsersComponent } from './components/users/users.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { UserComponent } from './components/user/user.component';
import { CategoryComponent } from './components/category/category.component';
import { PriorityComponent } from './components/priority/priority.component';
import { StatusComponent } from './components/status/status.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PrioritiesComponent } from './components/priorities/priorities.component';
import { StatusesComponent } from './components/statuses/statuses.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent,
    UsersComponent,
    TicketComponent,
    UserComponent,
    CategoryComponent,
    PriorityComponent,
    StatusComponent,
    TicketsComponent,
    CategoriesComponent,
    PrioritiesComponent,
    StatusesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxChartsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    routing,
    ToastrModule.forRoot({
      enableHtml: true
    }),
  ],
  providers: [
    AlertMessageService,
    AuthGuard,
    AuthService,
    CategoryService,
    CommentService,
    PriorityService,
    StatusService,
    TicketService,
    UserService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CategoryComponent,
    PriorityComponent,
    StatusComponent,
    UserComponent
  ]
})
export class AppModule { }
