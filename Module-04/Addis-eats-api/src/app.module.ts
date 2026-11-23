import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';

import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { OrdersModule } from './orders/orders.module.js';
import { EventsModule } from './events/events.module.js';
import { LoggerMiddleware } from './common/logger/logger.middleware.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      serviceId: 'addis-eats-api',
      redaction: {
        enabled: true,
        useDefaultPatterns: true,
        keys: [
          'phone',
          'phoneNumber',
          'telebirrPhone',
          'customerPhone',
        ],
        replacement: '[REDACTED]',
      },
    }),
    OrdersModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}