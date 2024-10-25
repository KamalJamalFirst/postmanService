import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { Countries } from "../entities/Countries";
import { variables } from '../variables/index';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { Aggregated } from '../interfaces/index'

export class JsonsToDb1728927648795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Import other entities as needed
    
        try {
            const { countries } = variables;
            const queryRunner = AppDataSource.createQueryRunner();
            await queryRunner.connect();
            const countriesRepository = AppDataSource.getRepository(Countries);
            //AppDataSource.getRepository(Countries);
            const preAggregated = countries.map(async (elem: string): Promise<Aggregated> => {
                const filePathAggregated: string = resolve(`./country/${elem}/aggregated.json`);
                //console.log(filePathAggregated);
                try {
                    return readFile(filePathAggregated, 'utf8').then(data => JSON.parse(data));
                } catch (error) {
                    console.log('something went wrong');
                    throw error;
                };
            });
            console.log('before Promise.all');
            const pushAggregatedFilesToDb = await Promise.all(preAggregated);
            console.log('after Promise.all');
            console.log('пытаемся стартануть транзакцию')
            
            
            try {
                //await queryRunner.startTransaction('SERIALIZABLE')
                for (const elem of pushAggregatedFilesToDb) {
                    //await queryRunner.startTransaction('SERIALIZABLE')
                    
                    //await queryRunner.connect()
                    //console.log(elem);
                    for (const e of elem.subnets.ipv4) {
                        
                        //const countriesRepository = await queryRunner.manager.find(Countries)
                        const country = new Countries();
                        //console.log(elem.subnets.ipv4)
                        //console.log(e)
                        country.country_code = elem['country-code'];
                        country.ip = e;
                        country.used = false;
                        await countriesRepository.save(country);
                        //await queryRunner.commitTransaction();
                        //await countriesRepository.save(country);
                    };
                    console.log('поработали с subnets.ipv4');
                    for (const el of elem.subnets.ipv6) {
                        const country = new Countries();
                        //console.log(elem.subnets.ipv6)
                        //console.log(el)
                        country.country_code = elem['country-code'];
                        country.ip = el;
                        country.used = false;
                        await countriesRepository.save(country);
                        //await queryRunner.commitTransaction();
                    };
                    console.log('поработали с subnets.ipv6');
                    
                    //await queryRunner.commitTransaction();    
                };
                console.log('мы прошли всех и не упали');
            } catch (err) {
                // since we have errors let's rollback changes we made
                await queryRunner.rollbackTransaction()
            } finally {
                //await queryRunner.release()
            }
            
        } catch (error) {
            console.error("Seeding failed:", error);
            process.exit(1);
        } finally {
            //await AppDataSource.destroy();
        }

    //     const { countries } = variables;
    //     const jsonsToDb =  async () => {
    //         const queryRunner = AppDataSource.createQueryRunner();
    //         await queryRunner.connect();
    //         const countriesRepository = AppDataSource.getRepository(Countries);
    //         //AppDataSource.getRepository(Countries);
    //         const preAggregated = countries.map(async (elem: string): Promise<Aggregated> => {
    //             const filePathAggregated: string = resolve(`./country/${elem}/aggregated.json`);
    //             //console.log(filePathAggregated);
    //             try {
    //                 return readFile(filePathAggregated, 'utf8').then(data => JSON.parse(data));
    //             } catch (error) {
    //                 console.log('something went wrong');
    //                 throw error;
    //             };
    //         });
    //         console.log('before Promise.all');
    //         const pushAggregatedFilesToDb = await Promise.all(preAggregated);
    //         console.log('after Promise.all');
    //         console.log('пытаемся стартануть транзакцию')
            
            
    //         try {
    //             for (const elem of pushAggregatedFilesToDb) {
    //                 await queryRunner.startTransaction('SERIALIZABLE')
                    
    //                 //await queryRunner.connect()
    //                 console.log(elem);
    //                 for (const e of elem.subnets.ipv4) {
                        
    //                     //const countriesRepository = await queryRunner.manager.find(Countries)
    //                     const country = new Countries();
    //                     console.log(elem.subnets.ipv4)
    //                     console.log(e)
    //                     country.country_code = elem['country-code'];
    //                     country.ip = e;
    //                     country.used = false;
    //                     await countriesRepository.save(country);
    
    //                     //await countriesRepository.save(country);
    //                 };
    //                 for (const el of elem.subnets.ipv6) {
    //                     const country = new Countries();
    //                     console.log(elem.subnets.ipv6)
    //                     console.log(el)
    //                     country.country_code = elem['country-code'];
    //                     country.ip = el;
    //                     country.used = false;
    //                     await countriesRepository.save(country);
    //                 };
                    
    //                 await queryRunner.commitTransaction();    
    //             };
    //         } catch (err) {
    //             // since we have errors let's rollback changes we made
    //             await queryRunner.rollbackTransaction()
    //         };
    //         await queryRunner.release()
            
    //             //fullFile[elem['country-code']] = {ip: elem.subnets.ipv4, phoneNumber: []};
    //             //fullFileForUsed[elem['country-code']] = {ip: [], phoneNumber: []};
    //     };

    //     jsonsToDb().catch((error) => {
    //         console.error("Seeding failed:", error);
    //         process.exit(1);
    //     });
    // await AppDataSource.destroy();
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
    };

};
