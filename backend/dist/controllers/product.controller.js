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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_service_1 = require("../services/product.service");
const product_dto_1 = require("../dto/product.dto");
let ProductController = class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    create(createProductDto) {
        return this.productService.create(createProductDto);
    }
    findAll() {
        return this.productService.findAll();
    }
    findOne(id) {
        return this.productService.findOne(+id);
    }
    update(id, updateProductDto) {
        return this.productService.update(+id, updateProductDto);
    }
    remove(id) {
        return this.productService.remove(+id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new product',
        description: 'Creates a new product in the inventory. Admin only. Product image can be uploaded as Base64 encoded string.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Product created successfully',
        schema: {
            example: {
                id: 1,
                name: 'Laptop Pro 15"',
                description: 'High-performance laptop',
                price: 1299.99,
                stock: 50,
                imageUrl: 'data:image/jpeg;base64,...',
                createdAt: '2026-01-16T00:00:00.000Z',
                updatedAt: '2026-01-16T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all products',
        description: 'Retrieves a list of all available products in the inventory. No authentication required.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns array of all products',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' },
                    stock: { type: 'number' },
                    imageUrl: { type: 'string' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' }
                }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a product by ID',
        description: 'Retrieves detailed information about a specific product using its ID.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the product details',
        schema: {
            example: {
                id: 1,
                name: 'Laptop Pro 15"',
                description: 'High-performance laptop',
                price: 1299.99,
                stock: 50,
                imageUrl: 'data:image/jpeg;base64,...',
                createdAt: '2026-01-16T00:00:00.000Z',
                updatedAt: '2026-01-16T00:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found with the given ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a product',
        description: 'Updates product information. Admin only. All fields are optional - only provide fields that need to be updated.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Product updated successfully',
        schema: {
            example: {
                id: 1,
                name: 'Laptop Pro 15" Updated',
                description: 'High-performance laptop with updates',
                price: 1199.99,
                stock: 45,
                imageUrl: 'data:image/jpeg;base64,...',
                createdAt: '2026-01-16T00:00:00.000Z',
                updatedAt: '2026-01-16T01:00:00.000Z'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid update data' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a product',
        description: 'Permanently removes a product from the inventory. Admin only. Cannot be undone.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Product deleted successfully',
        schema: {
            example: {
                message: 'Product deleted successfully'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "remove", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map