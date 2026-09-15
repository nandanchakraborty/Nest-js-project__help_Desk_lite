import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Ticket } from './ticket.interface.js';
@Injectable()
export class TicketsService {
    private readonly tickets : Ticket[]=[

    ];
    
    findAll(){
        return this.tickets;
    }





}
