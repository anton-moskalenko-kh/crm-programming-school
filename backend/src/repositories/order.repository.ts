import { IOrderInterface } from "../interfaces/order.interface";
import { OrderModel } from "../models/OrderModel";

class OrderRepository {
  public async getOrders(): Promise<IOrderInterface[]> {
    return await OrderModel.find();
  }
}

export const orderRepository = new OrderRepository();
