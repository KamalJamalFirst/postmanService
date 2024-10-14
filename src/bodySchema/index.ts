

export const schema = {
    type: "object",
    properties: {
        ip: { type: 'string' },
        phone: { type: 'string' },
        country_code: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        is_test: { type: 'string' }
    },
    required: ['country_code'],
    additionalProperties: true
}
//         formdata: {
//             type: "array",
//             maxItems: 17,
//             //additionalItems: true,
//             //strictTuples: false,
//             //items: {
//                 //additionalItems: true,
//             allOf: [
//                 {
//                     //type: "object",
//                     properties: {
//                         description: { type: 'array' },
//                         key: { type: 'string', const: 'ip', default: "ip" },
//                         value: { type: 'string', default: "1.1.1.1" },
//                         type: { type: 'string', default: "text" }
//                     },
//                     required: ['description', 'key', 'value', 'type']
//                 },
//                 {
//                     //type: "object",
//                     properties: {
//                         description: { type: 'array' },
//                         key: { type: 'string', const: 'phone', default: "phone" },
//                         value: { type: 'string', default: "+1" },
//                         type: { type: 'string', default: "text" }
//                     },
//                     required: ['description', 'key', 'value', 'type']
//                 },
//                 {
//                     //type: "object",
//                     properties: {
//                         description: { type: 'array' },
//                         key: { type: 'string', const: 'country_code', default: "country_code" },
//                         value: { type: 'string' },
//                         type: { type: 'string', default: "text" }
//                     },
//                     required: ['description', 'key', 'value', 'type']
//                 },
//                 {   
//                     //type: "object",
//                     properties: {
//                         description: { type: 'array' },
//                         key: { type: 'string', const: 'first_name', default: "first_name" },
//                         value: { type: 'string', default: `${faker.person.firstName()}` },
//                         type: { type: 'string', default: "text" }
//                     },
//                     required: ['description', 'key', 'value', 'type']
//                 },
//                 {
//                     //type: "object",
//                     properties: {
//                         description: { type: 'array' },
//                         key: { type: 'string', const: 'last_name', default: "last_name" },
//                         value: { type: 'string', default: `${faker.person.lastName()}` },
//                         type: { type: 'string', default: "text" }
//                     },
//                     required: ['description', 'key', 'value', 'type']
//                 },
//                 {
//                     //type: "object",
//                     properties: {
//                         description: { type: 'array' },
//                         key: { type: 'string', const: 'email', default: "email" },
//                         value: { type: 'string', default: `${faker.internet.email()}` },
//                         type: { type: 'string', default: "text" }
//                     },
//                     required: ['description', 'key', 'value', 'type']
//                 },
//                 {
//                     //type: "object",
//                     properties: {
//                         description: { type: 'array' },
//                         key: { type: 'string', const: 'is_test', default: "is_test" },
//                         value: { type: 'string', default: 'true' },
//                         type: { type: 'string', default: "text" }
//                     },
//                     required: ['description', 'key', 'value', 'type']
//                 }
//             ]
            
//         }
//     }
// }


//             items: {
//                 type: "object",
//                 anyOf: [
//                     {
//                 {
//                     contains: {
//                         type: "object",
//                         properties: {
//                             description: { type: 'object', default: 'object' },
//                             key: { type: 'string', const: 'ip', default: "ip" },
//                             value: { type: 'string', default: "1.1.1.1" },
//                             type: { type: 'string', default: "text" }
//                         },
//                         required: ['description', 'key', 'value', 'type']
//                     }
//                 },
//                 {
//                     contains: {
//                         type: "object",
//                         properties: {
//                             description: { type: 'object', default: 'object' },
//                             key: { type: 'string', const: 'phone', default: "phone" },
//                             value: { type: 'string', default: "+1" },
//                             type: { type: 'string', default: "text" }
//                         },
//                         required: ['description', 'key', 'value', 'type']
//                     }
//                 },
//                 {
//                     contains: {
//                         type: "object",
//                         properties: {
//                             description: { type: 'object', default: 'object' },
//                             key: { type: 'string', const: 'country_code', default: "country_code" },
//                             value: { type: 'string' },
//                             type: { type: 'string', default: "text" }
//                         },
//                         required: ['description', 'key', 'value', 'type']
//                     }
//                 },
//                 {
//                     contains: {
//                         type: "object",
//                         properties: {
//                             description: { type: 'object', default: 'object' },
//                             key: { type: 'string', const: 'first_name', default: "first_name" },
//                             value: { type: 'string', default: `${faker.person.firstName()}` },
//                             type: { type: 'string', default: "text" }
//                         },
//                         required: ['description', 'key', 'value', 'type']
//                     }
//                 },
//                 {
//                     contains: {
//                         type: "object",
//                         properties: {
//                             description: { type: 'object', default: 'object' },
//                             key: { type: 'string', const: 'last_name', default: "last_name" },
//                             value: { type: 'string', default: `${faker.person.lastName()}` },
//                             type: { type: 'string', default: "text" }
//                         },
//                         required: ['description', 'key', 'value', 'type']
//                     }
//                 },
//                 {
//                     contains: {
//                         type: "object",
//                         properties: {
//                             description: { type: 'object', default: 'object' },
//                             key: { type: 'string', const: 'email', default: "email" },
//                             value: { type: 'string', default: `${faker.internet.email()}` },
//                             type: { type: 'string', default: "text" }
//                         },
//                         required: ['description', 'key', 'value', 'type']
//                     }
//                 },
//                 {
//                     contains: {
//                         type: "object",
//                         properties: {
//                             description: { type: 'object', default: 'object' },
//                             key: { type: 'string', const: 'is_test', default: "is_test" },
//                             value: { type: 'string', default: 'true' },
//                             type: { type: 'string', default: "text" }
//                         },
//                         required: ['description', 'key', 'value', 'type']
//                     }
//                 }
//             ]
//         }
//     }
// };


