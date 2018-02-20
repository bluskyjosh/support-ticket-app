import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';
import { AlertError} from '../../models/alert-error.model';
import {Priority} from '../../models/priority.model';
import {PriorityService} from '../../services/priority.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {PriorityComponent} from '../priority/priority.component';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  priorities: Priority[];
  modalOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
  };

  constructor(private priorityService: PriorityService,
              private alertMessageService: AlertMessageService,
              private modalService: NgbModal) {
    this.priorities = [];
  }

  ngOnInit() {
    this.priorityService.getPriorities().subscribe(data => {
      this.priorities = data;
    });
  }

  openModal(priority: Priority) {
    const original = new Priority().from(priority);
    const modalRef = this.modalService.open(PriorityComponent, this.modalOptions);
    modalRef.componentInstance.priority = original;
    modalRef.result.then((data) => {
      const foundPriority = this.priorities.find((o, i) => {
        if (o.id === data.id) {
          this.priorities[i] = data;
          return true;
        }
      });
      if (typeof foundPriority === 'undefined') {
        this.priorities.push(data);
      }
      this.priorities = [...this.priorities];
      },
      (dismissed) => {
      });

  }

  onNew() {
    const priority = new Priority();
    priority.color = '#FFFFFF';
    this.openModal(priority);
  }

  deleteItem(priority: Priority, event) {
    this.priorityService.deletePriority(priority.id).subscribe( (data) => {
        this.alertMessageService.showSuccess('Priority successfully deleted.', 'Delete Successful');
        const index = this.priorities.indexOf(priority);
        this.priorities.splice(index, 1);
        this.priorities = [...this.priorities];

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
