import { Ajv } from 'ajv'
import { schema } from '../bodySchema'
import { bodyRequest } from '../interfaces'
import { faker } from '@faker-js/faker';

export function bodyValidation(body: bodyRequest) {
    const normObject = compileNormObjectFromReqBody(body);
    console.log('мы создали новый Json и применили Faker');
    console.log(normObject);
    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    console.log('schema compiled')
    console.log(validate(normObject))
    if (validate(normObject)) {
        return normObject
    } else {
        console.log(validate.errors)
        return [
            {
                'missingProperty': validate.errors![0].params.missingProperty,
                'message': validate.errors![0].message
            }
        ]
    }
};

function compileNormObjectFromReqBody(body: bodyRequest) {
    const balvanka: object = {};
    const entries = Object.entries(balvanka);
    body.formdata.forEach(e => {
        entries.push([e.key, e.value]);
    })
    const newObj = Object.fromEntries(entries);
    newObj.first_name = faker.person.firstName();
    newObj.last_name = faker.person.lastName();
    newObj.email = faker.internet.email();
    newObj.phone = faker.phone.number({ style: 'international' });
    newObj.ip = faker.internet.ip();
    newObj.is_test = 'true';
    return newObj;
}

