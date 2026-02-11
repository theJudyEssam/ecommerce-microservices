import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'products_queue',
          queueOptions: {
            durable: false
          },
        },
      },

      {
        name: 'USER_SERVICE', 
        transport: Transport.RMQ, 
         options: {
          urls: ['amqp://localhost:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false
          },
        },
      }, 

      {
        name: 'CART_SERVICE', 
        transport: Transport.RMQ, 
         options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cart_queue',
          queueOptions: {
            durable: false
          },
        },
      }, 


      {
        name: 'ORDER_SERVICE', 
        transport: Transport.RMQ, 
         options: {
          urls: ['amqp://localhost:5672'],
          queue: 'orders_queue',
          queueOptions: {
            durable: false
          },
        },
      },


      {
        name: 'PAYMENT_SERVICE', 
        transport: Transport.RMQ, 
         options: {
          urls: ['amqp://localhost:5672'],
          queue: 'payment_queue',
          queueOptions: {
            durable: false
          },
        },
      },

    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
