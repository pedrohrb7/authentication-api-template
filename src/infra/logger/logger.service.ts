import {
  ConsoleLogger,
  Injectable,
  LoggerService as LoggerServiceNest,
} from '@nestjs/common';

@Injectable()
export class LoggerService implements LoggerServiceNest {
  constructor() {}
  logger = new ConsoleLogger('CustomLogger', {
    timestamp: true,
    logLevels:
      // environment.NODE_ENV === 'development'
      ['fatal', 'log', 'error', 'warn', 'debug'],
    // : ['error', 'warn', 'fatal'],
  });

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

  debug(message: string, context?: string) {
    this.logger.debug(`[DEBUG] [${context || 'App'}] ${message}`);
  }
}
