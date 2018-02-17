import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';
import { AlertError} from '../../models/alert-error.model';
import {Status} from '../../models/status.model';
import {StatusService} from '../../services/status.service';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.css']
})
export class StatusesComponent implements OnInit {

  statuses: Status[];
  constructor(private statusService: StatusService,
              private alertMessageServic: AlertMessageService) {
    this.statuses = [];
  }

  ngOnInit() {
    this.statusService.getStatuses().subscribe(data => {
      this.statuses = data;
    });
  }

  setStyle(value: string) {
    return {'background-color': value};
  }

}
