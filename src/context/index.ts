import { PrismaClient } from '@prisma/client'
import {createQueue, QueueContext} from './queue';
import {ticketContext, TicketContext} from './tickets';

export type Context = {
    prisma: PrismaClient;
    queue: QueueContext;
    ticket: TicketContext
}

let context: Context;

export const getContext = async (): Promise<Context> => {
    if (!context) {
        const url = process.env.DATABASE_URL;

        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url,
                },
            },
        });


        context = {
            prisma,
            queue: await createQueue(),
        } as Context;

        context.ticket = ticketContext(context)
    }

    return context;
}