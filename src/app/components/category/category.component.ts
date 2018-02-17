import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { AlertMessageService } from '../../services/alert-message.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AlertError} from '../../models/alert-error.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  type: string;

  constructor(public activeModal: NgbActiveModal,
              private categoryService: CategoryService,
              private alertMessageService: AlertMessageService) {

  }

  ngOnInit() {
    if (typeof this.category.id === 'undefined') {
      this.type = 'New';
    } else {
      this.type = 'Edit';
    }
  }

  save() {
    if (typeof this.category.id === 'undefined') {
      this.categoryService.createCategory(this.category).subscribe( data => {
        this.category = data;
        this.alertMessageService.showSuccess('Category successfully created.', 'Save Successful');
        this.activeModal.close(this.category);
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
      this.categoryService.updateCategory(this.category).subscribe(data => {
        this.category = data;
        this.alertMessageService.showSuccess('Category successfully updated.', 'Save Successfull');
        this.activeModal.close(this.category);
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
