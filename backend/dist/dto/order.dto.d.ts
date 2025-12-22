declare class OrderItemDto {
    productId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    customerName: string;
    customerEmail: string;
    customerAddress?: string;
    items: OrderItemDto[];
}
export {};
