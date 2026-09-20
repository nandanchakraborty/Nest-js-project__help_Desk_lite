import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { Ticket } from './ticket.interface.js';
@Injectable()
export class TicketsService {
  private readonly tickets: Ticket[] = [
    {
      id: 1,
      subject: 'Cannot login to account',
      description: 'user cannot acces the dashboard after login',
      priority: 'high',
      status: 'open',
      createdAt: '2026-09-01T10:00:00:0002',
    },
    {
      id: 2,
      subject: 'Invoice download not working',
      description: 'Invoice PDF download returns an empty file',
      priority: 'low',
      status: 'closed',
      createdAt: '2026-09-01T12:45:00:0002',
    },
  ];
  private nextTicketId = 4;

  findAll(status?: Ticket['status'], priority?: Ticket['priority']) {
    let tickets = this.tickets;
    if (status) {
      tickets = tickets.filter((ticket) => ticket.status === status);
    }
    if (priority) {
      tickets = tickets.filter((ticket) => ticket.priority === priority);
    }
    return tickets;
  }
  findOne(id: number) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    return ticket;
  }
  create(CreateTicketDto: CreateTicketDto) {
    const ticket: Ticket = {
      id: this.nextTicketId++,
      subject: CreateTicketDto.subject,
      description: CreateTicketDto.description,
      priority: CreateTicketDto.priority,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    this.tickets.push(ticket);
    return ticket;
  }
  update(id: number, UpdateTicketDto: UpdateTicketDto) {
    const ticket = this.findOne(id);
    if(ticket.status === 'closed'){
      throw new BadRequestException('closed ticket can not be updated')
    }
    Object.assign(ticket, UpdateTicketDto);
    return ticket;
  }
  closeTicket(id:number){
    const ticket = this.findOne(id);
    if(ticket.status === 'closed'){
      throw new BadRequestException('Ticket is already closed')
    }
    ticket.status = 'closed';
    return;
  }
}
