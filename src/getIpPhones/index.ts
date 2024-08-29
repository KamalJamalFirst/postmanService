import { CountryCode, getExampleNumber, isValidPhoneNumber } from 'libphonenumber-js'
import { createAggregatedFile } from '../generateAggregated/index'
import examples from 'libphonenumber-js/mobile/examples'
import {setIp, setPhone} from '../setIpsPhones/index'
const { fullFile, sentIpsToPostman } = require('../variables/index');



export async function getIp(country: string) {
    await createAggregatedFile();
    
    const newIp = fullFile[country]['ip'].find((item: string) => {
        if (sentIpsToPostman.has(item)) {
            console.log("new IP wasn't found")
        } else {
            return item;
        };
    });
    console.log(newIp)
    if (newIp) {
        setIp(newIp, country);
        return newIp.slice(0, newIp.indexOf('\/'));
    } else {
        console.log("fullFile wasn't aggregated. Some error occured")
    };
 };

 export function getPhone(country: string): string | undefined {
    const geo = country.toUpperCase() as CountryCode;
    let phoneNumber = getExampleNumber(geo, examples)?.number as string;
    if (!phoneNumber) {
        console.log('No example number available for this country.');
        return;
    };
    phoneNumber = phoneNumber.slice(0, phoneNumber.length - 4) + fourDigitGenerator();
    if (!isValidPhoneNumber(phoneNumber, geo)) {
        console.log(`After execution fourDigitGenerator() the number became invalid`);
        return;
    };
    setPhone(phoneNumber, country)
    return phoneNumber;
};

function fourDigitGenerator(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

