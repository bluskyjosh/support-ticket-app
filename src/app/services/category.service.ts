import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ServiceBase} from './service-base.service';
import {Category} from '../models/category.model';

@Injectable()
export class CategoryService extends ServiceBase {

  constructor(protected http: Http) {
    super (http);
  }

  getCategories (): Observable<Category[]> {
    return this.http.get(this.createUrl('categories'), this.options)
      .map(this.extractCategories);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get(this.createUrl('categories/' + id), this.options)
      .map(this.extractCategory);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post(this.createUrl('categories'), category, this.options)
      .map(this.extractCategory);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put(this.createUrl('categories/' + category.id), category, this.options)
      .map(this.extractCategory);
  }

  deleteCategory(id: number): Observable<object> {
    return this.http.delete(this.createUrl('categories/' + id), this.options)
      .map(data => {
        return data;
    });
  }

  private extractCategory(res: Response): Category {
    const obj = res.json();
    const export_category: Category = new Category().from(obj);
    return export_category;
  }

  private extractCategories(res: Response): Category[] {
    const export_categories: Category[] = [];
    const objs = res.json();

    for (let i = 0; i < objs.length; i ++) {
      const obj = objs[i];
      const export_category = new Category().from(obj);
      export_categories.push(export_category);
    }

    return export_categories;
  }

}
