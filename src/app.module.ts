import { Logger, Module } from '@nestjs/common';

import { LoggerModule } from '@infra/logger/logger.module';
import { MongoDbModule } from '@infra/database/mongodb/mongo-db.module';
import { UserModule } from '@modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@infra/exceptions/global-filter.exception';

@Module({
  imports: [LoggerModule, MongoDbModule, UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    Logger,
  ],
  exports: [Logger],
  controllers: [],
})
export class AppModule {}
