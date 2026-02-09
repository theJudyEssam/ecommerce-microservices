import { Controller } from "@nestjs/common";
import { OrderService } from "./order.service";
import { MessagePattern } from "@nestjs/microservices";
import { CreateOrderDto } from "./dtos/orderDto";
import { UpdateOrderDto } from "./dtos/updateOrderDto";


@Controller()
export class OrderController{
    constructor(
        private readonly OrderService: OrderService
    ){}

    @MessagePattern({cmd: "get_order"})
    async get_one_order(order_id: string){
        return this.OrderService.getOneOrder({id: String(order_id)})
    }

    @MessagePattern({cmd: "get_all_orders"})
    async get_all_orders(){
        return this.OrderService.getAllOrders({})
    }

    @MessagePattern({cmd:"get_filtered_payment_orders"})
    async get_filtered_payment_orders(paymentMethod: string){
        return this.OrderService.getAllOrders({
            where:{paymentMethod: String(paymentMethod) }
        })
    }

    @MessagePattern({cmd: "get_filtered_user_orders"})
    async get_filtered_user_orders(customerId: string){
        return this.OrderService.getAllOrders({
            where:{customerId: String(customerId) }
        })
    }

    @MessagePattern({cmd: "get_dated_orders"})
    async get_dated_orders(date_string: string){
        let date = new Date(date_string)
        return this.OrderService.getAllOrders({
            where:{createdAt: date }
        })
    }

    @MessagePattern({cmd: "create_new_order"})
    async create_new_order(newOrder: CreateOrderDto){
        return this.OrderService.createOrder(newOrder)
    }

    @MessagePattern({cmd: "delete_order"})
    async delete_existing_order(id: string){
        return this.OrderService.deleteOrder({id: String(id)})
    }

}