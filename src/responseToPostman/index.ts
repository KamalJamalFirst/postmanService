import {getIp, getPhone} from '../getIpPhones/index'

export const responseToPostman = async (req: any) => {
    console.log(req['query'].country_code)
    const data = {
        phone: getPhone(req['query'].country_code),
        ip: await getIp(req['query'].country_code)
    };
    return data;
};