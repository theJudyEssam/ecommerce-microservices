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


}
