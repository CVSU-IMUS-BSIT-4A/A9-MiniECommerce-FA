import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CartService } from '../services/cart.service';
import { AddToCartDto, UpdateCartItemDto } from '../dto/cart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart successfully' })
  @ApiResponse({ status: 400, description: 'Insufficient stock' })
  addToCart(@Body(ValidationPipe) addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get cart items' })
  @ApiResponse({ status: 200, description: 'Returns cart items' })
  @ApiQuery({ name: 'sessionId', required: false, description: 'Session ID' })
  getCart(@Query('sessionId') sessionId?: string) {
    return this.cartService.getCart(sessionId);
  }

  @Get('total')
  @ApiOperation({ summary: 'Get cart total' })
  @ApiResponse({ status: 200, description: 'Returns cart total amount' })
  @ApiQuery({ name: 'sessionId', required: false, description: 'Session ID' })
  async getTotal(@Query('sessionId') sessionId?: string) {
    const total = await this.cartService.getCartTotal(sessionId);
    return { total };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  updateCartItem(@Param('id') id: string, @Body(ValidationPipe) updateCartItemDto: UpdateCartItemDto) {
    return this.cartService.updateCartItem(+id, updateCartItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({ status: 200, description: 'Item removed successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  removeFromCart(@Param('id') id: string) {
    return this.cartService.removeFromCart(+id);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully' })
  @ApiQuery({ name: 'sessionId', required: false, description: 'Session ID' })
  clearCart(@Query('sessionId') sessionId?: string) {
    return this.cartService.clearCart(sessionId);
  }
}
