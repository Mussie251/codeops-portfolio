import { describe, it, expect, beforeEach } from 'vitest';
import { OrderService } from './order.service.js';
import { InMemoryOrderRepository } from './order.repository.js';
import type { Order } from './order.types.js';
import { OrderNotFoundError } from './order.errors.js';

describe('OrderService', () => {
  let service: OrderService;

  const sampleOrders: Order[] = [
    {
      id: 1,
      customerName: 'Abebe Bikila',
      area: 'Bole',
      status: 'PENDING',
      dishes: [
        { name: 'Doro Wot', priceSantim: 25000 },
        { name: 'Injera', priceSantim: 3000 },
      ],
      totalSantim: 28000,
    },
    {
      id: 2,
      customerName: 'Hana Alemu',
      area: 'Kazanchis',
      status: 'PREPARING',
      dishes: [{ name: 'Shiro Wot', priceSantim: 12000 }],
      totalSantim: 12000,
    },
  ];

  beforeEach(() => {
    const repository = new InMemoryOrderRepository(sampleOrders);
    service = new OrderService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find an order by ID', () => {
    const result = service.find(1);

    expect(result.customerName).toBe('Abebe Bikila');
  });

  it('should throw OrderNotFoundError for a missing order', () => {
    expect(() => service.find(999)).toThrow(OrderNotFoundError);
  });

  it('should return delivery fees by area', () => {
    expect(service.feesByArea()).toEqual({
      Bole: 4000,
      Kazanchis: 6000,
      Piassa: 6000,
      Megenagna: 6000,
    });
  });

  it('should summarise order IDs', () => {
    expect(service.summarise('id')).toEqual([1, 2]);
  });

  it('should summarise customer names', () => {
    expect(service.summarise('customerName')).toEqual([
      'Abebe Bikila',
      'Hana Alemu',
    ]);
  });
});