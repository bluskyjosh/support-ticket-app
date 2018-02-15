import {ModelBase} from './model-base.model';

export class Status extends ModelBase {
  id: number;
  name: string;
  description: string;
  color: string;
  created_at: string;
  updated_at: string;
}
