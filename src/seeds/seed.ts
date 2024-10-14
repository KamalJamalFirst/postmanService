// src/seeds/seed.ts

import { AppDataSource } from "../data-source";
import { Countries } from "../entities/Countries";
import { variables } from '../variables/index';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { Aggregated } from '../interfaces/index'

// Import other entities as needed

const { countries } = variables;

async function seed() {
  await AppDataSource.initialize()
  .then(async () => {
    const countriesRepository = AppDataSource.getRepository(Countries);
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
        elem.subnets.ipv4.forEach(async (e) => {
            const country = new Countries();
            country.country_code = elem['country-code'];
            country.ip = e;
            country.used = false;
            
            await countriesRepository.save(country);
        });
        elem.subnets.ipv6.forEach(async (e) => {
            const country = new Countries();
            country.country_code = elem['country-code'];
            country.ip = e;
            country.used = false;
            await countriesRepository.save(country);
        });
    });
    console.log("Seeding completed.");
    await AppDataSource.destroy();
        //fullFile[elem['country-code']] = {ip: elem.subnets.ipv4, phoneNumber: []};
        //fullFileForUsed[elem['country-code']] = {ip: [], phoneNumber: []};
  });
};

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
