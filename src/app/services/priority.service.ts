import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ServiceBase} from './service-base.service';
import {Priority} from '../models/priority.model';

@Injectable()
export class PriorityService extends ServiceBase {
  constructor(protected http: Http) {
    super (http);
  }

  getPriorities (): Observable<Priority[]> {
    return this.http.get(this.createUrl('priorities'), this.options)
      .map(this.extractPriorities);
  }

  getPriority(id: number): Observable<Priority> {
    return this.http.get(this.createUrl('priorities/' + id), this.options)
      .map(this.extractPriority);
  }

  createPriority(priority: Priority): Observable<Priority> {
    return this.http.post(this.createUrl('priorities'), priority, this.options)
      .map(this.extractPriority);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.http.put(this.createUrl('priorities/' + priority.id), priority, this.options)
      .map(this.extractPriority);
  }

  deletePriority(id: number): Observable<object> {
    return this.http.delete(this.createUrl('priorities/' + id), this.options)
      .map(data => {
        return data;
      });
  }

  private extractPriority(res: Response): Priority {
    const obj = res.json();
    const export_priority: Priority = new Priority().from(obj);
    return export_priority;
  }

  private extractPriorities(res: Response): Priority[] {
    const export_priorities: Priority[] = [];
    const objs = res.json();

    for (let i = 0; i < objs.length; i ++) {
      const obj = objs[i];
      const export_priority = new Priority().from(obj);
      export_priorities.push(export_priority);
    }

    return export_priorities;
  }

}
