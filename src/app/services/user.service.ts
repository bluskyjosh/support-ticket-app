import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ServiceBase} from './service-base.service';
import {User} from '../models/user.model';


@Injectable()
export class UserService extends ServiceBase {

  constructor(protected http: Http) {
    super (http);
  }

  getUsers (): Observable<User[]> {
    return this.http.get(this.createUrl('users'), this.createRequestHeaderOptions())
      .map(this.extractUsers);
  }

  getUser(id: number): Observable<User> {
    return this.http.get(this.createUrl('users/' + id), this.createRequestHeaderOptions())
      .map(this.extractUser);
  }

  createUser(user: User): Observable<User> {
    return this.http.post(this.createUrl('users'), user, this.createRequestHeaderOptions())
      .map(this.extractUser);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put(this.createUrl('users/' + user.id), user, this.createRequestHeaderOptions())
      .map(this.extractUser);
  }

  deleteUser(id: number): Observable<object> {
    return this.http.delete(this.createUrl('users/' + id), this.createRequestHeaderOptions())
      .map(data => {
        return data;
      });
  }

  private extractUser(res: Response): User {
    const obj = res.json();
    const export_user: User = new User().from(obj);
    return export_user;
  }

  private extractUsers(res: Response): User[] {
    const export_users: User[] = [];
    const objs = res.json();

    for (let i = 0; i < objs.length; i ++) {
      const obj = objs[i];
      const export_user = new User().from(obj);
      export_users.push(export_user);
    }

    return export_users;
  }

}
