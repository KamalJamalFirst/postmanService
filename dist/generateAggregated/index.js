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
exports.generateAggregated = generateAggregated;
const data_source_1 = require("../data-source");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const index_1 = require("../variables/index");
const Countries_1 = require("../entities/Countries");
const { countries, fullFile, fullFileForUsed } = index_1.variables;
function generateAggregated() {
    return __awaiter(this, void 0, void 0, function* () {
        //const setAggregatedFiles: ObjWithObj = {};
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
            (function () {
                elem.subnets.ipv4.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                    const country = new Countries_1.Countries();
                    country.country_code = elem['country-code'];
                    country.ip = e;
                    country.used = false;
                    const countiesRepository = data_source_1.AppDataSource.getRepository(Countries_1.Countries);
                    yield countiesRepository.save(country);
                }));
                elem.subnets.ipv6.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                    const country = new Countries_1.Countries();
                    const countryRepository = data_source_1.AppDataSource.getRepository(Countries_1.Countries);
                    country.country_code = elem['country-code'];
                    country.ip = e;
                    country.used = false;
                    yield countryRepository.save(country);
                }));
            })();
            //fullFile[elem['country-code']] = {ip: elem.subnets.ipv4, phoneNumber: []};
            //fullFileForUsed[elem['country-code']] = {ip: [], phoneNumber: []};
        });
        //return fullFile;
    });
}
;
//# sourceMappingURL=index.js.map