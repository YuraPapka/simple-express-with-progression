import {ticket as DBTicket} from '@prisma/client'
import {Context} from './index';
import {CreateTicketBody} from '../types/tickets';

export type TicketContext = {
    create: (body: CreateTicketBody) => Promise<DBTicket>;
    addResult: (id: number, result: string) => Promise<void>;
    getInProgress: () => Promise<{number: string}[]>;
    getResult: (ticketNumber: string) => Promise<DBTicket | null>;
}

export const ticketContext = (ctx: Context): TicketContext => {
    const create = async (body: CreateTicketBody) => {
        const data = await ctx.prisma.ticket.create({
            data: {
                number: body.number,
                date: new Date(),
            },
        });

        await ctx.queue.progression({...body, id: data.id});

        return data;
    };

    const addResult = async (id: number, result: string) => {
        await ctx.prisma.ticket.update({
            where: {
                id,
            },
            data: {
                result,
            },
        });
    };

    const getInProgress = () => {
        return ctx.prisma.ticket.findMany({
            where: {
                result: undefined,
            },
            select: {
                number: true,
            },
            take: 1000, // todo: pagination
        });
    };

    const getResult = (ticketNumber: string) => {
        return ctx.prisma.ticket.findFirst({
            where: {
                number: ticketNumber
            },
        });
    }

    return {
        create,
        addResult,
        getInProgress,
        getResult,
    };
}