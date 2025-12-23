import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Order } from '../../entities/order.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getUserOrders(userEmail: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { customerEmail: userEmail },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async getUserProfile(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUserProfile(userId: number, updateData: { name?: string }) {
    await this.userRepository.update(userId, updateData);
    return this.getUserProfile(userId);
  }
}
