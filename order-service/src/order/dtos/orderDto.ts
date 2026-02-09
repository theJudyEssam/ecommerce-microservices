// src/orders/dto/create-order.dto.ts
import { IsString, IsNumber, IsOptional, IsIn } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  customerId: string;

  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsIn(['COD', 'CARD', 'PAYPAL'])
  paymentMethod?: string;
}
