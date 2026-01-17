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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("../services/order.service");
const order_dto_1 = require("../dto/order.dto");
let OrderController = class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    create(createOrderDto) {
        return this.orderService.create(createOrderDto);
    }
    findAll() {
        return this.orderService.findAll();
    }
    findOne(id) {
        return this.orderService.findOne(+id);
    }
    updateStatus(id, status) {
        return this.orderService.updateStatus(+id, status);
    }
    receiveOrder(id) {
        return this.orderService.updateStatus(+id, 'completed');
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new order (Checkout)',
        description: 'Creates a new order from cart items. Validates stock availability, calculates total, reduces product stock, and sets initial status to "pending". This is the checkout endpoint.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Order created successfully',
        schema: {
            example: {
                id: 1,
                customerName: 'John Doe',
                customerEmail: 'john@example.com',
                customerAddress: '123 Main St, City, Country',
                totalAmount: 2599.98,
                status: 'pending',
                items: [
                    {
                        id: 1,
                        productId: 5,
                        productName: 'Laptop Pro 15"',
                        price: 1299.99,
                        quantity: 2
                    }
                ],
                createdAt: '2026-01-16T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - insufficient stock, invalid items, or missing required fields' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all orders',
        description: 'Retrieves a complete list of all orders in the system with their items. Used by admin dashboard to view all customer orders.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns array of all orders with their items',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    customerName: { type: 'string' },
                    customerEmail: { type: 'string' },
                    customerAddress: { type: 'string' },
                    totalAmount: { type: 'number' },
                    status: { type: 'string', enum: ['pending', 'processing', 'receiving', 'completed', 'cancelled'] },
                    items: { type: 'array' },
                    createdAt: { type: 'string' }
                }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get order details by ID',
        description: 'Retrieves detailed information about a specific order including all order items, customer details, and current status.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the complete order details',
        schema: {
            example: {
                id: 1,
                customerName: 'John Doe',
                customerEmail: 'john@example.com',
                customerAddress: '123 Main St, City, Country',
                totalAmount: 2599.98,
                status: 'processing',
                items: [
                    {
                        id: 1,
                        productId: 5,
                        productName: 'Laptop Pro 15"',
                        price: 1299.99,
                        quantity: 2
                    }
                ],
                createdAt: '2026-01-16T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found with the given ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update order status (Admin)',
        description: 'Updates the status of an order. Admin only. Status workflow: pending → processing → receiving → completed. Orders can also be set to cancelled.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Order status updated successfully',
        schema: {
            example: {
                id: 1,
                customerName: 'John Doe',
                customerEmail: 'john@example.com',
                totalAmount: 2599.98,
                status: 'processing',
                createdAt: '2026-01-16T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    (0, swagger_1.ApiBody)({
        description: 'New order status',
        schema: {
            properties: {
                status: {
                    type: 'string',
                    enum: ['pending', 'processing', 'receiving', 'completed', 'cancelled'],
                    example: 'processing',
                    description: 'New status for the order'
                }
            },
            required: ['status']
        }
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/receive'),
    (0, swagger_1.ApiOperation)({
        summary: 'Mark order as received (User)',
        description: 'Allows the customer to confirm they have received their order. This updates the order status from "receiving" to "completed". User action only.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Order marked as received and status changed to completed',
        schema: {
            example: {
                id: 1,
                customerName: 'John Doe',
                customerEmail: 'john@example.com',
                totalAmount: 2599.98,
                status: 'completed',
                createdAt: '2026-01-16T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "receiveOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map