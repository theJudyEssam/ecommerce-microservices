import { Injectable, Logger, Inject } from "@nestjs/common";
import Stripe from 'stripe'


@Injectable()
export class StripeService{
    private stripe: Stripe;
    private readonly logger = new Logger(StripeService.name);

     constructor(
    @Inject('STRIPE_API_KEY')
    private readonly apiKey: string,
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2026-01-28.clover', 
    });
  }

   async createPaymentIntent(
    amount: number,
    currency: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
      });
      this.logger.log(
        `PaymentIntent created successfully with amount: ${amount} ${currency}`,
      );
      return paymentIntent;
    } catch (error) {
      this.logger.error('Failed to create PaymentIntent', error.stack);
      throw error;
    }
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

   async attachPaymentMethod(
    customerId: string,
    paymentMethodId: string,
  ): Promise<void> {
    try {
      await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });
      this.logger.log(
        `Payment method ${paymentMethodId} attached to customer ${customerId}`,
      );
    } catch (error) {
      this.logger.error('Failed to attach payment method', error.stack);
      throw error;
    }
  }

   async getBalance(): Promise<Stripe.Balance> {
    try {
      const balance = await this.stripe.balance.retrieve();
      this.logger.log('Balance retrieved successfully');
      return balance;
    } catch (error) {
      this.logger.error('Failed to retrieve balance', error.stack);
      throw error;
    }
  }

  async createPaymentLink(priceId: string): Promise<Stripe.PaymentLink> {
    try {
      const paymentLink = await this.stripe.paymentLinks.create({
        line_items: [{ price: priceId, quantity: 1 }],
      });
      this.logger.log('Payment link created successfully');
      return paymentLink;
    } catch (error) {
      this.logger.error('Failed to create payment link', error.stack);
      throw error;
    }
  }

   async createCustomer(email: string, name: string): Promise<Stripe.Customer> {
    try {
      const customer = await this.stripe.customers.create({ email, name });
      this.logger.log(`Customer created successfully with email: ${email}`);
      return customer;
    } catch (error) {
      this.logger.error('Failed to create customer', error.stack);
      throw error;
    }
  }

  async getCustomers() {
    try {
      const customers = await this.stripe.customers.list({});
      this.logger.log('Customers fetched successfully');
      return customers.data;
    } catch (error) {
      this.logger.error('Failed to fetch products', error.stack);
      throw error;
    }
  }
}