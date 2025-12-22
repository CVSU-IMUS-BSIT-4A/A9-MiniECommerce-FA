import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { ProductService } from './product.service';
import { CreateOrderDto } from '../dto/order.dto';
export declare class OrderService {
    private orderRepository;
    private orderItemRepository;
    private productService;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, productService: ProductService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order>;
    updateStatus(id: number, status: string): Promise<Order>;
}
