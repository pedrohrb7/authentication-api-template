import { createNestApp } from './bootstrap';

import { LoggerService } from '@infra/logger/logger.service';

const logger = new LoggerService();

async function bootstrap() {
  const app = await createNestApp();
  await app.listen(7001, '0.0.0.0');

  logger.log(`Listening on ${await app.getUrl()}`, 'API start up');
}

bootstrap().catch(error =>
  logger.error('Application failed to start :: ', `${error}`, 'API crash'),
);
