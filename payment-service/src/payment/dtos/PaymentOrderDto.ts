import {
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class PaymentOrderDto {
  @IsOptional()
  transactionId?: string;

  @IsString()
  @IsNotEmpty()
  buyerId: string;

  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsOptional()
  stripePaymentIntentId?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
