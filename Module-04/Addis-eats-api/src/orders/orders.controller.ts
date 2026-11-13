
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { OrderService } from "./order.service.js";

@Controller("orders")
export class OrdersController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Get()
  findAll() {
    return this.orderService.summarise("id").map((id) =>
      this.orderService.find(id),
    );
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.orderService.find(id);
  }
}
