import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { ProductService } from './product.service';
import { CreateOrderDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private productService: ProductService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerName, customerEmail, customerAddress, items } = createOrderDto;

    if (!items || items.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

    // Validate stock and calculate total
    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      await this.productService.validateStock(item.productId, item.quantity);
      const product = await this.productService.findOne(item.productId);

      const orderItem = this.orderItemRepository.create({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
      });

      orderItems.push(orderItem);
      totalAmount += Number(product.price) * item.quantity;
    }

    // Create order
    const order = this.orderRepository.create({
      customerName,
      customerEmail,
      customerAddress,
      totalAmount,
      status: 'pending',
      items: orderItems,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Reduce stock for each product
    for (const item of items) {
      await this.productService.reduceStock(item.productId, item.quantity);
    }

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['items'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async updateStatus(id: number, status: string): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return this.orderRepository.save(order);
  }
}
