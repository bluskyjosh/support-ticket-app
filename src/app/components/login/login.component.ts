import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertError} from '../../models/alert-error.model';
import { AuthService } from '../../services/auth.service';
import { AlertMessageService } from '../../services/alert-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertMessageService: AlertMessageService
  ) {}

  ngOnInit(): void {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.loading = true;

    this.authService.login(this.model.email, this.model.password).subscribe(
      data => {
        this.alertMessageService.showSuccess('Welcome!', 'Login Successful');
        this.authService.setCurrentUser().subscribe(user => {
          this.router.navigateByUrl('home');
        });
      },
      errors => {
        this.loading = false;
        const alertErrors = new AlertError().from(errors.json());
        if (!alertErrors.message) {
          this.alertMessageService.showError('Username or password incorrect.', 'Login attempt failed');
        } else {
          const errorString = alertErrors.getErrorString();
          this.alertMessageService.showError(errorString, alertErrors.message);
        }
      }
    );
  }

  forgotPassword() {
    this.authService.forgotPassword(this.model.email).subscribe(data => {
        this.alertMessageService.showSuccess('Check your inbox for reset password email.', 'Forgot Password Request Sent');
    },
      errors => {
        const alertErrors = new AlertError().from(errors.json());
        if (alertErrors.message === null) {
          this.alertMessageService.showError('Oops! Something went wrong!');
        } else {
          const errorString = alertErrors.getErrorString();
          this.alertMessageService.showError(errorString, alertErrors.message);
        }
      });
  }

  register() {
    this.router.navigateByUrl('register');
  }
}
