import { AppDataSource } from "../data-source"
import { Countries } from '../entities/Countries';
import { CountryCode, getExampleNumber, isValidPhoneNumber } from 'libphonenumber-js'
//import { createAggregatedFile } from '../generateAggregated/index'
import examples from 'libphonenumber-js/mobile/examples'
import {setIpToUsed, setUsedPhoneToDb} from '../setIpsPhones/index'
//const { fullFile, sentIpsToPostman } = require('../variables/index');



export async function getIp(country: string) {
    //await createAggregatedFile();
    const countryRepository = await AppDataSource
    .getRepository(Countries) // Specify the entity
    .createQueryBuilder('countries') // Create a query builder instance
    .select('countries.ip') // Select the column you need
    .where('countries.country_code = :country', { country }) // Add the condition for Country
    .andWhere('countries.used = :used', { used: false }) // Add the condition for Used
    .limit(1) // Limit to one result to get the first suitable value
    .getOne(); // Fetch the first result
    // const newIp = fullFile[country]['ip'].find((item: string) => {
    //     if (sentIpsToPostman.has(item)) {
    //         console.log("new IP wasn't found")
    //     } else {
    //         return item;
    //     };
    // });
    // console.log(newIp)
    // if (newIp) {
    //     setIp(newIp, country);
    //     return newIp.slice(0, newIp.indexOf('\/'));
    // } else {
    //     console.log("fullFile wasn't aggregated. Some error occured")
    // };
    if (countryRepository?.ip) {
        await setIpToUsed(countryRepository.ip, country);
        return countryRepository.ip.slice(0, countryRepository.ip.indexOf('\/'));
    } else {
        console.log("fullFile wasn't aggregated. Some error occured")
    }
 };

 export async function getPhone(country: string): Promise<string | undefined> {
    const geo = country.toUpperCase() as CountryCode;
    let NewPhoneNumber = getExampleNumber(geo, examples)?.number as string;
    if (!NewPhoneNumber) {
        console.log('No example number available for this country.');
        return;
    };
    NewPhoneNumber = NewPhoneNumber.slice(0, NewPhoneNumber.length - 4) + fourDigitGenerator();
    if (!isValidPhoneNumber(NewPhoneNumber, geo)) {
        console.log(`After execution fourDigitGenerator() the number became invalid`);
        return;
    };
    await setUsedPhoneToDb(NewPhoneNumber, geo)
    return NewPhoneNumber;
};

function fourDigitGenerator(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

