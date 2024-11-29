import { IOrderInterface } from "../interfaces/order.interface";
import { orderRepository } from "../repositories/order.repository";

class OrderService {
  public async getOrders(): Promise<IOrderInterface[]> {
    return await orderRepository.getOrders();
  }
}

export const orderService = new OrderService();
