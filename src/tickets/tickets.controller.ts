import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { FilterTicketsQueryDto } from './dto/filter-tickets-query.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { TicketsService } from './tickets.service.js';
import path from 'path';
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}
  @Get()
  findAll(@Query() filters: FilterTicketsQueryDto) {
    return this.ticketsService.findAll(filters.status, filters.priority);
  }

  @Get(`:id`)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(id);
  }
  @Post()
  create(@Body() CreateTicketDto: CreateTicketDto) {
    return this.ticketsService.create(CreateTicketDto);
  }

  @Patch(`:id`)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(id, UpdateTicketDto);
  }

  @Patch(`:id/close`)
  closeTicket(
    @Param('id',ParseIntPipe)id:number){
      return this.ticketsService.closeTicket(id);
    }
}
