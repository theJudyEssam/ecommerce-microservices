import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  imports: [StripeModule, PrismaModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
