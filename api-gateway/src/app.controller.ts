import { Controller, Get, Param, Post, Put, Body, Delete } from '@nestjs/common';
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




}
