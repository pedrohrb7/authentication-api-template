"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const envalid = __importStar(require("envalid"));
const isLocal = true;
if (isLocal)
    require('dotenv').config();
const spec = {
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
exports.environment = envalid.cleanEnv(process.env, spec);
exports.default = exports.environment;
//# sourceMappingURL=index.js.map