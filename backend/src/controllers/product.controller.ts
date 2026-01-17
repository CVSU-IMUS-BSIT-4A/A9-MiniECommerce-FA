import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new product',
    description: 'Creates a new product in the inventory. Admin only. Product image can be uploaded as Base64 encoded string.'
  })
  @ApiResponse({ 
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
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all products',
    description: 'Retrieves a list of all available products in the inventory. No authentication required.'
  })
  @ApiResponse({ 
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
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a product by ID',
    description: 'Retrieves detailed information about a specific product using its ID.'
  })
  @ApiResponse({ 
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
  })
  @ApiResponse({ status: 404, description: 'Product not found with the given ID' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a product',
    description: 'Updates product information. Admin only. All fields are optional - only provide fields that need to be updated.'
  })
  @ApiResponse({ 
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
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Invalid update data' })
  update(@Param('id') id: string, @Body(ValidationPipe) updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete a product',
    description: 'Permanently removes a product from the inventory. Admin only. Cannot be undone.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Product deleted successfully',
    schema: {
      example: {
        message: 'Product deleted successfully'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
