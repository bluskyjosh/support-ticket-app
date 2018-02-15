import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {

  }

  /***
   * Returns true if Current user is set in session storage.
   *
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {Observable<boolean> | Promise<boolean> | boolean}
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (sessionStorage.getItem('currentUser')) {
      return true;
    }

    // not logged in return false
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: state.url
      }
    });

    return false;
  }
}
