import { Controller, Get, Param, Post, Put, Body, Delete, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // for the product service
  @Get("/products")
  async getProducts(filteredProducts: any) {
    return this.appService.getProducts(filteredProducts);
  }
  @Get("/products/:id")
  async getProductById(@Param('id') id: string) {
    return this.appService.getProductById(id);
  }
  @Put("/products/increment/:id")
  async incrementProductQuantity(@Param('id') id: string) {
    return this.appService.incrementProductQuantity(id);
  }
  @Put("/products/decrement/:id")
  async decrementProductQuantity(@Param('id') id: string) {
    return this.appService.decrementProductQuantity(id);
  }
  @Post("/products")
  async createProduct(@Body() data: any) {
    return this.appService.createProduct(data);
  }
  @Delete("/products/:id")
  async deleteProduct(@Param('id') id: string) {
    return this.appService.deleteProduct(id);
  }

  // for the authentication service
  @Post("/auth/register")
  async registerUser(@Body() data: any) {
    return this.appService.registerUser(data);
  }
  @Post("/auth/login")
  async loginUser(@Body() data: any) {
    return this.appService.loginUser(data);
  }
  

  // for the order service
  @Get("/orders/:id")
  async getOrder(@Param('id') id: string){
    return this.appService.getOrder(id)
   }

    @Get("/orders")
  async getAllOrders(){
    return this.appService.getAllOrders()
   }

    @Get("/orders/payment/:paymentMethod")
  async getFilteredPaymentOrders(@Param('paymentMethod') paymentMethod: string){
    return this.appService.getFilteredPaymentOrders(paymentMethod)
   }

    @Get("/orders/date/:date_string")
  async getDatedOrders(@Param('date_string') date_string: string){
    return this.appService.getDatedOrders(date_string)  
  }


    @Get("/orders/user/:customerId")
  async getFilteredUserOrders(@Param('customerId') customerId: string){
    return this.appService.getFilteredUserOrders(customerId)
  }

    @Post("/orders")
    async createNewOrder(@Body() newOrder: any){
      return this.appService.createNewOrder(newOrder)
    }

   @Delete("/orders/:id")
   async deleteExistingOrder(@Param('id') id: string){
    return this.appService.deleteExistingOrder(id)
   }



   // for the payment service

    @Post('webhook')
  async stripeWebhook(@Req() req: any) {
    const rawBody = req.body; 
    const signature = req.headers['stripe-signature'];

    if (!signature) {
      return { status: 'error', message: 'Missing Stripe signature' };
    }
    return this.appService.handlePaymentWebhook({ rawBody, signature })
  }

 

   @Post("/payments/create-payment-intent")
    async createPaymentIntent(@Body() paymentOrder: any){
      return this.appService.createPaymentIntent(paymentOrder)
     }

    @Post("/payments/make-payment-order")
    async makePaymentOrder(@Body() data: any){
      return this.appService.makePaymentOrder(data)
    }

    @Post("/payments/make-payment-event")
    async makePaymentEvent(@Body() data: any){
      return this.appService.makePaymentEvent(data)
    }

    @Put("/payments/update-payment-order")
    async updatePaymentOrder(@Body() payload: {where: any, data: any}){
      return this.appService.updatePaymentOrder(payload.where, payload.data)
      }


    // cart endpoints

    @Post("/carts/add")
    async addToCart(@Body() cartDto: any){
      return this.appService.addToCart(cartDto)
    }

    @Get("/carts/:userId")
    async getCartByUserId(@Param('userId') userId: string){
      return this.appService.getCartByUserId(userId)
    }

    @Delete("/carts/remove")
    async removeFromCart(@Body() data: { userId: string; productId: string }){
      return this.appService.removeFromCart(data.userId, data.productId)
    }

    @Delete("/carts/clear/:userId")
    async clearCart(@Param('userId') userId: string){
      return this.appService.clearCart(userId)
     }
     

}
