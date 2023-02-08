import {JobNames} from '../workers/progression/jobNames';
import {CreateTicketBody, WithId} from '../types/tickets';
import {makeWorkerUtils, Job} from 'graphile-worker';

export type QueueContext = {
    [JobNames.Progression]: (payload: WithId<CreateTicketBody>) => Promise<Job>;
}

export const createQueue = async (): Promise<QueueContext> => {
    const workerUrl = process.env.DATABASE_URL;

    const workerUtils = await makeWorkerUtils({
        connectionString: workerUrl,
    });

    await workerUtils.migrate();

    return {
        [JobNames.Progression]: (payload: CreateTicketBody) => workerUtils.addJob(JobNames.Progression, payload),
    };
}