import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ example: 1, description: 'Product ID' })
  productId: number;

  @ApiProperty({ example: 2, description: 'Quantity' })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'John Doe', description: 'Customer name' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ example: 'john@example.com', description: 'Customer email' })
  @IsEmail()
  @IsNotEmpty()
  customerEmail: string;

  @ApiProperty({ example: '123 Main St, City, Country', description: 'Delivery address', required: false })
  @IsOptional()
  @IsString()
  customerAddress?: string;

  @ApiProperty({ 
    type: [OrderItemDto], 
    example: [{ productId: 1, quantity: 2 }],
    description: 'Order items'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
