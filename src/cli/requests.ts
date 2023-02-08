import autocannon from 'autocannon';

import {ArithmeticBody, FibonacciBody, GeometricBody, HarmonicBody} from '../types/tickets';

// yarn ts-node src/cli/requests.ts

export const app = async () => {
    const url = `http://localhost:3000`;

    const body1: ArithmeticBody = {
        number: '123',
        type: 1,
        data: {
            start: 1,
            common: 2,
        },
    }

    const body2: GeometricBody = {
        number: '124',
        type: 2,
        data: {
            start: 1,
            common: 2,
        },
    }

    const body3: HarmonicBody = {
        number: '125',
        type: 3,
        data: {
            start: 1,
            common: 2,
        },
    }

    const body4: FibonacciBody = {
        number: '126',
        type: 4,
    };

    autocannon({
        url: `${url}/input`,
        method: 'POST',
        requests: [body1, body2, body3, body4].map((body) => ({
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })),
        maxConnectionRequests: 1000,
        connections: 10, //default
        pipelining: 1, // default
        duration: 100 // default
    }, console.log)
}

app();
