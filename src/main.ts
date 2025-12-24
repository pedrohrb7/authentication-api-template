import { Logger } from '@nestjs/common';
import { createNestApp } from './bootstrap';

import environment from './infra/environment';

async function bootstrap() {
  const app = await createNestApp();
  await app.listen(environment.PORT, '0.0.0.0');

  const logger = new Logger('API startup');
  logger.log(`Listening on ${await app.getUrl()}`);
}

bootstrap().catch(error => console.error(error));
