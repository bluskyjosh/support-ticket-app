import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';
import { AlertError} from '../../models/alert-error.model';
import {Ticket} from '../../models/ticket.model';
import {User} from '../../models/user.model';
import {TicketService} from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  tickets: Ticket[];
  currentUser: User;
  constructor(private router: Router,
              private rout: ActivatedRoute,
              private ticketService: TicketService,
              private alertMessageService: AlertMessageService) {
    this.tickets = [];
  }

  ngOnInit() {
    this.currentUser = new User().from(JSON.parse(sessionStorage.getItem('currentUser')));
    if (this.currentUser.is_admin) {
      this.ticketService.getTickets().subscribe(data => {
        this.tickets = data;
      });
    } else {
      this.ticketService.getMyTickets().subscribe(data => {
        this.tickets = data;
      });
    }
  }

  setStyle(value: string) {
    return {'background-color': value};
  }

  ticketDetail(ticket: Ticket) {
    this.router.navigateByUrl('/home/tickets/' + ticket.id);
  }

  newTicket() {
    this.router.navigateByUrl('/home/tickets/0');
  }

  deleteItem(ticket: Ticket, event) {
    this.ticketService.deleteTicket(ticket.id).subscribe( (data) => {
        this.alertMessageService.showSuccess('Ticket successfully deleted.', 'Delete Successful');
        const index = this.tickets.indexOf(ticket);
        this.tickets.splice(index, 1);
        this.tickets = [...this.tickets];

      },
      errors => {
        const alertErrors = new AlertError().from(errors.json());
        if (alertErrors.message === null) {
          this.alertMessageService.showError('Oops! Something went wrong');
        } else {
          const errorString = alertErrors.getErrorString();
          this.alertMessageService.showError(errorString, alertErrors.message);
        }
      });
  }

}
