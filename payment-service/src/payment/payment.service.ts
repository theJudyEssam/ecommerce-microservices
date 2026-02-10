import { Injectable } from "@nestjs/common";
import { PaymentOrderDto } from "./dtos/PaymentOrderDto";
import { PrismaService } from "prisma/prisma.service";
import {PaymentOrder,PaymentEvent,Prisma } from "src/generated/prisma/client";



@Injectable()
export class PaymentService {

    constructor(private prisma: PrismaService) {}
   

    makePaymentOrder(data: Prisma.PaymentOrderCreateInput):Promise<PaymentOrder>
    {
        return this.prisma.paymentOrder.create({data})
    }

    makePaymentEvent(data: Prisma.PaymentEventCreateInput):Promise<PaymentEvent>
    {
        return this.prisma.paymentEvent.create({data})
    }

}