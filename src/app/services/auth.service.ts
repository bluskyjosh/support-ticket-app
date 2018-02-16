import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { User} from '../models/user.model';
import { Jwt } from '../models/jwt.model';
import { environment} from '../../environments/environment';


@Injectable()
export class AuthService {
  baseURL: string;
  private currentUser: Subject<User>;

  constructor(protected http: HttpClient) {
    this.baseURL = environment.apiUrl + '/api/';
    this.currentUser = <Subject<User>>new Subject();
  }

  /***
   * Get the currently logged in user.
   * @returns {Observable<User>}
   */
  get getCurrentUser(): Observable<User> {
    if (this.currentUser.observers.length === 0) {
      const userObj = JSON.parse(sessionStorage.getItem('currentUser'));

      if (userObj) {
        const user: User = new User().from(userObj);
        this.currentUser.next(user);
      }
    }
    return this.currentUser.asObservable();
  }

  /***
   * Call to API to retrieve user from access token.
   * Sets returned user as Current user and stores
   * user in session storage.
   * @returns {Observable<User>}
   */

  setCurrentUser(): Observable<User> {
    const jwtToken = sessionStorage.getItem('userToken')
      ? new Jwt().from(JSON.parse(sessionStorage.getItem('userToken')))
      : null;
    const headers = this.createRequestHeader(jwtToken);
    return this.http
      .get(this.baseURL + 'user_from_token', { headers })
      .map((response: Response) => {
        const user = new User().from(response);
        if (user) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUser.next(user);
        return user;
      });
  }

  /***
   * Send login request to API.
   * @param {string} email
   * @param {string} password
   * @returns {Observable<Jwt>}
   */
  login(email: string, password: string): Observable<Jwt> {
    const headers = this.createRequestHeader();
    return this.http
      .post(
        this.baseURL + 'authenticate',
        JSON.stringify({ email: email, password: password }),
        { headers }
      )
      .map((response: Response) => {
        const jwtResponse = new Jwt().from(response);
        if (jwtResponse && jwtResponse.access_token) {
          // store token to session storage for future requests.
          sessionStorage.setItem('userToken', JSON.stringify(jwtResponse));
        }

        return jwtResponse;
      });
  }

  /***
   * Send Logout request to API.
   * Delete logged in user's session storage data.
   */
  logout(): void {
    // logout user.
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userToken');
  }

  forgotPassword(email: string): Observable<Object> {
    const headers = this.createRequestHeader();
    return this.http.post(this.baseURL + 'password/forgot', {email: email}, {headers});
  }

  resetPassword(email: string, password: string, confirm_password: string, token: string): Observable<Object> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'password/reset',
      {email: email, password: password, password_confirmation: confirm_password, token: token},
      {responseType: 'text', headers});

  }

  register(user: User): Observable<Jwt> {
    const headers = this.createRequestHeader();
    return this.http.post(this.baseURL + 'register', user, { headers })
      .map((response: Response) => {
        const jwtResponse = new Jwt().from(response);
        if (jwtResponse && jwtResponse.access_token) {
          // store token to session storage for future requests.
          sessionStorage.setItem('userToken', JSON.stringify(jwtResponse));
        }

        return jwtResponse;
    });
  }

  protected createRequestHeader(jwtToken: Jwt = null): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    if (jwtToken) {
      headers = headers.append(
        'Authorization',
        jwtToken.token_type + ' ' + jwtToken.access_token
      );
    }
    return headers;
  }

  private extractUser(res: any) {
    const obj = res;
    const user = new User();
    return user;
  }
}
