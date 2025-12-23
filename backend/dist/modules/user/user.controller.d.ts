import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<{
        id: number;
        email: string;
        role: import("../../entities/user.entity").UserRole;
        name: string;
        createdAt: Date;
    } | null>;
    getMyOrders(req: any): Promise<import("../../entities/order.entity").Order[]>;
    updateProfile(req: any, updateData: {
        name?: string;
    }): Promise<{
        id: number;
        email: string;
        role: import("../../entities/user.entity").UserRole;
        name: string;
        createdAt: Date;
    } | null>;
}
