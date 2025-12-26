import { Logger, Module } from '@nestjs/common';

import { LoggerModule } from '@infra/logger/logger.module';
import { MongoDbModule } from '@infra/database/mongodb/mongo-db.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [LoggerModule, MongoDbModule, UserModule],
  providers: [Logger],
  exports: [Logger],
  controllers: [],
})
export class AppModule {}
