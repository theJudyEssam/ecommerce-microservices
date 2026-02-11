import { Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StripeService } from './stripe.service';
import { PaymentEventDto } from 'src/payment/dtos/PaymentEventDto';

@Controller()
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('/webhook')
  @MessagePattern({cmd:'webhook'})
  async handleWebhook(@Payload() event: any) {
    try {
      await this.stripeService.handleWebhook(event);
      return { status: 'processed' };
    } catch (error) {
      console.error('Error handling webhook:', error);
      return { status: 'error', message: error.message };
    }
  }
}
