import { Repository } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { ProductService } from './product.service';
import { AddToCartDto, UpdateCartItemDto } from '../dto/cart.dto';
export declare class CartService {
    private cartItemRepository;
    private productService;
    constructor(cartItemRepository: Repository<CartItem>, productService: ProductService);
    addToCart(addToCartDto: AddToCartDto): Promise<CartItem>;
    getCart(sessionId?: string): Promise<CartItem[]>;
    updateCartItem(id: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem>;
    removeFromCart(id: number): Promise<void>;
    clearCart(sessionId?: string): Promise<void>;
    getCartTotal(sessionId?: string): Promise<number>;
}
