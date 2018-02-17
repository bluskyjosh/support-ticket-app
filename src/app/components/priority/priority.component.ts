import { Component, OnInit, Input } from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AlertError} from '../../models/alert-error.model';
import {PriorityService} from '../../services/priority.service';
import {Priority} from '../../models/priority.model';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css'],
  providers: [PriorityService]
})
export class PriorityComponent implements OnInit {

  @Input() priority: Priority;
  type: string;

  constructor(public activeModal: NgbActiveModal,
              private priorityService: PriorityService,
              private alertMessageService: AlertMessageService) {

  }

  ngOnInit() {
    if (typeof this.priority.id === 'undefined') {
      this.type = 'New';
    } else {
      this.type = 'Edit';
    }
  }

  save() {
    if (typeof this.priority.id === 'undefined') {
      this.priorityService.createPriority(this.priority).subscribe( data => {
          this.priority = data;
          this.alertMessageService.showSuccess('Priority successfully created.', 'Save Successful');
          this.activeModal.close(this.priority);
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
    } else {
      this.priorityService.updatePriority(this.priority).subscribe(data => {
          this.priority = data;
          this.alertMessageService.showSuccess('Priority successfully updated.', 'Save Successfull');
          this.activeModal.close(this.priority);
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
}
