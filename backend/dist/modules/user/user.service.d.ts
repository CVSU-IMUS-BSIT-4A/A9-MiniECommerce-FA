import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Order } from '../../entities/order.entity';
export declare class UserService {
    private userRepository;
    private orderRepository;
    constructor(userRepository: Repository<User>, orderRepository: Repository<Order>);
    getUserOrders(userEmail: string): Promise<Order[]>;
    getUserProfile(userId: number): Promise<{
        id: number;
        email: string;
        role: import("../../entities/user.entity").UserRole;
        name: string;
        createdAt: Date;
    } | null>;
    updateUserProfile(userId: number, updateData: {
        name?: string;
    }): Promise<{
        id: number;
        email: string;
        role: import("../../entities/user.entity").UserRole;
        name: string;
        createdAt: Date;
    } | null>;
}
