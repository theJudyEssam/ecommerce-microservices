
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Cart, CartDocument} from './schema/Cart';
import {CartDto} from './dto/CartDto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CartService {
    constructor(
        @InjectModel('Cart')
        private readonly cartModel: Model<CartDocument>,
    ) {}

    async addToCart(cartDto: CartDto): Promise<Cart> {
        const newCartItem = new this.cartModel(cartDto);
        return newCartItem.save();
    }

    async getCartByUserId(userId: string): Promise<Cart[]> {
        return this.cartModel.find({ userId }).exec();
    }

    async removeFromCart(userId: string, productId: string): Promise<{ deleted: boolean }> {
        const result = await this.cartModel.deleteOne({ userId, productId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Cart item not found');
        }
        return { deleted: true };
    }

    async clearCart(userId: string): Promise<{ deletedCount: number }> {
        const result = await this.cartModel.deleteMany({ userId }).exec();
        return { deletedCount: result.deletedCount || 0 };
    }

}