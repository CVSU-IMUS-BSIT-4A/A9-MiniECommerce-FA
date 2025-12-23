import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { Order } from '../../entities/order.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getDashboardStats() {
    const totalProducts = await this.productRepository.count();
    const totalOrders = await this.orderRepository.count();
    const totalUsers = await this.userRepository.count();
    
    const orders = await this.orderRepository.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    const lowStockProducts = await this.productRepository
      .createQueryBuilder('product')
      .where('product.stock < :threshold', { threshold: 10 })
      .getMany();

    return {
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
    };
  }

  async getAllUsers() {
    const users = await this.userRepository.find({
      select: ['id', 'email', 'name', 'role', 'createdAt'],
    });
    return users;
  }

  async getAllOrders() {
    return this.orderRepository.find({
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateOrderStatus(orderId: number, status: string) {
    await this.orderRepository.update(orderId, { status });
    return this.orderRepository.findOne({ 
      where: { id: orderId },
      relations: ['items'],
    });
  }
}
