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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../../entities/product.entity");
const order_entity_1 = require("../../entities/order.entity");
const user_entity_1 = require("../../entities/user.entity");
let AdminService = class AdminService {
    productRepository;
    orderRepository;
    userRepository;
    constructor(productRepository, orderRepository, userRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }
    async getDashboardStats() {
        const totalProducts = await this.productRepository.count();
        const totalOrders = await this.orderRepository.count();
        const totalUsers = await this.userRepository.count();
        const orders = await this.orderRepository.find();
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const lowStockProducts = await this.productRepository
            .createQueryBuilder('product')
            .where('product.stock < :threshold', { threshold: 10 })
            .getMany();
        return {
            totalProducts,
            totalOrders,
            totalUsers,
            totalRevenue,
            lowStockCount: lowStockProducts.length,
            lowStockProducts,
        };
    }
    async getAllUsers() {
        const users = await this.userRepository.find({
            select: ['id', 'email', 'name', 'role', 'createdAt'],
        });
        return users;
    }
    async getAllOrders() {
        return this.orderRepository.find({
            relations: ['items'],
            order: { createdAt: 'DESC' },
        });
    }
    async updateOrderStatus(orderId, status) {
        await this.orderRepository.update(orderId, { status });
        return this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['items'],
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map