import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema({ collection: 'E-Commerce_Users' })
export class User extends Document{

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({required: true })
    phone_number: string;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;

    @Prop({ default: 'user' }) // two main roles: 'user' and 'admin'
    role: string;

}
