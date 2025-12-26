import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { LoggerService } from '@infra/logger/services/logger.service';
import { ConfigModule } from '@infra/environment/config.module';
import { ConfigProvider } from '@infra/environment/providers/config.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigProvider],
      useFactory: (configService: ConfigProvider) => ({
        type: 'mongodb',
        url: configService.get('MONGODB_URL'),
        database: configService.get('MONGO_DB_NAME'),
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('DB_LOGGING') === 'true',
        autoLoadEntities:
          configService.get('AUTO_LOAD_MONGO_ENTITIES') === 'true',
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class MongoDbModule implements OnModuleInit {
  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: LoggerService,
  ) {}

  onModuleInit() {
    if (this.dataSource.isInitialized) {
      this.logger.error(
        'MongoDB Data Source has been initialized!',
        'MongoDbModule',
        'onModuleInit',
      );
      this.logger.debug(
        `DataSource initialized: ${this.dataSource.isInitialized}`,
      );
      this.logger.debug(
        `Database name: ${JSON.stringify(this.dataSource.options.database)}`,
      );
      this.logger.debug(
        `Entities loaded: ${this.dataSource.entityMetadatas.length}`,
      );

      this.dataSource.entityMetadatas.forEach(entity => {
        this.logger.debug(`  - ${entity.name} -> ${entity.tableName}`);
      });
    }
  }
}
