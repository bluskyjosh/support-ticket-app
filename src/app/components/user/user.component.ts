import { Component, OnInit, Input } from '@angular/core';
import { User} from '../../models/user.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AlertError } from '../../models/alert-error.model';
import { AlertMessageService } from '../../services/alert-message.service';
import { UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  currentUser: User;

  constructor(public activeModal: NgbActiveModal,
              private userService: UserService,
              private alertMessageService: AlertMessageService) { }

  ngOnInit() {
    this.currentUser = new User().from(JSON.parse(sessionStorage.getItem('currentUser')));
  }

  save(): void {
    if (this.isNewUser()) {
      this.userService.createUser(this.user).subscribe(
        data => {
          this.user = data;
          this.alertMessageService.showSuccess('User successfully created.', 'Save Successful');
          this.activeModal.close(this.user);
        },
        errors => {
          const alertErrors = new AlertError().from(errors.json());
          if (alertErrors.message === null) {
            this.alertMessageService.showError('Oops! Something went wrong!');
          } else {
            const errorString = alertErrors.getErrorString();
            this.alertMessageService.showError(errorString, alertErrors.message);
          }
        }
      );
    } else {
      this.userService.updateUser(this.user).subscribe(
        data => {
          this.alertMessageService.showSuccess('User successfully updated.', 'Save Successful');
          this.activeModal.close(this.user);
        },
        errors => {
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

  isNewUser(): boolean {
    return (typeof this.user.id === 'undefined');
  }

  passwordExists(): boolean {
    return (typeof this.user.password !== 'undefined');
  }

  isCurrentUser(): boolean {
    return (typeof this.user.id !== 'undefined' && this.user.id === this.currentUser.id);
  }


}
