export interface DotEnv {
    NODE_ENV: 'production' | 'test' | 'development';
    PORT: number;
    JWT_PUBLIC_KEY: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_EXPIRES_IN: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    ENABLE_TYPEORM_LOGS: boolean;
    API_BASE_PATH: string;
    RATE_LIMIT_TTL: number;
    RATE_LIMIT_REQUESTS: number;
    ENABLE_OPENAPI: boolean;
    MAX_FILE_SIZE: number;
    ALLOWED_MIME_TYPES: string;
}
export declare const environment: DotEnv;
