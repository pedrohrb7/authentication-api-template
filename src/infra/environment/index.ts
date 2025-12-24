/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as envalid from 'envalid';

const isLocal = true;

// If it's running locally, we'll load .env files
if (isLocal) require('dotenv').config();

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
  DB_HOST_ORA: string;

  /**
   * The port number for the Oracle Cluster
   */
  DB_PORT_ORA: number;

  /**
   * The user for the Oracle Cluster
   */
  DB_USER_ORA: string;

  /**
   * The user's password
   */
  DB_PASS_ORA: string;

  /**
   * The name of the DB within the cluster
   */
  DB_NAME_ORA: string;

  /**
   * The path for Oracle's Instant Client
   */
  ORACLE_INSTANT_CLIENT_PATH: string;

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

const spec: EnvValidator<DotEnv> = {
  NODE_ENV: envalid.str({ choices: ['production', 'test', 'development'] }),
  PORT: envalid.port({ default: 4001 }),
  JWT_PUBLIC_KEY: envalid.str({ default: '' }),
  JWT_SECRET: envalid.str(),
  JWT_EXPIRES_IN: envalid.str({ default: '1h' }),
  JWT_REFRESH_EXPIRES_IN: envalid.str({ default: '14d' }),
  DB_HOST_ORA: envalid.str(),
  DB_PORT_ORA: envalid.num(),
  DB_USER_ORA: envalid.str(),
  DB_PASS_ORA: envalid.str(),
  DB_NAME_ORA: envalid.str(),
  ORACLE_INSTANT_CLIENT_PATH: envalid.str(),
  API_BASE_PATH: envalid.str({ default: '' }),
  RATE_LIMIT_TTL: envalid.num({ default: 60000 }),
  RATE_LIMIT_REQUESTS: envalid.num({ default: 120 }),
  ENABLE_OPENAPI: envalid.bool({ default: false, devDefault: true }),
  ENABLE_TYPEORM_LOGS: envalid.bool({ default: false, devDefault: true }),
  MAX_FILE_SIZE: envalid.num({ default: 10 }),
  ALLOWED_MIME_TYPES: envalid.str({
    default: 'image/jpeg,image/png,application/pdf',
  }),
};

export const environment: DotEnv = envalid.cleanEnv(process.env, spec);
export default environment;
