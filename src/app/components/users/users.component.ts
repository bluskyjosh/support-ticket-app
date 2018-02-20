import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AlertError} from '../../models/alert-error.model';
import {UserService} from '../../services/user.service';
import {AlertMessageService} from '../../services/alert-message.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {UserComponent} from '../user/user.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  modalOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
  };
  constructor(private userService: UserService,
              private alertMessageService: AlertMessageService,
              private modalService: NgbModal) {
    this.users = [];
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  openModal(user: User) {
    const original = new User().from(user);
    const modalRef = this.modalService.open(UserComponent, this.modalOptions);
    modalRef.componentInstance.user = original;
    modalRef.result.then((data) => {
        const foundStatus = this.users.find((o, i) => {
          if (o.id === data.id) {
            this.users[i] = data;
            return true;
          }
        });
        if (typeof foundStatus === 'undefined') {
          this.users.push(data);
        }
        this.users = [...this.users];
      },
      (dismissed) => {
      });

  }

  onNew() {
    const user = new User();
    this.openModal(user);
  }

  deleteItem(user: User, event) {
    this.userService.deleteUser(user.id).subscribe( (data) => {
        this.alertMessageService.showSuccess('Status successfully deleted.', 'Delete Successful');
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
        this.users = [...this.users];

      },
      errors => {
        const alertErrors = new AlertError().from(errors.json());
        if (alertErrors.message === null) {
          this.alertMessageService.showError('Oops! Something went wrong');
        } else {
          const errorString = alertErrors.getErrorString();
          this.alertMessageService.showError(errorString, alertErrors.message);
        }
      });
  }

  boolComparator(propA: number, propB: number) {
    if (propA < propB) { return -1; }
    if (propA >= propB) { return 1; }
  }

}
