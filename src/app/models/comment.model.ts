import {ModelBase} from './model-base.model';
import {User} from './user.model';

export class Comment extends ModelBase {
  id: number;
  created_by_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  created_by: User;
}
