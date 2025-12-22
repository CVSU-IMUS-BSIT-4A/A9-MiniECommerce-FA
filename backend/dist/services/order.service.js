"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../entities/order.entity");
const order_item_entity_1 = require("../entities/order-item.entity");
const product_service_1 = require("./product.service");
let OrderService = class OrderService {
    orderRepository;
    orderItemRepository;
    productService;
    constructor(orderRepository, orderItemRepository, productService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productService = productService;
    }
    async create(createOrderDto) {
        const { customerName, customerEmail, customerAddress, items } = createOrderDto;
        if (!items || items.length === 0) {
            throw new common_1.BadRequestException('Order must contain at least one item');
        }
        let totalAmount = 0;
        const orderItems = [];
        for (const item of items) {
            await this.productService.validateStock(item.productId, item.quantity);
            const product = await this.productService.findOne(item.productId);
            const orderItem = this.orderItemRepository.create({
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: item.quantity,
            });
            orderItems.push(orderItem);
            totalAmount += Number(product.price) * item.quantity;
        }
        const order = this.orderRepository.create({
            customerName,
            customerEmail,
            customerAddress,
            totalAmount,
            status: 'pending',
            items: orderItems,
        });
        const savedOrder = await this.orderRepository.save(order);
        for (const item of items) {
            await this.productService.reduceStock(item.productId, item.quantity);
        }
        return savedOrder;
    }
    async findAll() {
        return this.orderRepository.find({ relations: ['items'] });
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['items'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async updateStatus(id, status) {
        const order = await this.findOne(id);
        order.status = status;
        return this.orderRepository.save(order);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        product_service_1.ProductService])
], OrderService);
//# sourceMappingURL=order.service.js.map