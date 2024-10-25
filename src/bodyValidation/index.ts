import { Ajv } from 'ajv'
import { schema } from '../bodySchema'
import { faker } from '@faker-js/faker';

export function bodyValidation(body: any) {
    const normObject = compileNormObjectFromReqBody(body);
    console.log('мы создали новый Json и применили Faker');
    console.log(normObject);
    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    console.log('schema compiled')
    //console.log(validate(normObject))
    if (validate(normObject)) {
        console.log('мы вовзращаем норм бади')
        return normObject
    } else {
        //console.log(validate.errors)
        console.log('мы вовзращаем ошибку')
        return [
            {
                'missingProperty': validate.errors![0].params.missingProperty,
                'message': validate.errors![0].message
            }
        ]
    }
};

function compileNormObjectFromReqBody(body: any) {
    body.first_name = faker.person.firstName();
    body.last_name = faker.person.lastName();
    body.email = faker.internet.email();
    body.phone = faker.phone.number({ style: 'international' });
    body.ip = faker.internet.ip();
    body.is_test = 'true';
    delete body.ip
    console.log(`вот он новый объект: ${body}`)
    return body;
}

