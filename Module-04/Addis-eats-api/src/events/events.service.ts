import { Injectable, NotFoundException } from '@nestjs/common';

import { events, sessions } from './events.data.js';

import type { Event, Session } from './types/event.types.js';

import type { CreateEventDto } from './dto/create-event.dto.js';

import type { FindEventsQueryDto } from './dto/find-events-query.dto.js';

@Injectable()
export class EventsService {
  // 1. Get all events with filtering, sorting and pagination
  findAll(query: FindEventsQueryDto) {
    const {
      category,
      location,
      isPublished,
      sortBy,
      order = 'asc',
      page = 1,
      limit = 5,
    } = query;

    // FILTER
    let result = events.filter((event) => {
      const matchesCategory = category
        ? event.category.toLowerCase() === category.toLowerCase()
        : true;

      const matchesLocation = location
        ? event.location.toLowerCase().includes(location.toLowerCase())
        : true;

      const matchesPublished =
        isPublished !== undefined
          ? event.isPublished === isPublished
          : true;

      return (
        matchesCategory &&
        matchesLocation &&
        matchesPublished
      );
    });

    // SORT - sort a copy, not the original array
    if (sortBy) {
      result = [...result].sort((a, b) => {
        const comparison =
          sortBy === 'eventDate'
            ? new Date(a.eventDate).getTime() -
              new Date(b.eventDate).getTime()
            : a.title.localeCompare(b.title);

        return order === 'desc' ? -comparison : comparison;
      });
    }

    // PAGINATE
    const total = result.length;
    const offset = (page - 1) * limit;

    const items = result.slice(offset, offset + limit);

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  // 2. Get upcoming events
  findUpcoming(): Event[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events.filter(
      (event) => new Date(event.eventDate).getTime() >= today.getTime(),
    );
  }

  // 3. Get one event by ID
  findOne(id: string): Event {
    const event = events.find((event) => event.id === id);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  // 4. Get sessions belonging to an event
  findSessions(eventId: string): Session[] {
    this.findOne(eventId);

    return sessions.filter((session) => session.eventId === eventId);
  }

  // 5. Get one session belonging to a specific event
  findSession(eventId: string, sessionId: string): Session {
    this.findOne(eventId);

    const session = sessions.find(
      (session) =>
        session.id === sessionId &&
        session.eventId === eventId,
    );

    if (!session) {
      throw new NotFoundException(
        `Session ${sessionId} not found for event ${eventId}`,
      );
    }

    return session;
  }

  // 6. Create a new event
  create(data: CreateEventDto): Event {
    const nextId = Math.max(
      100,
      ...events.map((event) => {
        const number = Number(event.id.replace('evt-', ''));
        return Number.isFinite(number) ? number : 100;
      }),
    ) + 1;

    const newEvent: Event = {
      id: `evt-${nextId}`,
      ...data,
    };

    events.push(newEvent);

    return newEvent;
  }
}