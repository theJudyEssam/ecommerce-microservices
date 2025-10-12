import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Double } from 'mongoose';

export type ProductDocument = Product & Document;
@Schema({collection : "E-Commerce_Products"})
export class Product extends Document {
  @Prop({ required: true })
  product_name: string;

  @Prop()
  product_description: string;

  @Prop({ required: true })
  product_price: number;

  @Prop({ required: true })
  product_image: string;

  @Prop({ required: true })
  stock_quantity: number;

  @Prop({ required: true })
  product_category: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
