import { Order } from './order.entity';
export declare class OrderItem {
    id: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    order: Order;
    orderId: number;
}
