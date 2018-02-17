import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ServiceBase} from './service-base.service';
import {Status} from '../models/status.model';

@Injectable()
export class StatusService extends ServiceBase {
  constructor(protected http: Http) {
    super (http);
  }

  getStatuses (): Observable<Status[]> {
    return this.http.get(this.createUrl('statuses'), this.createRequestHeaderOptions())
      .map(this.extractStatuses);
}

  getStatus(id: number): Observable<Status> {
    return this.http.get(this.createUrl('statuses/' + id), this.createRequestHeaderOptions())
      .map(this.extractStatus);
}

  createStatus(status: Status): Observable<Status> {
    return this.http.post(this.createUrl('statuses'), status, this.createRequestHeaderOptions())
      .map(this.extractStatus);
}

  updateStatus(status: Status): Observable<Status> {
    return this.http.put(this.createUrl('statuses/' + status.id), status, this.createRequestHeaderOptions())
      .map(this.extractStatus);
}

  deleteStatus(id: number): Observable<object> {
    return this.http.delete(this.createUrl('statuses/' + id), this.createRequestHeaderOptions())
      .map(data => {
        return data;
      });
}

private extractStatus(res: Response): Status {
    const obj = res.json();
    const export_status: Status = new Status().from(obj);
    return export_status;
  }

private extractStatuses(res: Response): Status[] {
    const export_statuses: Status[] = [];
    const objs = res.json();

    for (let i = 0; i < objs.length; i ++) {
      const obj = objs[i];
      const export_status = new Status().from(obj);
      export_statuses.push(export_status);
    }

    return export_statuses;
  }
}
