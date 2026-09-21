import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { FilterTicketsQueryDto } from './dto/filter-tickets-query.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { TicketsService } from './tickets.service.js';
import path from 'path';
import { StaffGuard } from './guards/staff.guard.js';
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
  @UseGuards(StaffGuard)
  @Patch(`:id/close`)
  closeTicket(
    @Param('id',ParseIntPipe)id:number){
      return this.ticketsService.closeTicket(id);
    }
}
