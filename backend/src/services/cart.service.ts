import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { ProductService } from './product.service';
import { AddToCartDto, UpdateCartItemDto } from '../dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private productService: ProductService,
  ) {}

  async addToCart(addToCartDto: AddToCartDto): Promise<CartItem> {
    const { productId, quantity, sessionId = 'default-session' } = addToCartDto;

    // Validate stock
    await this.productService.validateStock(productId, quantity);

    const product = await this.productService.findOne(productId);

    // Check if item already exists in cart
    const existingItem = await this.cartItemRepository.findOne({
      where: { productId, sessionId },
    });

    if (existingItem) {
      // Validate total quantity
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

  async getCart(sessionId: string = 'default-session'): Promise<CartItem[]> {
    return this.cartItemRepository.find({ where: { sessionId } });
  }

  async updateCartItem(id: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${id} not found`);
    }

    if (updateCartItemDto.quantity === 0) {
      await this.cartItemRepository.remove(cartItem);
      return cartItem;
    }

    // Validate stock for new quantity
    await this.productService.validateStock(cartItem.productId, updateCartItemDto.quantity);

    cartItem.quantity = updateCartItemDto.quantity;
    return this.cartItemRepository.save(cartItem);
  }

  async removeFromCart(id: number): Promise<void> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${id} not found`);
    }
    await this.cartItemRepository.remove(cartItem);
  }

  async clearCart(sessionId: string = 'default-session'): Promise<void> {
    await this.cartItemRepository.delete({ sessionId });
  }

  async getCartTotal(sessionId: string = 'default-session'): Promise<number> {
    const cartItems = await this.getCart(sessionId);
    return cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  }
}
