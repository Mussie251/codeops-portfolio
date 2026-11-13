
import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { EventsController } from './events.controller.js';
import { EventsService } from './events.service.js';

describe('EventsController', () => {
  let controller: EventsController;
  let eventsService: {
    findAll: ReturnType<typeof vi.fn>;
    findUpcoming: ReturnType<typeof vi.fn>;
    findOne: ReturnType<typeof vi.fn>;
    findSessions: ReturnType<typeof vi.fn>;
    findSession: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    eventsService = {
      findAll: vi.fn(),
      findUpcoming: vi.fn(),
      findOne: vi.fn(),
      findSessions: vi.fn(),
      findSession: vi.fn(),
      create: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: eventsService,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all events using query parameters', () => {
    const query = { category: 'technology' };
    const expected = { items: [], total: 0 };

    eventsService.findAll.mockReturnValue(expected);

    const result = controller.findAll(query);

    expect(eventsService.findAll).toHaveBeenCalledWith(query);
    expect(result).toBe(expected);
  });

  it('should return upcoming events', () => {
    const expected = [{ id: 'evt-101' }];

    eventsService.findUpcoming.mockReturnValue(expected);

    const result = controller.findUpcoming();

    expect(eventsService.findUpcoming).toHaveBeenCalled();
    expect(result).toBe(expected);
  });

  it('should return one event by ID', () => {
    const expected = { id: 'evt-101' };

    eventsService.findOne.mockReturnValue(expected);

    const result = controller.findOne('evt-101');

    expect(eventsService.findOne).toHaveBeenCalledWith('evt-101');
    expect(result).toBe(expected);
  });

  it('should return sessions for an event', () => {
    const expected = [{ id: 'ses-201' }];

    eventsService.findSessions.mockReturnValue(expected);

    const result = controller.findSessions('evt-101');

    expect(eventsService.findSessions).toHaveBeenCalledWith('evt-101');
    expect(result).toBe(expected);
  });

  it('should return one session for an event', () => {
    const expected = { id: 'ses-201' };

    eventsService.findSession.mockReturnValue(expected);

    const result = controller.findSession('evt-101', 'ses-201');

    expect(eventsService.findSession).toHaveBeenCalledWith(
      'evt-101',
      'ses-201',
    );
    expect(result).toBe(expected);
  });

  it('should create a new event', () => {
    const eventData = {
      title: 'Testing Workshop',
      description: 'A workshop about testing.',
      location: 'Main Campus',
      eventDate: '2027-01-15T09:00:00.000Z',
      category: 'technology',
      isPublished: true,
    };

    const expected = { id: 'evt-106', ...eventData };

    eventsService.create.mockReturnValue(expected);

    const result = controller.create(eventData);

    expect(eventsService.create).toHaveBeenCalledWith(eventData);
    expect(result).toBe(expected);
  });
});
