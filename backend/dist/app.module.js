"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const product_entity_1 = require("./entities/product.entity");
const cart_item_entity_1 = require("./entities/cart-item.entity");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const user_entity_1 = require("./entities/user.entity");
const product_controller_1 = require("./controllers/product.controller");
const cart_controller_1 = require("./controllers/cart.controller");
const order_controller_1 = require("./controllers/order.controller");
const product_service_1 = require("./services/product.service");
const cart_service_1 = require("./services/cart.service");
const order_service_1 = require("./services/order.service");
const auth_module_1 = require("./modules/auth.module");
const user_module_1 = require("./modules/user/user.module");
const admin_module_1 = require("./modules/admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'ecommerce.db',
                entities: [product_entity_1.Product, cart_item_entity_1.CartItem, order_entity_1.Order, order_item_entity_1.OrderItem, user_entity_1.User],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, cart_item_entity_1.CartItem, order_entity_1.Order, order_item_entity_1.OrderItem]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController, product_controller_1.ProductController, cart_controller_1.CartController, order_controller_1.OrderController],
        providers: [app_service_1.AppService, product_service_1.ProductService, cart_service_1.CartService, order_service_1.OrderService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map