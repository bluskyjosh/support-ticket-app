import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  activeComponent: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentUser = new User().from(JSON.parse(sessionStorage.getItem('currentUser')));
    if (this.currentUser.is_admin) {
      this.activeComponent = 'AllTickets';
    } else {
      this.activeComponent = 'MyTickets';
    }
  }

  setVisibleComponent(component: string): void {
    this.activeComponent = component;
  }

  isActiveComponent(component: string): boolean {
    return this.activeComponent === component;
  }

  logout(): void {
    this.router.navigateByUrl('/login');
  }

}
