import {ModelBase} from './model-base.model';

export class Jwt extends ModelBase {
  access_token: string;
  token_type: string;
  expires_in: number;
  expire_datetime: string;
}
