import { LoggerService } from '@infra/logger/logger.service';
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    this.logger.error(
      `Exception caught by GlobalExceptionFilter: ${JSON.stringify(exception)}`,
      'GlobalExceptionFilter',
    );

    const errorMessage = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: '',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object') {
        Object.assign(errorMessage, exceptionResponse);
      } else {
        errorMessage.message = exceptionResponse;
      }
    }

    response.status(status).json(errorMessage);
  }
}
