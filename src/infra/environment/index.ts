import * as envalid from 'envalid';

export interface DotEnv {
  /**
   * The type of environment (production, test, development)
   */
  NODE_ENV: 'production' | 'test' | 'development';

  //#region Local

  /**
   * The port number that the local server will run
   */
  PORT: number;

  //#endregion

  //#region Auth

  JWT_PUBLIC_KEY: string;

  /**
   * The secret key to use in order to generate tokens
   */
  JWT_SECRET: string;

  /**
   * The time string that the token should expire
   */
  JWT_EXPIRES_IN: string;

  /**
   * The time string that the refresh token should expire
   */
  JWT_REFRESH_EXPIRES_IN: string;

  //#endregion

  //#region Database

  /**
   * The host, ip or domain, for the Oracle Cluster
   */
  DB_HOST: string;

  /**
   * The port number for the Oracle Cluster
   */
  DB_PORT: number;

  /**
   * The user for the Oracle Cluster
   */
  DB_USER: string;

  /**
   * The user's password
   */
  DB_PASS: string;

  /**
   * The name of the DB within the cluster
   */
  DB_NAME: string;

  /**
   * Key to enable typeorm logging
   * */
  ENABLE_TYPEORM_LOGS: boolean;

  //#endregion

  //#region Requests

  /**
   * The base API path.
   */
  API_BASE_PATH: string;

  /**
   * The throttler time to live
   */
  RATE_LIMIT_TTL: number;

  /**
   * The maximum number of requests per time to live
   */
  RATE_LIMIT_REQUESTS: number;

  //#endregion

  //#region Flags

  /**
   * Whether the OpenAPI docs will be generated
   */
  ENABLE_OPENAPI: boolean;

  //#endregion

  //#region Requests

  /**
   * Maximum file size for uploads in MB
   */
  MAX_FILE_SIZE: number;

  /**
   * Allowed MIME types for file uploads, comma-separated
   */
  ALLOWED_MIME_TYPES: string;

  //#endregion
}

// Confere que o validador de todos os campos retorna o valor definido em EnvSpec
type EnvValidator<EnvSpec> = {
  [K in keyof EnvSpec]: envalid.ValidatorSpec<EnvSpec[K]>;
};

enum EnvEnum {
  PRODUCTION = 'production',
  TEST = 'test',
  DEVELOPMENT = 'development',
}

const spec: EnvValidator<DotEnv> = {
  NODE_ENV: envalid.str({
    default: EnvEnum.DEVELOPMENT,
    choices: Object.values(EnvEnum),
  }),
  PORT: envalid.port({ default: 7001 }),
  JWT_PUBLIC_KEY: envalid.str({ default: '' }),
  JWT_SECRET: envalid.str({ default: 'always_change_me' }),
  JWT_EXPIRES_IN: envalid.str({ default: '1h' }),
  JWT_REFRESH_EXPIRES_IN: envalid.str({ default: '14d' }),
  DB_HOST: envalid.str({ default: 'localhost' }),
  DB_PORT: envalid.num({ default: 1521 }),
  DB_USER: envalid.str({ default: 'admin_change_me' }),
  DB_PASS: envalid.str({ default: 'admin_change_me' }),
  DB_NAME: envalid.str({ default: 'change_me_db' }),
  API_BASE_PATH: envalid.str({ default: '' }),
  RATE_LIMIT_TTL: envalid.num({ default: 60000 }),
  RATE_LIMIT_REQUESTS: envalid.num({ default: 120 }),
  ENABLE_OPENAPI: envalid.bool({ default: true, devDefault: true }),
  ENABLE_TYPEORM_LOGS: envalid.bool({ default: false, devDefault: true }),
  MAX_FILE_SIZE: envalid.num({ default: 10 }),
  ALLOWED_MIME_TYPES: envalid.str({
    default: 'image/jpeg,image/png,application/pdf',
  }),
};

export const environment: DotEnv = envalid.cleanEnv(process.env, spec);
