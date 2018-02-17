import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';
import { AlertError} from '../../models/alert-error.model';
import {Ticket} from '../../models/ticket.model';
import {TicketService} from '../../services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  statuses: Ticket[];
  constructor(private ticketService: TicketService,
              private alertMessageServic: AlertMessageService) {
    this.statuses = [];
  }

  ngOnInit() {
    this.ticketService.getTickets().subscribe(data => {
      this.statuses = data;
    });
  }

  setStyle(value: string) {
    return {'background-color': value};
  }

}
