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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIp = getIp;
exports.getPhone = getPhone;
const data_source_1 = require("../data-source");
const Countries_1 = require("../entities/Countries");
const libphonenumber_js_1 = require("libphonenumber-js");
//import { createAggregatedFile } from '../generateAggregated/index'
const examples_1 = __importDefault(require("libphonenumber-js/mobile/examples"));
const index_1 = require("../setIpsPhones/index");
//const { fullFile, sentIpsToPostman } = require('../variables/index');
function getIp(country) {
    return __awaiter(this, void 0, void 0, function* () {
        //await createAggregatedFile();
        const countryRepository = yield data_source_1.AppDataSource
            .getRepository(Countries_1.Countries) // Specify the entity
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
        if (countryRepository === null || countryRepository === void 0 ? void 0 : countryRepository.ip) {
            yield (0, index_1.setIpToUsed)(countryRepository.ip, country);
            return countryRepository.ip.slice(0, countryRepository.ip.indexOf('\/'));
        }
        else {
            console.log("fullFile wasn't aggregated. Some error occured");
        }
    });
}
;
function getPhone(country) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const geo = country.toUpperCase();
        let NewPhoneNumber = (_a = (0, libphonenumber_js_1.getExampleNumber)(geo, examples_1.default)) === null || _a === void 0 ? void 0 : _a.number;
        if (!NewPhoneNumber) {
            console.log('No example number available for this country.');
            return;
        }
        ;
        NewPhoneNumber = NewPhoneNumber.slice(0, NewPhoneNumber.length - 4) + fourDigitGenerator();
        if (!(0, libphonenumber_js_1.isValidPhoneNumber)(NewPhoneNumber, geo)) {
            console.log(`After execution fourDigitGenerator() the number became invalid`);
            return;
        }
        ;
        yield (0, index_1.setUsedPhoneToDb)(NewPhoneNumber, geo);
        return NewPhoneNumber;
    });
}
;
function fourDigitGenerator() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
;
//# sourceMappingURL=index.js.map