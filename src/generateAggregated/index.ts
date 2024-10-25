import { AppDataSource } from "../data-source"
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { Aggregated } from '../interfaces/index'

import { variables } from '../variables/index';
import { Countries } from '../entities/Countries';

const { countries } = variables;


export async function generateAggregated(): Promise<void> {
    //const setAggregatedFiles: ObjWithObj = {};
    
    const preAggregated = countries.map(async (elem: string): Promise<Aggregated> => {
        const filePathAggregated: string = resolve(`./country/${elem}/aggregated.json`);
        console.log(filePathAggregated);
        try {
            return readFile(filePathAggregated, 'utf8').then(data => JSON.parse(data));
        } catch (error) {
            console.log('something went wrong');
            throw error;
        };
    });
    const pushAggregatedFilesToDb = await Promise.all(preAggregated);
    pushAggregatedFilesToDb.forEach(elem => {
        (function() {
            elem.subnets.ipv4.forEach(async (e) => {
                const country = new Countries();
                country.country_code = elem['country-code'];
                country.ip = e;
                country.used = false;
                const countiesRepository = AppDataSource.getRepository(Countries)
                await countiesRepository.save(country);
            });
            elem.subnets.ipv6.forEach(async (e) => {
                const country = new Countries();
                const countryRepository = AppDataSource.getRepository(Countries);
                country.country_code = elem['country-code'];
                country.ip = e;
                country.used = false;
                await countryRepository.save(country);
            });
        })();
    });
};