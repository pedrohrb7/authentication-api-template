import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { AuthModule } from '@modules/authentication/auth.module';
import { LoggerModule } from '@infra/logger/logger.module';
import { MongoDbModule } from '@infra/database/mongodb/mongo-db.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    LoggerModule,
    MongoDbModule,
    // AuthModule,

    UserModule,
  ],
  providers: [Logger],
  exports: [Logger],
  controllers: [],
})
export class AppModule {}
