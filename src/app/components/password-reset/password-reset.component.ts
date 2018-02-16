import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertMessageService} from '../../services/alert-message.service';
import {AlertError} from '../../models/alert-error.model';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  model: any = {};
  token: string;

  constructor(private authService: AuthService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private alertMessageService: AlertMessageService) { }

  ngOnInit() {
    this.token = this.activeRoute.snapshot.paramMap.get('id');
  }

  reset() {
    this.authService.resetPassword(this.model.email,
      this.model.password,
      this.model.confirmPassword,
      this.token).subscribe(resp => {
        this.router.navigateByUrl('login');
      },
      errors => {
        const alertErrors = new AlertError().from(errors.json());
        if (alertErrors.message === null) {
          this.alertMessageService.showError('Oops! Something went wrong!');
        } else {
          const errorString = alertErrors.getErrorString();
          if (errorString === 'passwords.token') {
            this.alertMessageService.showError('Reset password expired. Please request a new reset password email.', alertErrors.message);
          } else {
            this.alertMessageService.showError(errorString, alertErrors.message);
          }
        }
      }
    );
  }

}
