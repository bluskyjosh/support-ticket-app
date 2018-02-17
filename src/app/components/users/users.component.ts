import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AlertError} from '../../models/alert-error.model';
import {UserService} from '../../services/user.service';
import {AlertMessageService} from '../../services/alert-message.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService,
              private alertMessageService: AlertMessageService) {
    this.users = [];
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  boolComparator(propA: number, propB: number) {
    if (propA < propB) { return -1; }
    if (propA >= propB) { return 1; }
  }

}
