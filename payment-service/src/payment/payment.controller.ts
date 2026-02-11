import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { PaymentOrderDto } from './dtos/PaymentOrderDto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({cmd:'make_payment_order'})
  async makePaymentOrder(data: any) {
    return this.paymentService.makePaymentOrder(data);
  }

  @MessagePattern({cmd:'make_payment_event'})
  async makePaymentEvent(data: any) {
    return this.paymentService.makePaymentEvent(data);
  }

  @MessagePattern({cmd:'update_payment_order'})
  async updatePaymentOrder(payload: { where: any; data: any }) {
    return this.paymentService.updatePaymentOrder(payload.where, payload.data);
  }

  @MessagePattern({cmd:'create_payment_intent'})
  async createPaymentIntent(paymentOrder: PaymentOrderDto) {
    return this.paymentService.createPaymentIntent(paymentOrder);
  }
}
