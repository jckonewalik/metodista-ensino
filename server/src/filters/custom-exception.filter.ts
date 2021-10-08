import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { CustomException } from 'src/exceptions/custom.exception';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { RequestValidationException } from 'src/exceptions/request-validation.exception';

@Catch(RequestValidationException, NotFoundException, BadRequestException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.statusCode;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      errors: exception.serializeErrors(),
    });
  }
}
