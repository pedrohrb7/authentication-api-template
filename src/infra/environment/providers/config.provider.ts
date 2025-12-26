import { ConfigService } from '../services/config.service';

export class ConfigProvider {
  private readonly envConfig: Record<string, string>;
  public readonly service: ConfigService;

  constructor(filePath: string) {
    this.service = new ConfigService();
    this.envConfig = this.load(filePath);
  }

  load(filePath: string) {
    return this.service.loadParseDotenv(filePath);
  }

  get(propertyName: string, defaultValue: string = undefined) {
    return this.service.get(this.envConfig, propertyName, defaultValue);
  }

  apiBaseURL(): string {
    return this.get('API_BASE_URL');
  }
}
