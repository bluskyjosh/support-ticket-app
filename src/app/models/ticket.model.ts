import {ModelBase} from './model-base.model';

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
}
