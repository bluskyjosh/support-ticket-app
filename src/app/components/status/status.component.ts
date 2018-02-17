import { Component, OnInit, Input } from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AlertError} from '../../models/alert-error.model';
import {StatusService} from '../../services/status.service';
import {Status} from '../../models/status.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() status: Status;
  type: string;

  constructor(public activeModal: NgbActiveModal,
              private statusService: StatusService,
              private alertMessageService: AlertMessageService) {

  }

  ngOnInit() {
    if (typeof this.status.id === 'undefined') {
      this.type = 'New';
    } else {
      this.type = 'Edit';
    }
  }

  save() {
    if (typeof this.status.id === 'undefined') {
      this.statusService.createStatus(this.status).subscribe( data => {
          this.status = data;
          this.alertMessageService.showSuccess('Status successfully created.', 'Save Successful');
          this.activeModal.close(this.status);
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
      this.statusService.updateStatus(this.status).subscribe(data => {
          this.status = data;
          this.alertMessageService.showSuccess('Status successfully updated.', 'Save Successfull');
          this.activeModal.close(this.status);
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
