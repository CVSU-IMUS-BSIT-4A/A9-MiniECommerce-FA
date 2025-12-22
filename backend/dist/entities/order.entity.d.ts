import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    totalAmount: number;
    status: string;
    items: OrderItem[];
    createdAt: Date;
}
