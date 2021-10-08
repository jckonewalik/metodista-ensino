import { CustomException } from './custom.exception';

export class BadRequestException extends CustomException {
  statusCode = 400;
  constructor(private errorMessage: string, private field: string) {
    super('Bad Request');

    Object.setPrototypeOf(this, BadRequestException.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.errorMessage,
        field: this.field,
      },
    ];
  }
}
