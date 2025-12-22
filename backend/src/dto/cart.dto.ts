import { IsNumber, IsNotEmpty, Min, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ example: 1, description: 'Product ID' })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: 2, description: 'Quantity to add' })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 'session-123', description: 'Session ID', required: false })
  @IsString()
  sessionId?: string;
}

export class UpdateCartItemDto {
  @ApiProperty({ example: 3, description: 'New quantity' })
  @IsNumber()
  @Min(0)
  quantity: number;
}
