import {Module} from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import {MongooseModule} from '@nestjs/mongoose';
import {CartSchema} from './schema/Cart';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}