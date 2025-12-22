import { CartService } from '../services/cart.service';
import { AddToCartDto, UpdateCartItemDto } from '../dto/cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(addToCartDto: AddToCartDto): Promise<import("../entities/cart-item.entity").CartItem>;
    getCart(sessionId?: string): Promise<import("../entities/cart-item.entity").CartItem[]>;
    getTotal(sessionId?: string): Promise<{
        total: number;
    }>;
    updateCartItem(id: string, updateCartItemDto: UpdateCartItemDto): Promise<import("../entities/cart-item.entity").CartItem>;
    removeFromCart(id: string): Promise<void>;
    clearCart(sessionId?: string): Promise<void>;
}
