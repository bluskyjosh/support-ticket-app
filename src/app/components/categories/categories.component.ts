import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { AlertMessageService } from '../../services/alert-message.service';
import { AlertError} from '../../models/alert-error.model';
import {Category} from '../../models/category.model';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {CategoryComponent} from '../category/category.component';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  selected: Category;

  modalOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
  };

  constructor(private categoryService: CategoryService,
              private alertMessageService: AlertMessageService,
              private modalService: NgbModal) {
    this.categories = [];
  }

  ngOnInit() {
    this.selected = new Category();
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  openModal(category: Category) {
    const original = new Category().from(category);
    const modalRef = this.modalService.open(CategoryComponent, this.modalOptions);
    modalRef.componentInstance.category = original;
    modalRef.result.then((data) => {
        const foundCategory = this.categories.find((o, i) => {
          if (o.id === data.id) {
            this.categories[i] = data;
            return true;
          }
        });
        if (typeof foundCategory === 'undefined') {
          this.categories.push(data);
        }
        this.categories = [...this.categories];
      },
      (dismissed) => {
      });

  }
  onNew() {
    const category = new Category();
    this.openModal(category);
  }

  deleteItem(category: Category, event) {
    this.categoryService.deleteCategory(category.id).subscribe( (data) => {
      this.alertMessageService.showSuccess('Category successfully deleted.', 'Delete Successful');
      const index = this.categories.indexOf(category);
      this.categories.splice(index, 1);
      this.categories = [...this.categories];

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
