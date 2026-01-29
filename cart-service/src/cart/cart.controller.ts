
import {MessagePattern} from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CartDto } from './dto/CartDto';
import { Controller } from '@nestjs/common';



@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
    @MessagePattern({ cmd: 'add_to_cart' })
    async addToCart(cartDto: CartDto) {
        const cartItem = await this.cartService.addToCart(cartDto);
        return cartItem;
    }

    @MessagePattern({ cmd: 'get_cart' })
    async getCartByUserId(userId: string) {
        const cartItems = await this.cartService.getCartByUserId(userId);
        return cartItems;
    }

    @MessagePattern({ cmd: 'remove_from_cart' })
    async removeFromCart(data: { userId: string; productId: string }) {
        const result = await this.cartService.removeFromCart(data.userId, data.productId);
        return result;
    }

    @MessagePattern({ cmd: 'clear_cart' })
    async clearCart(userId: string) {
        const result = await this.cartService.clearCart(userId);
        return result;
    }

}