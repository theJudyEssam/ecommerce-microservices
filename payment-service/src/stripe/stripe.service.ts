import { Injectable, Logger, Inject } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import Stripe from 'stripe'
import {PaymentOrder,PaymentEvent,Prisma } from "../../generated/prisma/client.js";



@Injectable()
export class StripeService{
    private stripe: Stripe;
    private readonly logger = new Logger(StripeService.name);

    constructor(
        @Inject('STRIPE_API_KEY')
        private readonly apiKey: string,

        @Inject('STRIPE_WEBHOOK_SECRET') 
        private readonly webhookSecret: string,  // TODO: generate a webhook secret 
        
        private prisma: PrismaService
  ){
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2026-01-28.clover', 
    });
  }

    async createPaymentIntent(
    amount: number,
    currency: string,
    paymentOrderId: string,
    userId: string,
    ) {
    return await this.stripe.paymentIntents.create({
        amount,
        currency,

        automatic_payment_methods: {enabled: true},

        metadata: {
            paymentOrderId,
            userId},
    });
    }


async refundPayment(paymentIntentId: string): Promise<Stripe.Refund> {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
      });
      this.logger.log(
        `Refund processed successfully for PaymentIntent: ${paymentIntentId}`,
      );
      return refund;
    } catch (error) {
      this.logger.error('Failed to process refund', error.stack);
      throw error;
    }
  }


/*
note: input must match this schema:
{
  rawBody: Buffer;
  headers: { 'stripe-signature': string }
}
Todo: Make a datatype to enforce this schema, and validate the input before processing the webhook
*/

async handleWebhook(eventBody: any) {
    const rawBody = eventBody.rawBody;
    const signature = eventBody.headers['stripe-signature'];
    let event:Stripe.Event

        try{
            event = this.stripe.webhooks.constructEvent(rawBody, signature, this.webhookSecret)
        }
        catch (err) { 
            throw new Error('Webhook Verification Failed')
        }

    return this.webhookHandler(event)
}



async webhookHandler(event: Stripe.Event) {
  this.logger.log(`Received Stripe webhook event: ${event.type}`);

  switch (event.type) {
    case 'payment_intent.created':
    case 'payment_intent.succeeded':
    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const order = await this.prisma.paymentOrder.findUnique({
        where: { stripePaymentIntentId : paymentIntent.id },
      });

      if (order) {
        let status = '';
        if (event.type === 'payment_intent.created') status = 'intent_created';
        if (event.type === 'payment_intent.succeeded') status = 'payment_succeeded';
        if (event.type === 'payment_intent.payment_failed') status = 'payment_failed';

        await this.prisma.paymentOrder.update({
          where: { transactionId: order.transactionId },
          data: { status, updatedAt: new Date() },
        });

        // Create PaymentEvent
        await this.prisma.paymentEvent.create({
          data: {
            paymentOrderId: order.transactionId,
            eventType: event.type,
            stripeEventId: event.id,
            createdAt: new Date(),
          },
        });
      }
      break;

    case 'refund.created':
    case 'refund.failed':
      const refund = event.data.object as Stripe.Refund;
      // TODO: lookup payment order via refund.payment_intent
      // create PaymentEvent and/or update PaymentOrder
      break;

    default:
      this.logger.warn(`Unhandled event type: ${event.type}`);
  }

  return { received: true };
}}
