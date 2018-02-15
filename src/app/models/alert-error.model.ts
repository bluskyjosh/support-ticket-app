import {ModelBase} from './model-base.model';

export class AlertError extends ModelBase {
  message: string;
  errors: any[];

  getErrorString(): string {
    let returnString = '';

    if (typeof this.errors === 'string') {
      return this.errors;
    }
    for (const key of Object.keys(this.errors)) {
      returnString += key.toString() + ':' + '<br />';
      returnString += '<ul>';
      for (let i = 0; i < this.errors[key].length; i++) {
        returnString += '<li>' + this.errors[key][i] + '</li>';
      }
      returnString += '</ul>';
    }
    return returnString;
  }
}
