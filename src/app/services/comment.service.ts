import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ServiceBase} from './service-base.service';
import {Comment} from '../models/comment.model';
@Injectable()
export class CommentService extends ServiceBase {

  constructor(http: Http) {
    super(http);
  }

  getComments(ticket_id: number): Observable<Comment[]> {
    return this.http.get(this.createUrl('tickets/' + ticket_id + '/comments'), this.createRequestHeaderOptions())
      .map(this.extractComments);
  }

  getComment(ticket_id: number, comment_id: number): Observable<Comment> {
    return this.http.get(this.createUrl('tickets/' + ticket_id + '/comments/' + comment_id), this.createRequestHeaderOptions())
      .map(this.extractComment);
  }

  createComment(ticket_id: number, comment: Comment): Observable<Comment> {
    return this.http.post(this.createUrl('tickets/' + ticket_id + '/comments'), comment, this.createRequestHeaderOptions())
      .map(this.extractComment);
  }

  updateComment(ticket_id: number, comment: Comment): Observable<Comment> {
    return this.http.put(this.createUrl('tickets/' + ticket_id + '/comments/' + comment.id), comment, this.createRequestHeaderOptions())
      .map(this.extractComment);
  }

  deleteComment(ticket_id: number, comment_id: number): Observable<object> {
    return this.http.delete(this.createUrl('tickets/' + ticket_id + '/comments/' + comment_id), this.createRequestHeaderOptions())
      .map(data => {
        return data;
    });
  }


  private extractComments(res: Response): Comment[] {
    const comments: Comment[] = [];
    const objs = res.json();
    const l = objs.length;
    for (let i = 0; i < l; i++) {
      const obj = objs[i];
      const comment: Comment = new Comment().from(obj);
      comments.push(comment);
    }
    return comments;
  }

  private extractComment(res: Response): Comment {
    const obj = res.json();
    const comment: Comment = new Comment().from(obj);
    return comment;
  }

}


