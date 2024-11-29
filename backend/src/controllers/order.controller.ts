import { NextFunction, Request, Response } from "express";

import { orderService } from "../services/order.service";

class OrderController {
  public async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.getOrders();
      res.status(200).json(orders);
    } catch (e) {
      next(e);
    }
  }
}

export const orderController = new OrderController();
