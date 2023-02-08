import {run, RunnerOptions} from 'graphile-worker';

import {JobNames} from './jobNames';
import {progression} from './jobs/progression';
import {getContext} from '../../context';

// yarn ts-node src/workers/progression/index.ts


const taskList = {
    [JobNames.Progression]: progression,
} as RunnerOptions['taskList'];

const worker = async () => {
    const connectionString = process.env.DATABASE_URL;

    await getContext();

    const runner = await run({
        connectionString,
        concurrency: 1,
        noHandleSignals: false,
        pollInterval: 1000,
        taskList,
        noPreparedStatements: true,
    });

    await runner.promise;
};

worker().catch(console.error);
