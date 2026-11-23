

import { UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiKeyGuard } from '../common/api-key/api-key.guard.js';
import { TimingInterceptor } from '../common/timing/timing.interceptor.js';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { EventsService } from './events.service.js';

import { CreateEventDto } from './dto/create-event.dto.js';

import { FindEventsQueryDto } from './dto/find-events-query.dto.js';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) {}

  // GET /api/events
  @Get()
  findAll(@Query() query: FindEventsQueryDto) {
    return this.eventsService.findAll(query);
  }

  // GET /api/events/upcoming
  // Keep this route BEFORE @Get(':id')
  @Get('upcoming')
  findUpcoming() {
    return this.eventsService.findUpcoming();
  }

  // GET /api/events/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  // GET /api/events/:id/sessions
  @Get(':id/sessions')
  findSessions(@Param('id') id: string) {
    return this.eventsService.findSessions(id);
  }

  // GET /api/events/:id/sessions/:sessionId
  @Get(':id/sessions/:sessionId')
  findSession(
    @Param('id') id: string,
    @Param('sessionId') sessionId: string,
  ) {
    return this.eventsService.findSession(id, sessionId);
  }

  // POST /api/events
  @Post()
  create(@Body() data: CreateEventDto) {
    return this.eventsService.create(data);
  }
}
