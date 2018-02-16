import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';
import { User} from '../../models/user.model';

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
    private authService: AuthService) {

    this.model = new User();
  }

  ngOnInit() {
  }

  register(): void {
    this.loading = true;

    this.authService.register(this.model).subscribe(
      data => {
        this.authService.setCurrentUser().subscribe(user => {
          this.router.navigateByUrl('home');
        });
      },
      errors => {
        this.loading = false;
      }
    );
  }

}
