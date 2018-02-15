import {ModelBase} from './model-base.model';

export class Comment extends ModelBase {
  id: number;
  created_by_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
}
