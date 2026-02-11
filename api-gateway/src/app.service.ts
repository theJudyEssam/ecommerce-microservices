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
    @Inject("ORDER_SERVICE") private readonly orderClient: ClientProxy, 
    @Inject("PAYMENT_SERVICE") private readonly paymentClient: ClientProxy, 
    @Inject("CART_SERVICE") private readonly cartClient: ClientProxy
  ) {}
    

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


  // for payment service

  async handlePaymentWebhook(eventBody: any){
    return this.paymentClient.send({cmd: "webhook"}, eventBody)
  }

  async makePaymentOrder(data: any){
    return this.paymentClient.send({cmd: "make_payment_order"}, data)
  }

  async makePaymentEvent(data: any){
    return this.paymentClient.send({cmd: "make_payment_event"}, data)
  }

  async updatePaymentOrder(where: any, data: any){
    return this.paymentClient.send({cmd: "update_payment_order"}, {where, data})
  }

  async createPaymentIntent(paymentOrder: any){
    return this.paymentClient.send({cmd: "create_payment_intent"}, paymentOrder)
  }



  //cart services 
  async addToCart(cartDto: any){
    return this.orderClient.send({cmd: "add_to_cart"}, cartDto)
  }

  async getCartByUserId(userId: string){
    return this.orderClient.send({cmd: "get_cart"}, userId)
  }

  async removeFromCart(userId: string, productId: string){
    return this.orderClient.send({cmd: "remove_from_cart"}, {userId, productId})
  }

  async clearCart(userId: string){
    return this.orderClient.send({cmd: "clear_cart"}, userId)
  }



}
