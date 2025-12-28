import { APP_FILTER } from '@nestjs/core';
import { Logger, Module } from '@nestjs/common';

import { LoggerModule } from '@infra/logger/logger.module';
import { MongoDbModule } from '@infra/database/mongodb/mongo-db.module';
import { GlobalExceptionFilter } from '@infra/exceptions/global-filter.exception';

import * as Modules from '@modules/index';

@Module({
  imports: [LoggerModule, MongoDbModule, ...Object.values(Modules)],
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
