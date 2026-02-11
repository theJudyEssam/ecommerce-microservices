import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';
import { StripeModule } from './stripe/stripe.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    PaymentModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
