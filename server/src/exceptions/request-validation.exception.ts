import { ValidationError } from 'class-validator';
import { CustomException } from './custom.exception';

export class RequestValidationException extends CustomException {
  statusCode = 400;
  constructor(private errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationException.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return {
        message: error.constraints[Object.keys(error.constraints)[0]],
        field: error.property,
      };
    });
  }
}
