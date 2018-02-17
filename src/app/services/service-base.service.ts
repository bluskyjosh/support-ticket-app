import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Jwt } from '../models/jwt.model';
import {environment} from '../../environments/environment';

@Injectable()
export class ServiceBase {
  baseURL: string;
  options: RequestOptions;

  constructor(protected http: Http) {
    this.baseURL = environment.apiUrl + '/api/';
  }

  protected createRequestHeaderOptions(): RequestOptions {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');

    const jwtToken = sessionStorage.getItem('userToken') ? new Jwt().from(JSON.parse(sessionStorage.getItem('userToken'))) : null;
    if (jwtToken) {
      headers.append('Authorization', jwtToken.token_type + ' ' + jwtToken.access_token);
    }
    const options = new RequestOptions(
      {
        headers: headers
      }
    );
    return options;
  }

  protected createUrl(url: string, parameters: {[key: string]: string} = null ): string {
    let export_url = this.baseURL + url;

    if (parameters != null) {
      export_url = export_url + '?';
      for (const key of Object.keys(parameters)) {
        export_url = export_url + key + '=' + parameters[key] + '&';
      }
    }

    return export_url;
  }
}
