import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';
import { AlertError} from '../../models/alert-error.model';
import {Status} from '../../models/status.model';
import {StatusService} from '../../services/status.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {StatusComponent} from '../status/status.component';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.css']
})
export class StatusesComponent implements OnInit {

  statuses: Status[];
  modalOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
  };
  constructor(private statusService: StatusService,
              private alertMessageService: AlertMessageService,
              private modalService: NgbModal) {
    this.statuses = [];
  }

  ngOnInit() {
    this.statusService.getStatuses().subscribe(data => {
      this.statuses = data;
    });
  }

  openModal(status: Status) {
    const original = new Status().from(status);
    const modalRef = this.modalService.open(StatusComponent, this.modalOptions);
    modalRef.componentInstance.status = original;
    modalRef.result.then((data) => {
        const foundStatus = this.statuses.find((o, i) => {
          if (o.id === data.id) {
            this.statuses[i] = data;
            return true;
          }
        });
        if (typeof foundStatus === 'undefined') {
          this.statuses.push(data);
        }
        this.statuses = [...this.statuses];
      },
      (dismissed) => {
      });

  }

  onNew() {
    const status = new Status();
    status.color = '#FFFFFF';
    this.openModal(status);
  }

  deleteItem(status: Status, event) {
    this.statusService.deleteStatus(status.id).subscribe( (data) => {
        this.alertMessageService.showSuccess('Status successfully deleted.', 'Delete Successful');
        const index = this.statuses.indexOf(status);
        this.statuses.splice(index, 1);

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

  setStyle(value: string) {
    const style = {'background-color': value};
    if (value === '#000000') {
      style['color'] = '#FFFFFF';
    }
    return style;
  }

}
