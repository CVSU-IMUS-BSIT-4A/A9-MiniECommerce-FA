import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardStats(): Promise<{
        totalProducts: number;
        totalOrders: number;
        totalUsers: number;
        totalRevenue: number;
        lowStockCount: number;
        lowStockProducts: import("../../entities/product.entity").Product[];
    }>;
    getAllUsers(): Promise<import("../../entities/user.entity").User[]>;
    getAllOrders(): Promise<import("../../entities/order.entity").Order[]>;
    updateOrderStatus(id: number, status: string): Promise<import("../../entities/order.entity").Order | null>;
}
