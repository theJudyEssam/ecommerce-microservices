import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import { StripeController } from './stripe.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [StripeController],
  providers: [
    StripeService,
    {
      provide: 'STRIPE_API_KEY',
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('STRIPE_API_KEY');
      },
      inject: [ConfigService],
    },
    {
      provide: 'STRIPE_WEBHOOK_SECRET',
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('STRIPE_WEBHOOK_SECRET');
      },
      inject: [ConfigService],
    },
  ],
  exports: [StripeService], 
})
export class StripeModule {}
