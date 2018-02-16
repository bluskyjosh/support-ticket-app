import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { routing } from './app.routing';


import { AppComponent } from './app.component';
import {AuthGuard} from './utilities/auth-guard';
import {AuthService} from './services/auth.service';
import {CategoryService} from './services/category.service';
import {CommentService} from './services/comment.service';
import {PriorityService} from './services/priority.service';
import {StatusService} from './services/status.service';
import {TicketService} from './services/ticket.service';
import {UserService} from './services/user.service';


import * as $ from 'jquery';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxChartsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthService,
    CategoryService,
    CommentService,
    PriorityService,
    StatusService,
    TicketService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
