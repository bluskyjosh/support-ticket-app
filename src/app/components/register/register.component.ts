import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { User} from '../../models/user.model';
import { AlertError } from '../../models/alert-error.model';
import { AlertMessageService } from '../../services/alert-message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: User;
  loading = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertMessageService: AlertMessageService) {

    this.model = new User();
  }

  ngOnInit() {
  }

  register(): void {
    this.loading = true;

    this.authService.register(this.model).subscribe(
      data => {
        this.alertMessageService.showSuccess('You have successfully registered.', 'Welcome');
        this.authService.setCurrentUser().subscribe(user => {
          this.router.navigateByUrl('home');
        });
      },
      errors => {
        this.loading = false;
        const alertErrors = new AlertError().from(errors.json());
        if (alertErrors.message === null) {
          this.alertMessageService.showError('Oops! Something went wrong!');
        } else {
          const errorString = alertErrors.getErrorString();
          this.alertMessageService.showError(errorString, alertErrors.message);
        }
      }
    );
  }

}
