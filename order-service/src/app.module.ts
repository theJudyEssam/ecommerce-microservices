import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderService } from './order/order.service';
import { PrismaService } from 'prisma/prisma.service';
import { OrderModule } from './order/order.module';
import {ConfigModule} from "@nestjs/config"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally
    })
    ,OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
