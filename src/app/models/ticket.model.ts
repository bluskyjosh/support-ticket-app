import {ModelBase} from './model-base.model';
import {Priority} from './priority.model';
import {Category} from './category.model';
import {Status} from './status.model';

export class Ticket extends ModelBase {
  id: number;
  category_id: number;
  priority_id: number;
  ticket_id: string;
  title: string;
  description: string;
  status_id: number;
  created_by_id: number;
  updated_by_id: number;
  priority: Priority;
  category: Category;
  status: Status;
  comments: Comment[];
}
