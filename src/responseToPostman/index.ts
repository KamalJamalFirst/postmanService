import {getIp, getPhone} from '../getIpPhones/index'

export const responseToPostman = async (validatedBody: any) => {
    //const phone_element = req.formdata.find((elem) => elem.key === 'phone');
    validatedBody.phone = await getPhone(validatedBody.country_code);
    validatedBody.ip = await getIp(validatedBody.country_code);
    return validatedBody;
};
