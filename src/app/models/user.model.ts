import {ModelBase} from './model-base.model';

export class User extends ModelBase {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  created_at: string;
  updated_at: string;
}

