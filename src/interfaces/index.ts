export interface Aggregated {
    country: string;
    'country-code': string;
    delegation_status: [string];
    mode: string;
    subnets: {ipv4: string[], ipv6: string[]}
};

export interface objWithObj {
    [key: string]: {
        ip: string[],
        phoneNumber: string[]
    };
};

export interface objWithObjForUsed {
    [key: string]: {
        ip: string[],
        phoneNumber: string[]
    };
};
