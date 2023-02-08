import {JobHelpers} from 'graphile-worker';

import {WithId, CreateTicketBody} from '../../../types/tickets';
import {getContext} from '../../../context';

// An
const arithmeticProgression  = (start: number, common: number) =>
    Array.from({ length: 1000 }, (_, i) => start +  (i + 1) * common ).join(', ');

// Bn
const geometricProgression = (start: number, common: number, size = 1000) => {
    const arr = [start];
    for (let i = 1; i <= size; i++) {
        arr.push(arr[arr.length - 1] * common);
    }

    return arr.join(', ');
};

const harmonicProgression = (start: number, common: number) => Array.from(
    { length: 1000 },
    (_, i) => 1 /(start + common * (i + 1)),
    )
    .join(', ');

const fibonacci = (size = 1000) => {
    const res = [1, 1];

    for (let i = 1; i <= size; i++) {
        res.push(res[res.length - 1] + res[res.length - 2]);
    }

    return res.join(', ');
}

export const progression = async (payload: WithId<CreateTicketBody>, _helpers: JobHelpers): Promise<void> => {
    const ctx = await getContext();


    let result = '';
    if (payload.type === 1) {
        result = `Arithmetic: ${arithmeticProgression(payload.data.start, payload.data.common)}`
    } else if (payload.type === 2) {
        result = `Geometric: ${geometricProgression(payload.data.start, payload.data.common)}`
    } else if (payload.type === 3) {
        result = `Harmonic: ${harmonicProgression(payload.data.start, payload.data.common)}`
    } else if (payload.type === 4) {
        result = `Fibonacci: ${fibonacci()}`
    }

    await ctx.ticket.addResult(payload.id, result);
};