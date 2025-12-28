import { Injectable } from '@nestjs/common';
import 'dotenv/config';

let envInstance: EnvironmentModule | null = null;

const envTypes = ['production', 'development', 'test'] as const;

function isEnvType(type: string): type is (typeof envTypes)[number] {
  return (envTypes as ReadonlyArray<string>).includes(type);
}

@Injectable()
export class EnvironmentModule {
  private port: string;
  private node_env: (typeof envTypes)[number];
  private address: string;
  private passwordSalt: Buffer;
  private jwtPrivatePath: string;
  private jwtPublicPath: string;
  private cookieDomain: string;
  private emailName: string;
  private emailUserNameAddr: string;
  private emailPassword: string;
  private emailServerPort: number;
  private emailServerHost: string;
  private emailTemplateDir: string;
  private enableOpenAPI: boolean;
  private passwordRecoveryTimeoutSeconds: number;
  private emailResendTimeSeconds: number;

  private mongoDbUrl: string;
  private mongoDbName: string;
  private dbLogging: boolean;

  private missing: Array<string> = [];

  private getEnv(name: string): string {
    if (name in process.env) {
      return process.env[name];
    } else {
      this.missing.push(name);
      return '';
    }
  }

  constructor() {
    this.port = this.getEnv('PORT');
    this.address = this.getEnv('ADDRESS');
    this.jwtPrivatePath = this.getEnv('JWT_PRIVATE_PATH');
    this.jwtPublicPath = this.getEnv('JWT_PUBLIC_PATH');
    this.cookieDomain = this.getEnv('COOKIE_DOMAIN');
    this.passwordSalt = Buffer.from(this.getEnv('PASSWORD_SALT'));
    this.emailName = this.getEnv('EMAIL_NAME');
    this.emailPassword = this.getEnv('EMAIL_PASSWORD');
    this.emailUserNameAddr = this.getEnv('EMAIL_USER_NAME_ADDRESS');
    this.emailServerHost = this.getEnv('EMAIL_SERVER_HOST');
    this.emailServerPort = Number.parseFloat(this.getEnv('EMAIL_SERVER_PORT'));
    this.emailTemplateDir = this.getEnv('EMAIL_TEMPLATE_DIR');
    this.port = this.getEnv('PORT');
    this.address = this.getEnv('ADDRESS');
    this.jwtPrivatePath = this.getEnv('JWT_PRIVATE_PATH');
    this.jwtPublicPath = this.getEnv('JWT_PUBLIC_PATH');
    this.cookieDomain = this.getEnv('COOKIE_DOMAIN');

    this.mongoDbUrl = this.getEnv('MONGODB_URL');
    this.mongoDbName = this.getEnv('MONGO_DB_NAME');
    this.dbLogging = this.getEnv('DB_LOGGING') === 'true';

    this.passwordRecoveryTimeoutSeconds = Number.parseFloat(
      this.getEnv('PASSWORD_RECOVERY_TIMEOUT_SECONDS'),
    );
    this.emailResendTimeSeconds = Number.parseFloat(
      this.getEnv('EMAIL_RESEND_TIME_SECONDS'),
    );

    const envType = this.getEnv('NODE_ENV');
    if (isEnvType(envType)) {
      this.node_env = envType;
    } else {
      throw new Error(
        `NODE_ENV must be either 'production' or 'development' or 'test', got ${envType}`,
      );
    }

    if (this.missing.length !== 0) {
      throw new Error(`Env vars missing: ${this.missing.join(', ')}`);
    }

    this.enableOpenAPI = this.getEnv('ENABLE_OPENAPI') === 'true';
  }

  static getInstance(): EnvironmentModule {
    if (envInstance) {
      return envInstance;
    } else {
      return (envInstance = new EnvironmentModule());
    }
  }

  get EMAIL_RESEND_TIME_SECONDS() {
    return this.emailResendTimeSeconds;
  }
  get PASSWORD_RECOVERY_TIMEOUT_SECONDS() {
    return this.passwordRecoveryTimeoutSeconds;
  }
  get NODE_ENV() {
    return this.node_env;
  }
  get PORT() {
    return this.port;
  }
  get ADDRESS() {
    return this.address;
  }
  get PASSWORD_SALT() {
    return this.passwordSalt;
  }
  get JWT_PRIVATE_PATH() {
    return this.jwtPrivatePath;
  }
  get JWT_PUBLIC_PATH() {
    return this.jwtPublicPath;
  }
  get COOKIE_DOMAIN() {
    return this.cookieDomain;
  }
  get EMAIL_NAME() {
    return this.emailName;
  }
  get EMAIL_USER_NAME_ADDRESS() {
    return this.emailUserNameAddr;
  }
  get EMAIL_PASSWORD() {
    return this.emailPassword;
  }
  get EMAIL_SERVER_PORT() {
    return this.emailServerPort;
  }
  get EMAIL_SERVER_HOST() {
    return this.emailServerHost;
  }
  get EMAIL_TEMPLATE_DIR() {
    return this.emailTemplateDir;
  }
  get ENABLE_OPENAPI() {
    return this.enableOpenAPI;
  }
  get MONGODB_URL() {
    return this.mongoDbUrl;
  }
  get MONGO_DB_NAME() {
    return this.mongoDbName;
  }
  get DB_LOGGING() {
    return this.dbLogging;
  }
}
