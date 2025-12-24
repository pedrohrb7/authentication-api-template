"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNestApp = createNestApp;
const core_1 = require("@nestjs/core");
const helmet_1 = __importDefault(require("@fastify/helmet"));
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const app_module_1 = require("./app.module");
const environment_1 = require("./infra/environment");
async function registerHelmet(app) {
    const fastify = app.getHttpAdapter().getInstance();
    await fastify.register(helmet_1.default, {
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
function registerOpenAPI(app) {
    if (!environment_1.environment.ENABLE_OPENAPI)
        return;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription('API')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(environment_1.environment.API_BASE_PATH + '/swagger', app, document, {
        swaggerOptions: { docExpansion: 'none' },
    });
}
async function registerMiddlewares(app) {
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    await registerHelmet(app);
    app.enableCors();
}
async function createNestApp() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(), {
        abortOnError: environment_1.environment.NODE_ENV === 'production',
    });
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    registerOpenAPI(app);
    await registerMiddlewares(app);
    app.setGlobalPrefix(environment_1.environment.API_BASE_PATH);
    return app;
}
//# sourceMappingURL=bootstrap.js.map