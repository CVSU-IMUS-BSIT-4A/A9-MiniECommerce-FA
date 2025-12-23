import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.getUserProfile(req.user.userId);
  }

  @Get('orders')
  async getMyOrders(@Request() req) {
    return this.userService.getUserOrders(req.user.email);
  }

  @Patch('profile')
  async updateProfile(@Request() req, @Body() updateData: { name?: string }) {
    return this.userService.updateUserProfile(req.user.userId, updateData);
  }
}
