import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



export type CartDocument = Cart & Document;
@Schema({ collection: 'E-Commerce_Cart' })
export class Cart extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    productId: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);