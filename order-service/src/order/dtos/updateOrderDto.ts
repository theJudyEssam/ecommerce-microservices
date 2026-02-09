// src/orders/dto/create-order.dto.ts
import { IsString, IsNumber, IsOptional, IsIn } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  customerId: string;


  @IsOptional()
  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsIn(['COD', 'CARD', 'PAYPAL'])
  paymentMethod?: string;
}
