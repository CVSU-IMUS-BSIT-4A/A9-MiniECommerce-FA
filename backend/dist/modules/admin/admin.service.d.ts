import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { Order } from '../../entities/order.entity';
import { User } from '../../entities/user.entity';
export declare class AdminService {
    private productRepository;
    private orderRepository;
    private userRepository;
    constructor(productRepository: Repository<Product>, orderRepository: Repository<Order>, userRepository: Repository<User>);
    getDashboardStats(): Promise<{
        totalProducts: number;
        totalOrders: number;
        totalUsers: number;
        totalRevenue: number;
        lowStockCount: number;
        lowStockProducts: Product[];
    }>;
    getAllUsers(): Promise<User[]>;
    getAllOrders(): Promise<Order[]>;
    updateOrderStatus(orderId: number, status: string): Promise<Order | null>;
}
