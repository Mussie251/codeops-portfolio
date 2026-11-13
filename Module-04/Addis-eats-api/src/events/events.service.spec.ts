
import { NotFoundException } from '@nestjs/common';

import { EventsService } from './events.service.js';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(() => {
  service = new EventsService();
});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all events with default pagination', () => {
    const result = service.findAll({});

    expect(result.total).toBe(5);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(5);
    expect(result.totalPages).toBe(1);
    expect(result.items).toHaveLength(5);
  });

  it('should filter events by category', () => {
    const result = service.findAll({
      category: 'technology',
    });

    expect(result.total).toBe(2);
    expect(result.items.every(
      (event) => event.category === 'technology',
    )).toBe(true);
  });

  it('should filter locations using partial matching', () => {
    const result = service.findAll({
      location: 'main',
    });

    expect(result.total).toBe(2);
  });

  it('should filter unpublished events', () => {
    const result = service.findAll({
      isPublished: false,
    });

    expect(result.total).toBe(1);
    expect(result.items[0].id).toBe('evt-104');
  });

  it('should sort events by date in descending order', () => {
    const result = service.findAll({
      sortBy: 'eventDate',
      order: 'desc',
    });

    expect(result.items[0].id).toBe('evt-105');
    expect(result.items[4].id).toBe('evt-101');
  });

  it('should sort events by title alphabetically', () => {
    const result = service.findAll({
      sortBy: 'title',
      order: 'asc',
    });

    expect(result.items[0].id).toBe('evt-102');
  });

  it('should paginate events correctly', () => {
    const result = service.findAll({
      page: 2,
      limit: 2,
    });

    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toBe('evt-103');
    expect(result.items[1].id).toBe('evt-104');
    expect(result.total).toBe(5);
    expect(result.totalPages).toBe(3);
  });

  it('should apply filters before pagination', () => {
    const result = service.findAll({
      category: 'technology',
      isPublished: true,
      page: 1,
      limit: 1,
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe('evt-101');
    expect(result.total).toBe(2);
    expect(result.totalPages).toBe(2);
  });

  it('should return upcoming events', () => {
    const result = service.findUpcoming();

    expect(result.length).toBeGreaterThan(0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    expect(
      result.every(
        (event) => new Date(event.eventDate).getTime() >= today.getTime(),
      ),
    ).toBe(true);
  });

  it('should find an event by ID', () => {
    const result = service.findOne('evt-101');

    expect(result.id).toBe('evt-101');
    expect(result.title).toBe('Introduction to Cloud Computing');
  });

  it('should throw NotFoundException for a missing event', () => {
    expect(() => service.findOne('evt-999')).toThrow(
      NotFoundException,
    );
  });

  it('should return sessions belonging to an event', () => {
    const result = service.findSessions('evt-101');

    expect(result).toHaveLength(2);
    expect(
      result.every((session) => session.eventId === 'evt-101'),
    ).toBe(true);
  });

  it('should find a specific session', () => {
    const result = service.findSession('evt-101', 'ses-201');

    expect(result.id).toBe('ses-201');
    expect(result.title).toBe('Cloud Computing Fundamentals');
  });

  it('should throw NotFoundException for a missing session', () => {
    expect(
      () => service.findSession('evt-101', 'ses-999'),
    ).toThrow(NotFoundException);
  });

  it('should create a new event', () => {
    const newEvent = service.create({
      title: 'Testing Workshop',
      description: 'A workshop about software testing.',
      location: 'Main Campus',
      eventDate: '2027-01-15T09:00:00.000Z',
      category: 'technology',
      isPublished: true,
    });

    expect(newEvent.id).toBe('evt-106');
    expect(newEvent.title).toBe('Testing Workshop');
    expect(newEvent.isPublished).toBe(true);
  });
});
