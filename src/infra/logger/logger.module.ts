import { Module, Global } from '@nestjs/common';

import { LoggerService } from './services/logger.service';
import { ConfigModule } from '@infra/environment/config.module';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
