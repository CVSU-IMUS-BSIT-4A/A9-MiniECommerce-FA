import { Controller, Get, Post, Body, Patch, Param, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new order (Checkout)',
    description: 'Creates a new order from cart items. Validates stock availability, calculates total, reduces product stock, and sets initial status to "pending". This is the checkout endpoint.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Order created successfully',
    schema: {
      example: {
        id: 1,
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerAddress: '123 Main St, City, Country',
        totalAmount: 2599.98,
        status: 'pending',
        items: [
          {
            id: 1,
            productId: 5,
            productName: 'Laptop Pro 15"',
            price: 1299.99,
            quantity: 2
          }
        ],
        createdAt: '2026-01-16T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - insufficient stock, invalid items, or missing required fields' })
  create(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all orders',
    description: 'Retrieves a complete list of all orders in the system with their items. Used by admin dashboard to view all customer orders.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns array of all orders with their items',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          customerName: { type: 'string' },
          customerEmail: { type: 'string' },
          customerAddress: { type: 'string' },
          totalAmount: { type: 'number' },
          status: { type: 'string', enum: ['pending', 'processing', 'receiving', 'completed', 'cancelled'] },
          items: { type: 'array' },
          createdAt: { type: 'string' }
        }
      }
    }
  })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get order details by ID',
    description: 'Retrieves detailed information about a specific order including all order items, customer details, and current status.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the complete order details',
    schema: {
      example: {
        id: 1,
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerAddress: '123 Main St, City, Country',
        totalAmount: 2599.98,
        status: 'processing',
        items: [
          {
            id: 1,
            productId: 5,
            productName: 'Laptop Pro 15"',
            price: 1299.99,
            quantity: 2
          }
        ],
        createdAt: '2026-01-16T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Order not found with the given ID' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id/status')
  @ApiOperation({ 
    summary: 'Update order status (Admin)',
    description: 'Updates the status of an order. Admin only. Status workflow: pending → processing → receiving → completed. Orders can also be set to cancelled.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Order status updated successfully',
    schema: {
      example: {
        id: 1,
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        totalAmount: 2599.98,
        status: 'processing',
        createdAt: '2026-01-16T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiBody({ 
    description: 'New order status',
    schema: { 
      properties: { 
        status: { 
          type: 'string', 
          enum: ['pending', 'processing', 'receiving', 'completed', 'cancelled'],
          example: 'processing',
          description: 'New status for the order'
        } 
      },
      required: ['status']
    } 
  })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.orderService.updateStatus(+id, status);
  }

  @Patch(':id/receive')
  @ApiOperation({ 
    summary: 'Mark order as received (User)',
    description: 'Allows the customer to confirm they have received their order. This updates the order status from "receiving" to "completed". User action only.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Order marked as received and status changed to completed',
    schema: {
      example: {
        id: 1,
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        totalAmount: 2599.98,
        status: 'completed',
        createdAt: '2026-01-16T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  receiveOrder(@Param('id') id: string) {
    return this.orderService.updateStatus(+id, 'completed');
  }
}
