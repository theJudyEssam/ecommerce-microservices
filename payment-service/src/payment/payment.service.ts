import { Injectable } from '@nestjs/common';
import { PaymentOrderDto } from './dtos/PaymentOrderDto';
import { PrismaService } from 'prisma/prisma.service';
import {
  PaymentOrder,
  PaymentEvent,
  Prisma,
} from '../../generated/prisma/client';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService,
  ) {}

  makePaymentOrder(
    data: Prisma.PaymentOrderCreateInput,
  ): Promise<PaymentOrder> {
    return this.prisma.paymentOrder.create({ data });
  }

  makePaymentEvent(
    data: Prisma.PaymentEventCreateInput,
  ): Promise<PaymentEvent> {
    return this.prisma.paymentEvent.create({ data });
  }

  updatePaymentOrder(
    where: Prisma.PaymentOrderWhereUniqueInput,
    data: Prisma.PaymentOrderUpdateInput,
  ): Promise<PaymentOrder> {
    return this.prisma.paymentOrder.update({ where, data });
  }

  async createPaymentIntent(paymentOrder: PaymentOrderDto) {
    const order = await this.stripeService.createPaymentIntent(
      Number(paymentOrder.amount),
      paymentOrder.currency,
      paymentOrder.transactionId!,
      paymentOrder.buyerId,
    );

    return {
      intentId: order.id,
      clientSecret: order.client_secret, // to be used in the frontend inshAllah
    };
  }
}
