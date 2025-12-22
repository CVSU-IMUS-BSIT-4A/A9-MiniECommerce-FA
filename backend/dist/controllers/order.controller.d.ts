import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<import("../entities/order.entity").Order>;
    findAll(): Promise<import("../entities/order.entity").Order[]>;
    findOne(id: string): Promise<import("../entities/order.entity").Order>;
    updateStatus(id: string, status: string): Promise<import("../entities/order.entity").Order>;
}
