import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';
import { AlertError} from '../../models/alert-error.model';
import {Priority} from '../../models/priority.model';
import {PriorityService} from '../../services/priority.service';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  priorities: Priority[];
  constructor(private priorityService: PriorityService,
              private alertMessageService: AlertMessageService) {
    this.priorities = [];
  }

  ngOnInit() {
    this.priorityService.getPriorities().subscribe(data => {
      this.priorities = data;
    });
  }

  setStyle(value: string) {
    const style = {'background-color': value};
    if (value === '#000000') {
      style['color'] = '#FFFFFF';
    }
    return style;
  }

}
