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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_service_1 = require("../services/cart.service");
const cart_dto_1 = require("../dto/cart.dto");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    addToCart(addToCartDto) {
        return this.cartService.addToCart(addToCartDto);
    }
    getCart(sessionId) {
        return this.cartService.getCart(sessionId);
    }
    async getTotal(sessionId) {
        const total = await this.cartService.getCartTotal(sessionId);
        return { total };
    }
    updateCartItem(id, updateCartItemDto) {
        return this.cartService.updateCartItem(+id, updateCartItemDto);
    }
    removeFromCart(id) {
        return this.cartService.removeFromCart(+id);
    }
    clearCart(sessionId) {
        return this.cartService.clearCart(sessionId);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Add item to shopping cart',
        description: 'Adds a product to the shopping cart with specified quantity. Validates stock availability before adding. Uses sessionId to track anonymous carts.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Item added to cart successfully',
        schema: {
            example: {
                id: 1,
                productId: 5,
                productName: 'Laptop Pro 15"',
                price: 1299.99,
                quantity: 2,
                sessionId: 'abc123xyz',
                createdAt: '2026-01-16T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Insufficient stock or invalid product' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all cart items',
        description: 'Retrieves all items in the shopping cart for a specific session. If no sessionId provided, returns empty cart.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns array of cart items',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    productId: { type: 'number' },
                    productName: { type: 'string' },
                    price: { type: 'number' },
                    quantity: { type: 'number' },
                    sessionId: { type: 'string' },
                    createdAt: { type: 'string' }
                }
            }
        }
    }),
    (0, swagger_1.ApiQuery)({ name: 'sessionId', required: false, description: 'Unique session identifier for the cart' }),
    __param(0, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Get)('total'),
    (0, swagger_1.ApiOperation)({
        summary: 'Calculate cart total amount',
        description: 'Calculates and returns the total price of all items in the cart (price × quantity for each item).'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns cart total amount',
        schema: {
            example: {
                total: 2599.98
            }
        }
    }),
    (0, swagger_1.ApiQuery)({ name: 'sessionId', required: false, description: 'Session ID to calculate total for' }),
    __param(0, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getTotal", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update cart item quantity',
        description: 'Updates the quantity of a specific cart item. Validates stock availability for the new quantity.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cart item updated successfully',
        schema: {
            example: {
                id: 1,
                productId: 5,
                productName: 'Laptop Pro 15"',
                price: 1299.99,
                quantity: 3,
                sessionId: 'abc123xyz',
                createdAt: '2026-01-16T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cart item not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Insufficient stock for requested quantity' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cart_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "updateCartItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove item from cart',
        description: 'Removes a specific item from the shopping cart by its cart item ID.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Item removed successfully',
        schema: {
            example: {
                message: 'Cart item removed successfully'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cart item not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Clear entire cart',
        description: 'Removes all items from the shopping cart for a specific session. Useful after checkout or when user wants to start fresh.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cart cleared successfully',
        schema: {
            example: {
                message: 'Cart cleared successfully'
            }
        }
    }),
    (0, swagger_1.ApiQuery)({ name: 'sessionId', required: false, description: 'Session ID of the cart to clear' }),
    __param(0, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "clearCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Shopping Cart'),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map