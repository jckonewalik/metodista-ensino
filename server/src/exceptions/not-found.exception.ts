import { CustomException } from './custom.exception';

export class NotFoundException extends CustomException {
  statusCode = 404;
  constructor(private errorMessage: string, private field: string) {
    super('Bad Request');

    Object.setPrototypeOf(this, NotFoundException.prototype);
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
