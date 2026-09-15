import { StringifyOptions } from "querystring";

export interface Ticket {
    id:number;
    subject:string;
    description:string;
    priority:'low'|'medium'|'high';
    status:'open'|'close';
    createdAt:string;

}
