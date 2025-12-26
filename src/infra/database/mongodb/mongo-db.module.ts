import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { LoggerService } from '@infra/logger/logger.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_URL'),
        database: configService.get<string>('MONGO_DB_NAME'),
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging: configService.get<boolean>('DB_LOGGING', true),
        autoLoadEntities: true,
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
