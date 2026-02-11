import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class PaymentEventDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @IsString()
  @IsNotEmpty()
  creditCardInfo: string;

  @IsString()
  @IsNotEmpty()
  paymentOrders: any[];
}
