"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Mini E-Commerce API')
        .setDescription('API for a simple e-commerce system with products, cart, and orders')
        .setVersion('1.0')
        .addTag('products', 'Product management endpoints')
        .addTag('cart', 'Shopping cart endpoints')
        .addTag('orders', 'Order management endpoints')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: http://localhost:3000`);
    console.log(`Swagger documentation available at: http://localhost:3000/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map