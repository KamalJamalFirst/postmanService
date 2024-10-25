"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonsToDb1728927648795 = void 0;
const data_source_1 = require("../data-source");
const Countries_1 = require("../entities/Countries");
const index_1 = require("../variables/index");
const promises_1 = require("fs/promises");
const path_1 = require("path");
class JsonsToDb1728927648795 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Import other entities as needed
            //await queryRunner.connect()
            const { countries } = index_1.variables;
            const jsonsToDb = () => __awaiter(this, void 0, void 0, function* () {
                const countriesRepository = data_source_1.AppDataSource.getRepository(Countries_1.Countries);
                const preAggregated = countries.map((elem) => __awaiter(this, void 0, void 0, function* () {
                    const filePathAggregated = (0, path_1.resolve)(`./country/${elem}/aggregated.json`);
                    //console.log(filePathAggregated);
                    try {
                        return (0, promises_1.readFile)(filePathAggregated, 'utf8').then(data => JSON.parse(data));
                    }
                    catch (error) {
                        console.log('something went wrong');
                        throw error;
                    }
                    ;
                }));
                console.log('before Promise.all');
                const pushAggregatedFilesToDb = yield Promise.all(preAggregated);
                console.log('after Promise.all');
                for (const elem of pushAggregatedFilesToDb) {
                    console.log(elem);
                    countriesRepository.manager.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                        for (const e of elem.subnets.ipv4) {
                            yield queryRunner.connect();
                            //const countriesRepository = await queryRunner.manager.find(Countries)
                            const country = new Countries_1.Countries();
                            console.log(elem.subnets.ipv4);
                            console.log(e);
                            country.country_code = elem['country-code'];
                            country.ip = e;
                            country.used = false;
                            yield queryRunner.startTransaction();
                            try {
                                yield transactionalEntityManager.save(country);
                                yield queryRunner.commitTransaction();
                            }
                            catch (err) {
                                // since we have errors let's rollback changes we made
                                yield queryRunner.rollbackTransaction();
                            }
                            finally {
                                // you need to release query runner which is manually created:
                                yield queryRunner.release();
                            }
                            //await countriesRepository.save(country);
                        }
                        ;
                        for (const el of elem.subnets.ipv6) {
                            const country = new Countries_1.Countries();
                            console.log(elem.subnets.ipv6);
                            console.log(el);
                            country.country_code = elem['country-code'];
                            country.ip = el;
                            country.used = false;
                            yield queryRunner.startTransaction();
                            try {
                                yield transactionalEntityManager.save(country);
                                yield queryRunner.commitTransaction();
                            }
                            catch (err) {
                                // since we have errors let's rollback changes we made
                                yield queryRunner.rollbackTransaction();
                            }
                            finally {
                                // you need to release query runner which is manually created:
                                yield queryRunner.release();
                            }
                        }
                        ;
                    }));
                }
                ;
                //fullFile[elem['country-code']] = {ip: elem.subnets.ipv4, phoneNumber: []};
                //fullFileForUsed[elem['country-code']] = {ip: [], phoneNumber: []};
            });
            jsonsToDb().catch((error) => {
                console.error("Seeding failed:", error);
                process.exit(1);
            });
            yield data_source_1.AppDataSource.destroy();
        });
    }
    ;
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
}
exports.JsonsToDb1728927648795 = JsonsToDb1728927648795;
;
//# sourceMappingURL=1728927648795-JsonsToDb.js.map