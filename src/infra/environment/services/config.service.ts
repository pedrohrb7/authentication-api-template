import { Injectable } from '@nestjs/common';

import { GetProperty } from '../actions/get-property.action';
import { LoadParseDotenv } from '../actions/load-dotenv.action';

@Injectable()
export class ConfigService {
  get(
    config: Record<string, string>,
    property: string,
    defaultValue: string = undefined,
  ): string {
    const value = new GetProperty(config).do(property);
    return defaultValue ? value || defaultValue : value;
  }

  loadParseDotenv(filePath: string) {
    return new LoadParseDotenv().do(filePath);
  }
}
