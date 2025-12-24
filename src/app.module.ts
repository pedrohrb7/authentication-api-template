import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '@modules/authentication/auth.module';
import { LoggerModule } from '@infra/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    LoggerModule,
    AuthModule,
  ],
  providers: [Logger],
  exports: [Logger],
  controllers: [],
})
export class AppModule {}
