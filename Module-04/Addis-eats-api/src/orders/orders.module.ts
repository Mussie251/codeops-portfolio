import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller.js";
import { OrderService } from "./order.service.js";
import { InMemoryOrderRepository } from "./order.repository.js";

@Module({
  controllers: [OrdersController],
  providers: [
    OrderService,
    {
      provide: "ORDER_REPOSITORY",
      useFactory: () =>
        new InMemoryOrderRepository([
          {
            id: 1,
            customerName: "Abebe Bikila",
            area: "Bole",
            status: "PENDING",
            dishes: [
              { name: "Doro Wot", priceSantim: 25000 },
              { name: "Injera", priceSantim: 3000 },
            ],
            totalSantim: 28000,
          },
          {
            id: 2,
            customerName: "Hana Alemu",
            area: "Kazanchis",
            status: "PREPARING",
            dishes: [
              { name: "Shiro Wot", priceSantim: 12000 },
              { name: "Injera", priceSantim: 3000 },
            ],
            totalSantim: 15000,
          },
          {
            id: 3,
            customerName: "Dawit Bekele",
            area: "Piassa",
            status: "ON_THE_WAY",
            dishes: [
              { name: "Tibs", priceSantim: 22000 },
            ],
            totalSantim: 22000,
          },
        ]),
    },
  ],
  exports: [OrderService],
})
export class OrdersModule {}