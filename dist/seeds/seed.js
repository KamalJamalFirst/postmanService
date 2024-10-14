"use strict";
// src/seeds/seed.ts
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
const data_source_1 = require("../data-source");
const Countries_1 = require("../entities/Countries");
const index_1 = require("../variables/index");
const promises_1 = require("fs/promises");
const path_1 = require("path");
// Import other entities as needed
const { countries } = index_1.variables;
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then(() => __awaiter(this, void 0, void 0, function* () {
            const countriesRepository = data_source_1.AppDataSource.getRepository(Countries_1.Countries);
            const preAggregated = countries.map((elem) => __awaiter(this, void 0, void 0, function* () {
                const filePathAggregated = (0, path_1.resolve)(`./country/${elem}/aggregated.json`);
                console.log(filePathAggregated);
                try {
                    return (0, promises_1.readFile)(filePathAggregated, 'utf8').then(data => JSON.parse(data));
                }
                catch (error) {
                    console.log('something went wrong');
                    throw error;
                }
                ;
            }));
            const pushAggregatedFilesToDb = yield Promise.all(preAggregated);
            pushAggregatedFilesToDb.forEach(elem => {
                elem.subnets.ipv4.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                    const country = new Countries_1.Countries();
                    country.country_code = elem['country-code'];
                    country.ip = e;
                    country.used = false;
                    yield countriesRepository.save(country);
                }));
                elem.subnets.ipv6.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                    const country = new Countries_1.Countries();
                    country.country_code = elem['country-code'];
                    country.ip = e;
                    country.used = false;
                    yield countriesRepository.save(country);
                }));
            });
            console.log("Seeding completed.");
            yield data_source_1.AppDataSource.destroy();
            //fullFile[elem['country-code']] = {ip: elem.subnets.ipv4, phoneNumber: []};
            //fullFileForUsed[elem['country-code']] = {ip: [], phoneNumber: []};
        }));
    });
}
;
seed().catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map