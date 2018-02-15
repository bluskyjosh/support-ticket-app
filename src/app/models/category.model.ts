import {ModelBase} from './model-base.model';

export class Category extends ModelBase {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}
