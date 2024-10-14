"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = bodyValidation;
const ajv_1 = require("ajv");
const bodySchema_1 = require("../bodySchema");
const faker_1 = require("@faker-js/faker");
function bodyValidation(body) {
    const normObject = compileNormObjectFromReqBody(body);
    console.log('мы создали новый Json и применили Faker');
    console.log(normObject);
    const ajv = new ajv_1.Ajv();
    const validate = ajv.compile(bodySchema_1.schema);
    console.log('schema compiled');
    console.log(validate(normObject));
    if (validate(normObject)) {
        return normObject;
    }
    else {
        console.log(validate.errors);
        return [
            {
                'missingProperty': validate.errors[0].params.missingProperty,
                'message': validate.errors[0].message
            }
        ];
    }
}
;
function compileNormObjectFromReqBody(body) {
    const balvanka = {};
    const entries = Object.entries(balvanka);
    body.formdata.forEach(e => {
        entries.push([e.key, e.value]);
    });
    const newObj = Object.fromEntries(entries);
    newObj.first_name = faker_1.faker.person.firstName();
    newObj.last_name = faker_1.faker.person.lastName();
    newObj.email = faker_1.faker.internet.email();
    newObj.phone = faker_1.faker.phone.number({ style: 'international' });
    newObj.ip = faker_1.faker.internet.ip();
    newObj.is_test = 'true';
    return newObj;
}
//# sourceMappingURL=index.js.map