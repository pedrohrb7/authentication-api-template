import { FastifyInstance } from 'fastify';
import { NestFactory } from '@nestjs/core';
import fastifyHelmet from '@fastify/helmet';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { ConfigProvider } from '@infra/environment/providers/config.provider';

const environment = new ConfigProvider('.env');

async function registerHelmet(app: INestApplication): Promise<void> {
  const fastify = app.getHttpAdapter().getInstance() as FastifyInstance;

  await fastify.register(fastifyHelmet, {
    dnsPrefetchControl: true,
    frameguard: true,
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    xssFilter: true,
    originAgentCluster: true,
    referrerPolicy: true,
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
    permittedCrossDomainPolicies: false,
    crossOriginEmbedderPolicy: false,
    enableCSPNonces: false,
  });
}

function registerOpenAPI(app: INestApplication): void {
  if (!environment.get('ENABLE_OPENAPI')) return;

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/swagger', app, document, {
    swaggerOptions: { docExpansion: 'none' },
  });
}

async function registerMiddlewares(app: INestApplication): Promise<void> {
  // Validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Security related middlewares
  await registerHelmet(app);

  // Enable cross origin requests
  app.enableCors();
}

export async function createNestApp(): Promise<INestApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      abortOnError: false,
    },
  );

  // Enable class-validator to use NestJS dependency injection
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  registerOpenAPI(app);
  await registerMiddlewares(app);

  app.setGlobalPrefix('api');

  return app;
}
