import { LoggerService } from '@infra/logger/services/logger.service';
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let status = 500;
    let message: string = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const resp = exceptionResponse as Record<string, unknown>;
        message =
          typeof resp.message === 'string'
            ? resp.message
            : JSON.stringify(resp.message);
      }
    }

    this.logger.error(
      `Exception caught by GlobalExceptionFilter:  ${JSON.stringify({
        message,
        status,
        path: request.url,
        method: request.method,
        body: request.body,
      })}`,
      '',
      'GlobalExceptionFilter',
    );

    const errorMessage = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    if (response.sent) {
      return;
    }

    response.code(status).send(errorMessage);
  }
}
