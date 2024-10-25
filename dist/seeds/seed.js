"use strict";
// // src/seeds/seed.ts
// import { AppDataSource } from "../data-source";
// import { Countries } from "../entities/Countries";
// import { variables } from '../variables/index';
// import { readFile } from 'fs/promises';
// import { resolve } from 'path';
// import { Aggregated } from '../interfaces/index'
// // Import other entities as needed
// const { countries } = variables;
// async function seed() {
//   await AppDataSource.initialize()
//   .then(async () => {
//     const countriesRepository = AppDataSource.getRepository(Countries);
//     const preAggregated = countries.map(async (elem: string): Promise<Aggregated> => {
//         const filePathAggregated: string = resolve(`./country/${elem}/aggregated.json`);
//         console.log(filePathAggregated);
//         try {
//             return readFile(filePathAggregated, 'utf8').then(data => JSON.parse(data));
//         } catch (error) {
//             console.log('something went wrong');
//             throw error;
//         };
//     });
//     const pushAggregatedFilesToDb = await Promise.all(preAggregated);
//     pushAggregatedFilesToDb.forEach(elem => {
//         for (const elem of pushAggregatedFilesToDb) {
//             console.log(elem);
//             for (const e of elem.subnets.ipv4) {
//                 const country = new Countries();
//                 console.log(elem.subnets.ipv4)
//                 console.log(e)
//                 country.country_code = elem['country-code'];
//                 country.ip = e;
//                 country.used = false;
//                 await countriesRepository.save(country);
//             };
//             for (const el of elem.subnets.ipv6) {
//                 const country = new Countries();
//                 console.log(elem.subnets.ipv6)
//                 console.log(el)
//                 country.country_code = elem['country-code'];
//                 country.ip = el;
//                 country.used = false;
//                 await countriesRepository.save(country);
//             };
//         })
//         await AppDataSource.destroy();
//             //fullFile[elem['country-code']] = {ip: elem.subnets.ipv4, phoneNumber: []};
//             //fullFileForUsed[elem['country-code']] = {ip: [], phoneNumber: []};
//     };
// };
// seed().catch((error) => {
//   console.error("Seeding failed:", error);
//   process.exit(1);
// });
//# sourceMappingURL=seed.js.map