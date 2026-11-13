import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OrdersController } from './orders.controller.js';
import { OrderService } from './order.service.js';

describe('OrdersController', () => {
  let controller: OrdersController;

  const mockOrderService = {
    find: vi.fn(),
    summarise: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    controller = new OrdersController(
      mockOrderService as unknown as OrderService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all orders', () => {
    const orders = [
      { id: 1, customerName: 'Abebe Bikila' },
      { id: 2, customerName: 'Hana Alemu' },
    ];

    mockOrderService.summarise.mockReturnValue([1, 2]);
    mockOrderService.find
      .mockReturnValueOnce(orders[0])
      .mockReturnValueOnce(orders[1]);

    const result = controller.findAll();

    expect(mockOrderService.summarise).toHaveBeenCalledWith('id');
    expect(mockOrderService.find).toHaveBeenCalledTimes(2);
    expect(result).toEqual(orders);
  });

  it('should return one order by ID', () => {
    const order = { id: 1, customerName: 'Abebe Bikila' };

    mockOrderService.find.mockReturnValue(order);

    const result = controller.findOne(1);

    expect(mockOrderService.find).toHaveBeenCalledWith(1);
    expect(result).toBe(order);
  });
});