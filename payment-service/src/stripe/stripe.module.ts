import { Module } from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { PrismaService } from "prisma/prisma.service";
import { StripeController } from "./stripe.controller";

@Module({
    imports: [PrismaService], 
    controllers: [StripeController],
    providers: [StripeService],
})
export class StripeModule{}