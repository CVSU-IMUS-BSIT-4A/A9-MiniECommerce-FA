import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CartService } from '../services/cart.service';
import { AddToCartDto, UpdateCartItemDto } from '../dto/cart.dto';

@ApiTags('Shopping Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Add item to shopping cart',
    description: 'Adds a product to the shopping cart with specified quantity. Validates stock availability before adding. Uses sessionId to track anonymous carts.'
  })
  @ApiResponse({ 
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
  })
  @ApiResponse({ status: 400, description: 'Insufficient stock or invalid product' })
  addToCart(@Body(ValidationPipe) addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all cart items',
    description: 'Retrieves all items in the shopping cart for a specific session. If no sessionId provided, returns empty cart.'
  })
  @ApiResponse({ 
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
  })
  @ApiQuery({ name: 'sessionId', required: false, description: 'Unique session identifier for the cart' })
  getCart(@Query('sessionId') sessionId?: string) {
    return this.cartService.getCart(sessionId);
  }

  @Get('total')
  @ApiOperation({ 
    summary: 'Calculate cart total amount',
    description: 'Calculates and returns the total price of all items in the cart (price × quantity for each item).'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns cart total amount',
    schema: {
      example: {
        total: 2599.98
      }
    }
  })
  @ApiQuery({ name: 'sessionId', required: false, description: 'Session ID to calculate total for' })
  async getTotal(@Query('sessionId') sessionId?: string) {
    const total = await this.cartService.getCartTotal(sessionId);
    return { total };
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update cart item quantity',
    description: 'Updates the quantity of a specific cart item. Validates stock availability for the new quantity.'
  })
  @ApiResponse({ 
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
  })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @ApiResponse({ status: 400, description: 'Insufficient stock for requested quantity' })
  updateCartItem(@Param('id') id: string, @Body(ValidationPipe) updateCartItemDto: UpdateCartItemDto) {
    return this.cartService.updateCartItem(+id, updateCartItemDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Remove item from cart',
    description: 'Removes a specific item from the shopping cart by its cart item ID.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Item removed successfully',
    schema: {
      example: {
        message: 'Cart item removed successfully'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  removeFromCart(@Param('id') id: string) {
    return this.cartService.removeFromCart(+id);
  }

  @Delete()
  @ApiOperation({ 
    summary: 'Clear entire cart',
    description: 'Removes all items from the shopping cart for a specific session. Useful after checkout or when user wants to start fresh.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Cart cleared successfully',
    schema: {
      example: {
        message: 'Cart cleared successfully'
      }
    }
  })
  @ApiQuery({ name: 'sessionId', required: false, description: 'Session ID of the cart to clear' })
  clearCart(@Query('sessionId') sessionId?: string) {
    return this.cartService.clearCart(sessionId);
  }
}
