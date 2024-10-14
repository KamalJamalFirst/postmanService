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

export interface bodyRequest {
    [key: string]: [
        {
            description: Object,
            key: string,
            value: string,
            type: string
        }
    ]
}

export interface newDataForResponse {
    phone: string | undefined,
    ip: string | undefined,
    phone_index: number,
    country_index: number
}

// {
//     mode: 'formdata',
//     formdata: [
//       {
//         description: [Object],
//         key: 'ip',
//         value: '188.167.254.65',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'phone',
//         value: '+421908827624',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'email',
//         value: '{{$randomEmail}}',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'country_code',
//         value: 'HU',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'first_name',
//         value: 'John',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'last_name',
//         value: 'Doe',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'password',
//         value: 'ABCabc123',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'affiliate_id',
//         value: '1',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'offer_id',
//         value: '2',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'aff_sub',
//         value: 'test',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'aff_sub2',
//         value: 'test',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'aff_sub3',
//         value: 'test',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'aff_sub4',
//         value: 'test',
//         type: 'text'
//       },
//       {
//         description: [Object],
//         key: 'aff_sub5',
//         value: 'test',
//         type: 'text'
//       },
//       { key: 'aff_sub11', value: 'test', type: 'text' },
//       { key: 'aff_sub14', value: 'test', type: 'text' },
//       { key: 'is_test', value: 'true', type: 'text' }
//     ]
//   }