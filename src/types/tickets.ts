export type CreateTicketBody = ArithmeticBody | GeometricBody | HarmonicBody | FibonacciBody;

export interface ArithmeticBody extends BaseBody {
    type: 1;
    data: {
        start: number;
        common: number;
    };
}

export interface GeometricBody extends BaseBody {
    type: 2;
    data: {
        start: number;
        common: number;
        step?: number;
    };
}

export interface HarmonicBody extends BaseBody {
    type: 3;
    data: {
        start: number;
        common: number;
    };
}

export interface FibonacciBody extends BaseBody {
    type: 4;
}

type BaseBody = {
    number: string;
}

export type WithId<T extends {}> = T & {id: number};
