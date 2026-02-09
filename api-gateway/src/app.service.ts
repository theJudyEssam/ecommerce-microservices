import { Inject, Injectable } from "@nestjs/common";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";


@Injectable()
export class AppService {

  constructor(@Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy, 
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy, 
    @Inject("ORDER_SERVICE") private readonly orderClient: ClientProxy) {}
    

  // for the product service
  async getProducts(filteredProducts: any) {
  return this.productClient.send({ cmd: 'get_products' }, filteredProducts || {});
    }
  async getProductById(id: string) {
    return this.productClient.send({ cmd: 'get_product' }, id);
  }
  async incrementProductQuantity(id: string) {
    return this.productClient.send({ cmd: 'increment_quantity' }, id);
  }
  async decrementProductQuantity(id: string) {
    return this.productClient.send({ cmd: 'decrement_quantity' }, id);
  }
  async createProduct(data: any) {
    return this.productClient.send({ cmd: 'add_product' }, data);
  }
  async updateProduct(id: string, data: any) {
    return this.productClient.send({ cmd: 'update_product' }, { id, data });
  }
  async deleteProduct(id: string) {
    return this.productClient.send({ cmd: 'delete_product' }, id);
  }

  // for the authentication service
  async registerUser(data: any) {
    return this.userClient.send({ cmd: 'register' }, data);
  }
  async loginUser(data: any) {
    return this.userClient.send({ cmd: 'login' }, data);
  }


  // for order service

  async getOrder(id: string){
    return this.orderClient.send({cmd:"get_order"}, id)
  }

  async getAllOrders(){
    return this.orderClient.send({cmd: "get_all_orders"}, {})
  }

  async getFilteredPaymentOrders(paymentMethod: string){
    return this.orderClient.send({cmd: "get_filtered_payment_orders"}, paymentMethod)
  }

  async getFilteredUserOrders(customerId: string){
    return this.orderClient.send({cmd: "get_filtered_user_orders"}, customerId)
  }

  async getDatedOrders(date_string: string){
    return this.orderClient.send({cmd: "get_dated_orders"}, date_string)
  }

  async createNewOrder(newOrder: any){
    return this.orderClient.send({cmd: "create_new_order"}, newOrder)
  }

  async deleteExistingOrder(id: string){
    return this.orderClient.send({cmd: "delete_order"}, id)
  }
  
}
