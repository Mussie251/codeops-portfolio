
import { Inject, Injectable } from "@nestjs/common";
import type { Area, Order } from "./order.types.js";
import { OrderNotFoundError } from "./order.errors.js";
import type { OrderRepository } from "./order.repository.js";

@Injectable()
export class OrderService {
  constructor(
    @Inject("ORDER_REPOSITORY")
    private readonly repository: OrderRepository,
  ) {}

  find(id: number): Order {
    const order = this.repository.byId(id);

    if (order === undefined) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }

  feesByArea(): Record<Area, number> {
    return {
      Bole: 4000,
      Kazanchis: 6000,
      Piassa: 6000,
      Megenagna: 6000,
    };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repository.all().map((order) => order[key]);
  }
}
