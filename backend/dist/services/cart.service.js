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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_item_entity_1 = require("../entities/cart-item.entity");
const product_service_1 = require("./product.service");
let CartService = class CartService {
    cartItemRepository;
    productService;
    constructor(cartItemRepository, productService) {
        this.cartItemRepository = cartItemRepository;
        this.productService = productService;
    }
    async addToCart(addToCartDto) {
        const { productId, quantity, sessionId = 'default-session' } = addToCartDto;
        await this.productService.validateStock(productId, quantity);
        const product = await this.productService.findOne(productId);
        const existingItem = await this.cartItemRepository.findOne({
            where: { productId, sessionId },
        });
        if (existingItem) {
            await this.productService.validateStock(productId, existingItem.quantity + quantity);
            existingItem.quantity += quantity;
            return this.cartItemRepository.save(existingItem);
        }
        const cartItem = this.cartItemRepository.create({
            productId,
            productName: product.name,
            price: product.price,
            quantity,
            sessionId,
        });
        return this.cartItemRepository.save(cartItem);
    }
    async getCart(sessionId = 'default-session') {
        return this.cartItemRepository.find({ where: { sessionId } });
    }
    async updateCartItem(id, updateCartItemDto) {
        const cartItem = await this.cartItemRepository.findOne({ where: { id } });
        if (!cartItem) {
            throw new common_1.NotFoundException(`Cart item with ID ${id} not found`);
        }
        if (updateCartItemDto.quantity === 0) {
            await this.cartItemRepository.remove(cartItem);
            return cartItem;
        }
        await this.productService.validateStock(cartItem.productId, updateCartItemDto.quantity);
        cartItem.quantity = updateCartItemDto.quantity;
        return this.cartItemRepository.save(cartItem);
    }
    async removeFromCart(id) {
        const cartItem = await this.cartItemRepository.findOne({ where: { id } });
        if (!cartItem) {
            throw new common_1.NotFoundException(`Cart item with ID ${id} not found`);
        }
        await this.cartItemRepository.remove(cartItem);
    }
    async clearCart(sessionId = 'default-session') {
        await this.cartItemRepository.delete({ sessionId });
    }
    async getCartTotal(sessionId = 'default-session') {
        const cartItems = await this.getCart(sessionId);
        return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_service_1.ProductService])
], CartService);
//# sourceMappingURL=cart.service.js.map