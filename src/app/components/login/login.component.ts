import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService
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
        this.authService.setCurrentUser().subscribe(user => {
          this.router.navigateByUrl('home');
        });
      },
      errors => {
        this.loading = false;
      }
    );
  }

  forgotPassword() {
    this.authService.forgotPassword(this.model.email).subscribe(data => {

    });
  }

  register() {
    this.router.navigateByUrl('register');
  }
}
