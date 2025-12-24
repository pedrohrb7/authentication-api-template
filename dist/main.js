"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const bootstrap_1 = require("./bootstrap");
const environment_1 = __importDefault(require("./infra/environment"));
async function bootstrap() {
    const app = await (0, bootstrap_1.createNestApp)();
    await app.listen(environment_1.default.PORT, '0.0.0.0');
    const logger = new common_1.Logger('API startup');
    logger.log(`Listening on ${await app.getUrl()}`);
}
bootstrap().catch(error => console.error(error));
//# sourceMappingURL=main.js.map