import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { LoggerService } from '@infra/logger/services/logger.service';
import {  EnvironmentModule } from '@infra/environment/config.module';

const env = EnvironmentModule.getInstance();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'mongodb',
        url: env.MONGODB_URL,
        database: env.MONGO_DB_NAME,
        synchronize: env.NODE_ENV !== 'production',
        logging: env.DB_LOGGING,
        autoLoadEntities:
          process.env.AUTO_LOAD_MONGO_ENTITIES === 'true',
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
