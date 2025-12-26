import { Global, Module } from '@nestjs/common';
import { ConfigProvider } from './providers/config.provider';

@Global()
@Module({
  providers: [
    {
      provide: ConfigProvider,
      useValue: new ConfigProvider('.env'),
    },
  ],
  exports: [ConfigProvider],
})
export class ConfigModule {}
