import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ServiceBase} from './service-base.service';
import {Ticket} from '../models/ticket.model';


@Injectable()
export class TicketService extends ServiceBase {

  constructor(protected http: Http) {
    super (http);
  }

  getTickets (): Observable<Ticket[]> {
    return this.http.get(this.createUrl('tickets'), this.options)
      .map(this.extractTickets);
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get(this.createUrl('tickets/' + id), this.options)
      .map(this.extractTicket);
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post(this.createUrl('tickets'), ticket, this.options)
      .map(this.extractTicket);
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put(this.createUrl('tickets/' + ticket.id), ticket, this.options)
      .map(this.extractTicket);
  }

  deleteTicket(id: number): Observable<object> {
    return this.http.delete(this.createUrl('tickets/' + id), this.options)
      .map(data => {
        return data;
      });
  }

  getMyTickets (): Observable<Ticket[]> {
    return this.http.get(this.createUrl('my_tickets'), this.options)
      .map(this.extractTickets);
  }

  getMyTicket(id: number): Observable<Ticket> {
    return this.http.get(this.createUrl('my_tickets/' + id), this.options)
      .map(this.extractTicket);
  }

  createMyTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post(this.createUrl('my_tickets'), ticket, this.options)
      .map(this.extractTicket);
  }

  updateMyTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put(this.createUrl('my_tickets/' + ticket.id), ticket, this.options)
      .map(this.extractTicket);
  }

  deleteMyTicket(id: number): Observable<object> {
    return this.http.delete(this.createUrl('my_tickets/' + id), this.options)
      .map(data => {
        return data;
      });
  }

  private extractTicket(res: Response): Ticket {
    const obj = res.json();
    const export_ticket: Ticket = new Ticket().from(obj);
    return export_ticket;
  }

  private extractTickets(res: Response): Ticket[] {
    const export_tickets: Ticket[] = [];
    const objs = res.json();

    for (let i = 0; i < objs.length; i ++) {
      const obj = objs[i];
      const export_ticket = new Ticket().from(obj);
      export_tickets.push(export_ticket);
    }

    return export_tickets;
  }

}
