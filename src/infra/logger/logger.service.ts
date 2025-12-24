import {
  Injectable,
  Logger,
  LoggerService as LoggerServiceNest,
} from '@nestjs/common';

@Injectable()
export class LoggerService implements LoggerServiceNest {
  constructor() {}
  logger = new Logger('CustomLogger');

  log(message: string, context?: string) {
    this.logger.log(`[LOG] [${context || 'App'}] ${message}`);
  }

  error(
    message: string,
    trace?: string,
    context?: string,
    extra?: Record<string, unknown>,
  ) {
    this.logger.error(
      `[ERROR] [${context || 'App'}] ${message} || extra: ${JSON.stringify(extra) || ''} `,
      trace,
    );
  }

  warn(message: string, context?: string) {
    this.logger.warn(`[WARN] [${context || 'App'}] ${message}`);
  }
}
